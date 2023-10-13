import os
import requests
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import joblib
from bs4 import BeautifulSoup
import re
from fredapi import Fred
import openai


app = Flask(__name__)
CORS(app)

model = joblib.load('data/saved_model.pkl')

load_dotenv(".env")
FRED_API_KEY = os.getenv("FRED_API_KEY")
fred = Fred(api_key=FRED_API_KEY)
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = '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'

client = MongoClient('mongodb://127.0.0.1:27017/')
db = client['economic_data']


@app.route('/get_data', methods=['GET'])
def get_data():
    # collection = db['economic_collection']
    # data = list(collection.find({}, {'_id': False}))

    # # Convert NaN to None
    # clean_data = [
    #     {k: (v if v == v else None)
    #      for k, v in item.items()}  # v==v is False for NaN
    #     for item in data
    # ]
    clean_data = 'test'
    return jsonify(clean_data)


@app.route('/api/fetch-t10y2y', methods=['GET', 'POST'])
def get_model_data():
    try:
        bonds2tr = fred.get_series('T10Y2Y')
        print(bonds2tr.to_list()[-1])
        print(type(bonds2tr.to_list()[-1]))
        return jsonify(bonds2tr.to_list()[-1])
    except Exception as e:
        return print(e), 500


url = 'https://www.atlantafed.org/cqer/research/gdpnow'


@app.route('/api/fetch-gdp', methods=['GET'])
def fetch_gdp():
    try:
        response = requests.get(url)
    except requests.RequestException as e:
        # Log an error and return a 500 response
        print(f"An error occurred: {str(e)}")
        return jsonify(error=str(e)), 500

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        css_selector = 'body > div.container > article:nth-child(2) > section > div:nth-child(2) > div.col-lg-11 > div > div.col-lg-9 > div.row.GDPNowLatest > p:nth-child(1) > strong'

        desired_element = soup.select_one(css_selector)

        if desired_element is not None:
            element_text = desired_element.get_text(strip=True)
            match = re.search(r'(\d+\.\d+|\d+)', element_text)

            if match:
                return jsonify(gdp=float(match.group()))
            else:
                return jsonify(error="No GDP number found"), 404
        else:
            return jsonify(error="Element not found"), 404
    else:
        return jsonify(error="Failed to retrieve the page"), 500


@app.route('/api/fetch-interpretation', methods=['GET'])
def get_interpretation():
    openai.api_key = OPENAI_API_KEY
    try:
        response = requests.get(url)
    except requests.RequestException as e:
        # Log an error and return a 500 response
        print(f"An error occurred: {str(e)}")
        return jsonify(error=str(e)), 500
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        css_selector = 'body > div.container > article:nth-child(2) > section > div:nth-child(2) > div.col-lg-11 > div > div.col-lg-9 > div.row.GDPNowLatest > p:nth-child(2)'
        desired_element = soup.select_one(css_selector).get_text(strip=True)
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": desired_element}
            ]
        )

        interpretation = response['choices'][0]['message']['content']
        return jsonify(interpretation)
    else:
        return str(e), 500


if __name__ == "__main__":
    app.run(debug=True)
