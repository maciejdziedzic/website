from flask import Blueprint, jsonify, request
from services.fetch_data import fetch_data
import pandas as pd
from model.run_model import run_model
import joblib
import logging

logging.basicConfig(level=logging.DEBUG)

api_blueprint = Blueprint('api', __name__, url_prefix='/api')


@api_blueprint.route('/fetch-data', methods=['GET'])
def get_data():
    try:
        data = fetch_data()

        return jsonify(data)
    except Exception as e:
        return jsonify(error=str(e)), 500


logistic_regression = joblib.load('data/saved_model.pkl')


@api_blueprint.route('/run-model', methods=['POST'])
def predict():

    try:
        data = request.get_json()
        print(data)
        # # Extract gdp and iyc values
        gdp = data.get('gdp')
        iyc = data.get('iyc')

        # # Run model
        feature_values = [gdp, iyc]
        feature_names = ['gdp', 'iyc']
        X_test = pd.DataFrame([feature_values], columns=feature_names)

        pred_test = logistic_regression.predict(X_test)
        print(type(str(pred_test)))
        # # Return prediction as JSON
        return jsonify(str(pred_test))
        # return jsonify(prediction=pred_test.tolist())

    except Exception as e:
        return jsonify(error=str(e)), 500
