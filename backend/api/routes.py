from flask import Blueprint, jsonify, request
from services.fetch_iyc import fetch_iyc
from services.fetch_gdp import fetch_gdp
from services.fetch_data import fetch_data
from model.run_model import run_model

api_blueprint = Blueprint('api', __name__, url_prefix='/api')


@api_blueprint.route('/fetch-data', methods=['GET'])
def get_data():
    try:
        t10y2y = fetch_iyc()
        gdp = fetch_gdp()
        return jsonify({'t10y2y': t10y2y, 'gdp': gdp})
    except Exception as e:
        return jsonify(error=str(e)), 500


@api_blueprint.route('/run-model', methods=['GET', 'POST'])
def get_model_data():
    try:
        model = run_model()
        return jsonify(model)
    except Exception as e:
        return jsonify(error=str(e)), 500
