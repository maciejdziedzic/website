from flask import Blueprint, jsonify, request
from services.fetch_iyc import fetch_iyc
from services.fetch_gdp import fetch_gdp
from model.run_model import run_model

api_blueprint = Blueprint('api', __name__, url_prefix='/api')


@api_blueprint.route('/fetch-t10y2y', methods=['GET', 'POST'])
def get_bonds():
    try:
        t10y2y = fetch_iyc()
        print(t10y2y)
        return jsonify(t10y2y)
    except Exception as e:
        return jsonify(error=str(e)), 500


@api_blueprint.route('/fetch-gdp', methods=['GET', 'POST'])
def get_gdp():
    try:
        gdp = fetch_gdp()
        print(gdp)
        return jsonify(gdp)
    except Exception as e:
        return jsonify(error=str(e)), 500


@api_blueprint.route('/run-model', methods=['GET', 'POST'])
def get_model_data():
    try:
        model = run_model()
        return jsonify(model)
    except Exception as e:
        return jsonify(error=str(e)), 500
