import os
import datetime
from fredapi import Fred
from dotenv import load_dotenv
from pymongo import MongoClient
import pandas as pd

load_dotenv(".env")
FRED_API_KEY = os.getenv("API_KEY")
fred = Fred(api_key=FRED_API_KEY)
client = MongoClient('localhost', 27017)
db = client.economic_data
collection = db.economic_collection
