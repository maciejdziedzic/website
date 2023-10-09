# data.py
import os
import datetime
from fredapi import Fred
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv(".env")
FRED_API_KEY = os.getenv("API_KEY")
fred = Fred(api_key=FRED_API_KEY)
client = MongoClient('mongodb://127.0.0.1:27017/')
db = client['chartData']


def fetch_and_store_data():
    start_date = datetime.datetime(1970, 1, 1)
    end_date = datetime.datetime(2022, 12, 31)
    __bonds2tr = fred.get_series('DGS2', start=start_date, end=end_date)

    # Assuming __bonds2tr is a pandas Series. Convert it to a dict for MongoDB insertion.
    # Convert the Timestamp keys to string
    data_to_store = {str(k): v for k, v in __bonds2tr.to_dict().items()}
    print(data_to_store)
    # Here, you may decide on how you want to structure the data in MongoDB.
    # If you wish to store the entire series in a single document,
    # you might need a collection where each document represents a series.
    db.bonds2tr.insert_one({"data": data_to_store})


fetch_and_store_data()
