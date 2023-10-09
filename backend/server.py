from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://127.0.0.1:27017/')

db = client['chartData']


@app.route('/add_data', methods=['GET'])
def add_data():
    sample_data = {"name": "example", "value": 100}
    db.sample_collection.insert_one(sample_data)
    return jsonify({"message": "Data added"}), 200


if __name__ == "__main__":
    app.run(debug=True)
