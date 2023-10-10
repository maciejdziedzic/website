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
