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

    # Iterate over the li elements
    base_selector = "#content > div:nth-child(3) > div.col-xs-12.col-sm-8 > ul > li"
    li_tags = soup.select(base_selector)

    newest_press_release_link = None

    for li_tag in li_tags:
        span_tag_text = li_tag.select_one(
            'p > span').text.lower() if li_tag else ""
        if 'press release' in span_tag_text:
            # Extract the link from the matching li element
            link_tag = li_tag.find('a', href=True)
            if link_tag:
                newest_press_release_link = link_tag['href']
                break

    if not newest_press_release_link:
        raise ValueError("No 'Press Release' found!")

    base_url = 'https://www.federalreserve.gov'
    full_link = base_url + newest_press_release_link

    press_release_url = f"https://www.federalreserve.gov{newest_press_release_link}"
    response = requests.get(press_release_url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Fetch paragraphs 1-3 for the press release
    p_tags = soup.select("#article > div:nth-child(3) > p")[:3]

    press_release_content = [p.get_text() for p in p_tags]
    if press_release_content:
        print(press_release_content)
    else:
        print("Failed to retrieve press release content.")

    return press_release_content


def interpretation(press_release_content):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            temperature=0.2,
            messages=[
                {"role": "system", "content": f"You will be given a text snippet. Your task is to determine its potential impact on interest rates. Explicitly return '-1' if you believe the text indicates a negative impact on interest rates, '0' if it suggests no impact, and '1' if it indicates a positive impact. Do not provide any other type of response. Please interpret the following text: {press_release_content}"}
            ]
        )

        # Extract the content
        content = response.choices[0].message['content']

        # Check and map the content to one of the desired outputs
        if "-1" in content:
            return -1
        elif "0" in content:
            return 0
        elif "1" in content:
            return 1
        else:
            # If the response doesn't match the expected outputs, handle the exception
            raise ValueError("Unexpected response from the model.")

    except Exception as e:
        return str(e)


def fetch_combined_data():

    cpi_data = fetch_data()

    press_release_content = fetch_text()

    interpretation_result = interpretation(press_release_content)

    combined_data = {
        'cpi_data': cpi_data,
        'press_release_content': press_release_content,
        'interpretation': interpretation_result
    }

    return combined_data
