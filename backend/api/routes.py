from flask import Blueprint, jsonify, request
import pandas as pd
import joblib
import logging
from pymongo import MongoClient
from services.fetch_from_fred import fetch_data, fetch_text, fetch_combined_data


# logging.basicConfig(level=logging.DEBUG)

api_blueprint = Blueprint('api', __name__, url_prefix='/api')


@api_blueprint.route('/fetch-data', methods=['GET', 'POST'])
def get_data():
    try:
        data = fetch_combined_data()
        return jsonify(data)
    except Exception as e:
        return jsonify(error=str(e)), 500


logistic_regression = joblib.load('model/S&P500_model.pkl')


@api_blueprint.route('/run-model', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        # # Extract gdp and iyc values
        gdp = data['cpi_data']['cpi']
        iyc = int(data['interpretation'])

        # # Run model
        feature_values = [gdp, iyc]
        feature_names = ['gdp', 'iyc']
        X_test = pd.DataFrame([feature_values], columns=feature_names)

        pred_test = logistic_regression.predict(X_test)
        print(type(str(pred_test)))
        # # Return prediction as JSON
        return jsonify(str(pred_test))

    except Exception as e:
        return jsonify(error=str(e)), 500


client = MongoClient('mongodb://127.0.0.1:27017/')
db = client['project2_db']


@api_blueprint.route('/get_data', methods=['GET'])
def get_from_mongodb():
    collection = db['economic_collection']
    data = list(collection.find({}, {'_id': False}))

    # Convert NaN to None
    clean_data = [
        {k: (v if v == v else None)
         for k, v in item.items()}  # v==v is False for NaN
        for item in data
    ]

    return jsonify(clean_data)
