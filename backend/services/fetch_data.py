from flask import jsonify
from fredapi import Fred
from dotenv import load_dotenv
import os
import requests
from bs4 import BeautifulSoup
import re

# Load FRED API Key
load_dotenv(".env")
FRED_API_KEY = os.getenv("FRED_API_KEY")
fred = Fred(api_key=FRED_API_KEY)

url = 'https://www.atlantafed.org/cqer/research/gdpnow'


def fetch_data():
    data = {}
    error_messages = []

    # Fetch IYC
    try:
        bonds2tr = fred.get_series('T10Y2Y')
        data['iyc'] = bonds2tr.to_list()[-1]
        data['iyc_status'] = "success"
    except Exception as e:
        data['iyc'] = None
        data['iyc_status'] = "error"
        data['iyc_error'] = str(e)

    # Fetch GDP
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            css_selector = 'body > div.container > article:nth-child(2) > section > div:nth-child(2) > div.col-lg-11 > div > div.col-lg-9 > div.row.GDPNowLatest > p:nth-child(1) > strong'
            desired_element = soup.select_one(css_selector)
            if desired_element is not None:
                element_text = desired_element.get_text(strip=True)
                match = re.search(r'(\d+\.\d+|\d+)', element_text)
                if match:
                    data['gdp'] = float(match.group())
                    data['gdp_status'] = "success"
                else:
                    raise ValueError("No GDP number found")
            else:
                raise ValueError("Element not found")
        else:
            raise ValueError("Failed to retrieve the page")
    except Exception as e:
        data['gdp'] = None
        data['gdp_status'] = "error"
        data['gdp_error'] = str(e)

    return jsonify(data)
