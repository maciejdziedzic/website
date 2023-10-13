from flask import Blueprint, jsonify, request
from services.fetch_data import fetch_data
# from model.run_model import run_model
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


@api_blueprint.route('/run-model', methods=['POST'])
def predict():
    # data = request.get_json
    # return jsonify(message="Endpoint hit")
    try:
        # Get JSON data
        data = request.get_json()
        # Extract gdp and iyc values
        gdp = data.get('gdp')
        iyc = data.get('iyc')

        print(f"gdp: {gdp}, iyc: {iyc}")
        return jsonify('hello world')
    #     # Run model
    #     feature_values = [gdp, iyc]
    #     # These should be the actual feature names used during training
    #     feature_names = ['gdp', 'iyc']
    #     X_test = pd.DataFrame([feature_values], columns=feature_names)
    #     pred_test = logistic_regression.predict(X_test)

    #     # Return prediction as JSON
    #     return jsonify(prediction=pred_test.tolist())

    except Exception as e:
        return jsonify(error=str(e)), 500
