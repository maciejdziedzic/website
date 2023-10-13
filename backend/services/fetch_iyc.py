from flask import jsonify
from fredapi import Fred
from dotenv import load_dotenv
import os

load_dotenv(".env")
FRED_API_KEY = os.getenv("FRED_API_KEY")
fred = Fred(api_key=FRED_API_KEY)


def fetch_iyc():
    try:
        bonds2tr = fred.get_series('T10Y2Y')
        return bonds2tr.to_list()[-1]
    except Exception as e:
        return print(e), 500
