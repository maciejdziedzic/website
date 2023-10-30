from flask import Blueprint, jsonify, request
import pandas as pd
import numpy as np
import joblib
import logging
from pymongo import MongoClient
from services.fetch_model_data import fetch_logistic_data
from services.fetch_model_data import fetch_text
from services.fetch_model_data import fetch_fed_data
from services.fetch_model_data import fetch_interpretation


# logging.basicConfig(level=logging.DEBUG)

api_blueprint = Blueprint('api', __name__, url_prefix='/api')


# Uwaga, zmieniam strukture!


@api_blueprint.route('/fetch-logistic-data', methods=['GET', 'POST'])
def get_logistic_data():
    try:
        data = fetch_logistic_data()
        print(data)

        return jsonify(data)
    except Exception as e:
        return jsonify(error=str(e)), 500


@api_blueprint.route('run-logistic-model', methods=['POST'])
def run_logistic_model():
    try:
        logistic_regression = joblib.load('model/fed_model.pkl')
        scaler = joblib.load('model/fed_scaler.pkl')
        data = request.get_json()
        cpi = data['cpi']
        unemp = data['unemp']
        feature_values = np.array([[cpi, unemp]])
        feature_values_scaled = scaler.transform(feature_values)
        feature_names = ['cpi', 'unemp']
        X_test = pd.DataFrame(feature_values_scaled, columns=feature_names)
        probability = logistic_regression.predict_proba(X_test)
        prob_list = probability[0].tolist()
        result = {
            'lower_or_maintain': prob_list[0],
            'raise': prob_list[1]
        }
        return jsonify(result)
    except Exception as e:
        return jsonify(error=str(e)), 500


@api_blueprint.route('/fetch-fed-text', methods=['POST'])
def get_fed_data():
    try:
        press_release_content = fetch_text()
        return jsonify({'press_release_content': press_release_content})
    except Exception as e:
        return jsonify(error=str(e)), 500


@api_blueprint.route('/fetch-fed-interpretation', methods=['POST'])
def get_fed_interpretation():
    try:
        data = request.get_json()
        press_release_content = data
        interpretation_result = fetch_interpretation(press_release_content)
        return jsonify({'interpretation': interpretation_result})
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
