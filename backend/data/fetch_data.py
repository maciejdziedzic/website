from pymongo import MongoClient
import pandas as pd
import os
import pathlib
from dotenv import load_dotenv
import datetime
from fredapi import Fred

# Determine paths and load .env file
env_path = Path(__file__).resolve().parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

FRED_API_KEY = os.getenv("FRED_API_KEY")
fred = Fred(api_key=FRED_API_KEY)

client = MongoClient('localhost', 27017)
db = client.data_project2
collection = db.collection_project2

# Define your series dictionary, start and end dates as before
series_dict = {
    'bonds2tr': ('DGS2', 'M'),
    'gdpworld': ('NYGDPMKTPCDWLD', 'A'),
    'gdp': ('GDP', 'Q'),
    'recession': ('JHDUSRGDPBR', 'Q'),
    'bond10tr': ('DGS10', 'M'),
    'ppi': ('PPIACO', 'M'),
    'cpi': ('CPIAUCSL', 'M'),
    'unrate': ('UNRATE', 'M'),
    'debt': ('GFDEBTN', 'Q'),
    'fedrate': ('FEDFUNDS', 'M'),
    'm0': ('BOGMBASE', 'M'),
    'm3': ('MABMM301USM189S', 'M'),
    'cbasstogdp': ('DDDI06USA156NWDB', 'A'),
    'resins': ('TOTRESNS', 'M'),
    'oil': ('WTISPLC', 'M'),
    'indpro': ('INDPRO', 'M'),
    'houses': ('MSPUS', 'Q'),
    'cp': ('CP', 'Q')
}

# Define dates
start_date = datetime.datetime(1970, 1, 1)
end_date = datetime.datetime(2022, 12, 31)

# Initialize DataFrames
dfs = {'M': pd.DataFrame(), 'Q': pd.DataFrame(), 'A': pd.DataFrame()}

# Function to fetch and merge series data
dd = fred.get_series('UNRATE')

print(type(dd))
# def fetch_and_merge(df, var_name, series_id, start, end):
#     series_data = fred.get_series(series_id)
#     series_data = series_data.loc[start_date:end_date]
#     series_df = series_data.to_frame(name=var_name)
#     series_df.index.name = 'date'
#     return df.join(series_df, how='inner') if not df.empty else series_df


# # Loop through each series
# for var_name, (series_id, freq) in series_dict.items():
#     dfs[freq] = fetch_and_merge(
#         dfs[freq], var_name, series_id, start_date, end_date)

# # Merge the DataFrames
# df = dfs['M'].join(dfs['Q'], how='outer').join(dfs['A'], how='outer')
# print(df.head())
