from flask import jsonify
from fredapi import Fred
import openai
from dotenv import load_dotenv
import os
import pathlib
import requests
from bs4 import BeautifulSoup
import re


env_path = pathlib.Path(__file__).resolve().parent.parent / '.env'
load_dotenv(dotenv_path=env_path)
FRED_API_KEY = os.getenv("FRED_API_KEY")
fred = Fred(api_key=FRED_API_KEY)
AI_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = AI_KEY


def fetch_data():
    url = 'https://www.clevelandfed.org/indicators-and-data/inflation-nowcasting'
    data = {}
    error_messages = []

    # Fetch CPI
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            gdp_css_selector = '#content > div.row.component.column-splitter > div.col-12.col-lg-8.cf-bordered--right.cf-indent--bottom.cf-indent--left.cf-indent--right.cf-section__main > div:nth-child(4) > div > figure > table > tbody > tr:nth-child(2) > td:nth-child(2)'
            desired_element = soup.select_one(gdp_css_selector)
            if desired_element is not None:
                element_text = desired_element.get_text(strip=True)
                match = re.search(r'(\d+\.\d+|\d+)', element_text)
                if match:
                    data['cpi'] = float(match.group())
                    data['cpi_status'] = "success"
                else:
                    raise ValueError("No GDP number found")
            else:
                raise ValueError("Element not found")
        else:
            raise ValueError("Failed to retrieve the page")
    except Exception as e:
        data['cpi'] = None
        data['cpi_status'] = "error"
        data['cpi_error'] = str(e)

    return data


def fetch_text():

    url = "https://www.federalreserve.gov/"  # Assuming this is the main page URL
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    speech_links = soup.find_all(
        'a', href=True, string=lambda t: t and 'Speech by Governor' in t)
    newest_speech_link = speech_links[0]['href']

    base_url = 'https://www.federalreserve.gov'
    full_link = base_url + newest_speech_link
    # print(full_link)

    if not speech_links:
        raise ValueError("No speech links found!")

    speech_url = f"https://www.federalreserve.gov{newest_speech_link}"
    response = requests.get(speech_url)
    soup = BeautifulSoup(response.content, 'html.parser')

    p_tags = soup.select("#article > div:nth-child(3) > p")[:3]
    speech_content = [p.get_text() for p in p_tags]
    if speech_content:
        # print(type(speech_content))
        pass
    else:
        print("Failed to retrieve speech content.")

    return speech_content


def interpretation(speech_content):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"You will be given a text snippet. Your task is to determine its potential impact on interest rates. Return -1 if you believe the text indicates a negative impact on interest rates, 0 if it suggests no impact, and 1 if it indicates a positive impact. Please interpret the following text:{speech_content}"}
            ]
        )
        # Return content directly
        return response.choices[0].message['content']
        # return result

    except Exception as e:
        return str(e)


def fetch_combined_data():

    cpi_data = fetch_data()

    speech_content = fetch_text()

    interpretation_result = interpretation(speech_content)

    combined_data = {
        'cpi_data': cpi_data,
        'speech_content': speech_content,
        'interpretation': interpretation_result
    }

    return combined_data
