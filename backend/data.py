import os
import datetime
from fredapi import Fred
from dotenv import load_dotenv

load_dotenv(".env")
FRED_API_KEY = os.getenv("API_KEY")
fred = Fred(api_key=FRED_API_KEY)

start_date = datetime.datetime(1970, 1, 1)
end_date = datetime.datetime(2022, 12, 31)
__bonds2tr = fred.get_series('DGS2')
