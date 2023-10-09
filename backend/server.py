from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient

import os
import datetime
from fredapi import Fred
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://127.0.0.1:27017/')

db = client['chartData']

load_dotenv(".env")
FRED_API_KEY = os.getenv("API_KEY")
fred = Fred(api_key=FRED_API_KEY)
__bonds2tr = fred.get_series('DGS2')


@app.route('/add_data', methods=['GET'])
def add_data():
    sample_data = {"name": "example", "value": 100}
    db.sample_collection.insert_one(__bonds2tr)
    return jsonify({"message": "Data added"}), 200


if __name__ == "__main__":
    app.run(debug=True)
