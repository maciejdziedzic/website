# server.py
from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os
from fredapi import Fred
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})


load_dotenv(".env")
FRED_API_KEY = os.getenv("API_KEY")
fred = Fred(api_key=FRED_API_KEY)
client = MongoClient('mongodb://127.0.0.1:27017/')
db = client['economic_data']


@app.route('/get_data', methods=['GET'])
def get_data():
    collection = db['economic_collection']
    data = list(collection.find({}, {'_id': False}))

    # Convert NaN to None
    clean_data = [
        {k: (v if v == v else None)
         for k, v in item.items()}  # v==v is False for NaN
        for item in data
    ]

    return jsonify(clean_data)


@app.route('/api/fetch-data', methods=['GET', 'POST'])
def get_model_data():
    try:
        bonds2tr = fred.get_series('T10Y2Y')

        return jsonify(bonds2tr.to_list())
    except Exception as e:
        return print(e), 500


if __name__ == "__main__":
    app.run(debug=True)
