import os
from dotenv import load_dotenv
import openai
from flask import jsonify

load_dotenv("backend/.env")
AI_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = AI_KEY


def interpretation(text):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"Can you interpret it? {text}"}
            ]
        )

        return response.choices[0].text.strip()
    except Exception as e:
        return e
