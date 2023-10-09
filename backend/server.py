# server.py
from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://127.0.0.1:27017/')
db = client['chartData']


@app.route('/get_data', methods=['GET'])
def get_data():
    # Query data from MongoDB and send it as JSON.
    # Omitting MongoDB _id for JSON serialization
    data = db.bonds2tr.find_one({}, {"_id": 0})
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
