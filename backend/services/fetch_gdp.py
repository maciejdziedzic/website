import requests
import re
from bs4 import BeautifulSoup

url = 'https://www.atlantafed.org/cqer/research/gdpnow'


def fetch_gdp():
    try:
        response = requests.get(url)
    except requests.RequestException as e:
        # Log an error and return a 500 response
        print(f"An error occurred: {str(e)}")
        return error(e), 500

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        css_selector = 'body > div.container > article:nth-child(2) > section > div:nth-child(2) > div.col-lg-11 > div > div.col-lg-9 > div.row.GDPNowLatest > p:nth-child(1) > strong'

        desired_element = soup.select_one(css_selector)

        if desired_element is not None:
            element_text = desired_element.get_text(strip=True)
            match = re.search(r'(\d+\.\d+|\d+)', element_text)

            if match:
                return (float(match.group()))
            else:
                return ("No GDP number found"), 404
        else:
            return ("Element not found"), 404
    else:
        return ("Failed to retrieve the page"), 500
