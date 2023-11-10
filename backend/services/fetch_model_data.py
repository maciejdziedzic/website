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


def fetch_cpi():
    url = 'https://www.clevelandfed.org/indicators-and-data/inflation-nowcasting'
    data = {}
    error_messages = []

    # Fetch CPI
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')

            # Find the last table on the page
            tables = soup.find_all('table')
            if tables:
                last_table = tables[-1]
                desired_td = last_table.select_one(
                    'tbody > tr > td:nth-child(2)')
                if desired_td:
                    annualized_pct_change = float(
                        desired_td.get_text(strip=True))
                    # Convert annualized percent change to quarterly percent change
                    quarterly_pct_change = (
                        pow(1 + annualized_pct_change / 100, 0.25) - 1) * 100
                    data['cpi'] = quarterly_pct_change
                    data['cpi_annualized'] = annualized_pct_change
                    data['cpi_status'] = "success"

                else:
                    raise ValueError("No CPI number found in the last table")
            else:
                raise ValueError("No tables found on the page")
        else:
            raise ValueError("Failed to retrieve the page")
    except Exception as e:
        data['cpi'] = None
        data['cpi_status'] = "error"
        data['cpi_error'] = str(e)

    return data


def fetch_unemp():
    unemp = fred.get_series('UNRATE')
    last_unemp = unemp.iloc[-1]

    return last_unemp


def fetch_logistic_data():
    cpi_data = fetch_cpi()
    unemp_value = fetch_unemp()
    cpi_value = cpi_data.get('cpi')
    logistic_data = {'unemp': unemp_value, 'cpi': cpi_value}

    return logistic_data


def fetch_text():
    url = "https://www.federalreserve.gov/"  # Assuming this is the main page URL
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Iterate over the li elements
    base_selector = "#content > div:nth-child(3) > div.col-xs-12.col-sm-8 > ul > li"
    li_tags = soup.select(base_selector)

    newest_press_release_link = None

    for li in li_tags:
        text = li.get_text().lower()
        if "speech" in text or "press release" in text:
            link_tag = li.find('a', href=True)
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

    # if press_release_content:
    #     print(press_release_content)
    # else:
    #     print("Failed to retrieve press release content.")

    return press_release_content


def fetch_interpretation(press_release_content):
    try:
        # openai.api_key = 'force error'
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            temperature=0.5,
            messages=[
                {"role": "system",
                    "content": f"You will be given a text snippet. Your task is to determine its potential impact on interest rates in percentage terms. Return the likelihood that interest rates will rise based on the text. Please provide a response in the form of a percentage. A response of 50% means that the text gives no indication whether interest rates will rise or fall. A response above 50% means that the text suggests a higher likelihood of interest rates increasing, while a response below 50% suggests a higher likelihood of interest rates remaining the same or decreasing. Interpret the following text: {press_release_content}"}
            ]
        )

        # Extract the content
        content = response.choices[0].message['content']

        # Extract the percentage from the content
        percentage = int(re.search(r"(\d+)%", content).group(1))
        # test_percentage = 0.5
        return percentage / 100
        # return test_percentage

    except Exception as e:
        return str(e)


def fetch_fed_data():
    press_release_content = fetch_text()
    interpretation_result = fetch_interpretation(press_release_content)
    fed_data = {
        'press_release_content': press_release_content,
        'interpretation': interpretation_result
    }
    return fed_data
