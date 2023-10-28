from flask import Blueprint, jsonify, request
import pandas as pd
import numpy as np
import joblib
import logging
from pymongo import MongoClient
from services.fetch_model_data import fetch_combined_data


# logging.basicConfig(level=logging.DEBUG)

api_blueprint = Blueprint('api', __name__, url_prefix='/api')


@api_blueprint.route('/fetch-data', methods=['GET', 'POST'])
def get_data():
    try:
        data = fetch_combined_data()
        return jsonify(data)
    except Exception as e:
        return jsonify(error=str(e)), 500


logistic_regression = joblib.load('model/fed_model.pkl')
scaler = joblib.load('model/fed_scaler.pkl')


@api_blueprint.route('/run-model', methods=['POST'])
def predict():
    try:

        data = request.get_json()
        cpi = data['cpi_data']['cpi']
        fed_rate = int(data['interpretation'])
        last_unemp = data['last_unemp']
        # Run model
        feature_values = np.array([[cpi, last_unemp]])
        feature_values_scaled = scaler.transform(feature_values)
        feature_names = ['cpi', 'last_unemp']

        X_test = pd.DataFrame(feature_values_scaled, columns=feature_names)
        # pred_test = logistic_regression.predict(X_test)
        probability = logistic_regression.predict_proba(X_test)
        prob_list = probability[0].tolist()
        print(prob_list[0])
        print(type(prob_list[0]))
        # # Return prediction as JSON
        return jsonify({'maintain_or_lower': prob_list[0], 'raise': prob_list[1]})

    except Exception as e:
        return jsonify(error=str(e)), 500


client = MongoClient('mongodb://127.0.0.1:27017/')
db = client['project2_db']


@api_blueprint.route('/get_data', methods=['GET'])
def get_from_mongodb():
    collection = db['project2_collection']
    data = list(collection.find({}, {'_id': False}))

    # Convert NaN to None
    clean_data = [
        {k: (v if v == v else None)
         for k, v in item.items()}  # v==v is False for NaN
        for item in data
    ]

    return jsonify(clean_data)
