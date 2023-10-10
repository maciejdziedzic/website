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
    print(data)
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
