from flask import Blueprint, jsonify, request
import pandas as pd
import numpy as np
import joblib
import logging
from pymongo import MongoClient
from services.fetch_model_data import fetch_combined_data
from services.fetch_model_data import fetch_logistic_data


# logging.basicConfig(level=logging.DEBUG)

api_blueprint = Blueprint('api', __name__, url_prefix='/api')


@api_blueprint.route('/fetch-data', methods=['GET', 'POST'])
def get_data():
    try:
        data = fetch_combined_data()
        return jsonify(data)
    except Exception as e:
        return jsonify(error=str(e)), 500

# Uwaga, zmieniam strukture!


@api_blueprint.route('/fetch-logistic-data', methods=['GET', 'POST'])
def get_logistic_data():
    try:
        data = fetch_logistic_data()
        # dataCpi = fetch_cpi()
        # data = {'last_unemp': dataUnemp, 'cpi_data': dataCpi}
        print(data)
        test_data = 'hello world'
        return jsonify(data)
    except Exception as e:
        return jsonify(error=str(e)), 500


@api_blueprint.route('run-logistic-model', methods=['POST'])
def run_logistic_model():
    try:
        test_data = 'hello world'
        return jsonify(test_data)
    except Exception as e:
        return jsonify(error=str(e)), 500


logistic_regression = joblib.load('model/fed_model.pkl')
scaler = joblib.load('model/fed_scaler.pkl')


@api_blueprint.route('/run-model', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        cpi = data['cpi_data']['cpi']
        fed_rate = data['interpretation']
        last_unemp = data['last_unemp']

        # Run model
        feature_values = np.array([[cpi, last_unemp]])
        feature_values_scaled = scaler.transform(feature_values)
        feature_names = ['cpi', 'last_unemp']
        X_test = pd.DataFrame(feature_values_scaled, columns=feature_names)
        probability = logistic_regression.predict_proba(X_test)
        prob_list = probability[0].tolist()

        # Adjusting probabilities with GPT-3 interpretation
        transformed_gpt_interpretation = 2 * (fed_rate - 0.5)
        adjustment = 0.1 * transformed_gpt_interpretation
        adjusted_prob_lower = prob_list[0] - adjustment
        adjusted_prob_raise = prob_list[1] + adjustment

        # Normalizing to ensure the probabilities sum to 1
        prob_sum = adjusted_prob_lower + adjusted_prob_raise
        normalized_prob_lower = adjusted_prob_lower / prob_sum
        normalized_prob_raise = adjusted_prob_raise / prob_sum

        # Rounding to two decimal places
        normalized_prob_lower = round(normalized_prob_lower, 2)
        normalized_prob_raise = round(normalized_prob_raise, 2)

        # Ensuring that rounded probabilities sum to 1
        if normalized_prob_lower + normalized_prob_raise != 1:
            # Adjusting the probabilities by the smallest possible value (0.01)
            if normalized_prob_lower > normalized_prob_raise:
                normalized_prob_lower -= 0.01
            else:
                normalized_prob_raise -= 0.01

        return jsonify({'maintain_or_lower': normalized_prob_lower, 'raise': normalized_prob_raise})

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
