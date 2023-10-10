# server.py
from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://127.0.0.1:27017/')
db = client['economic_data']


@app.route('/get_data', methods=['GET'])
def get_data():
    collection = db['economic_collection']
    data = list(collection.find({}, {'_id': False}))

    # Convert NaN to None
    clean_data = [
        {k: (v if v == v else None)
         for k, v in item.items()}  # v==v is False for NaN
        for item in data
    ]

    return jsonify(clean_data)


if __name__ == "__main__":
    app.run(debug=True)
