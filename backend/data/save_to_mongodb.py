from pymongo import MongoClient
import pandas as pd
import os
import pathlib
from dotenv import load_dotenv
import datetime
from fredapi import Fred

env_path = pathlib.Path(__file__).resolve().parent.parent / '.env'
load_dotenv(dotenv_path=env_path)
FRED_API_KEY = os.getenv("FRED_API_KEY")
fred = Fred(api_key=FRED_API_KEY)


client = MongoClient('localhost', 27017)
db = client.project2_db
collection = db.project2_collection

# Define your series dictionary, start and end dates as before
series_dict = {
    'bonds2tr': ('DGS2', 'D'),
    'gdpworld': ('NYGDPMKTPCDWLD', 'A'),
    'gdp': ('GDP', 'Q'),
    'recession': ('JHDUSRGDPBR', 'Q'),
    'bonds10tr': ('DGS10', 'D'),
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
dfs = {'D': pd.DataFrame(), 'M': pd.DataFrame(),
       'Q': pd.DataFrame(), 'A': pd.DataFrame()}


def fetch_and_merge(df, var_name, series_id, start, end):
    series_data = fred.get_series(series_id)
    series_data = series_data.loc[start_date:end_date]
    series_df = series_data.to_frame(name=var_name)
    series_df.index.name = 'date'
    return df.join(series_df, how='inner') if not df.empty else series_df


# Loop through each series
for var_name, (series_id, freq) in series_dict.items():
    dfs[freq] = fetch_and_merge(
        dfs[freq], var_name, series_id, start_date, end_date)

df = {}
df['D_M'] = dfs['D'].resample('M').last()
df['M_M'] = dfs['M'].resample('M').last()
df['Q_M'] = dfs['Q'].resample('M').ffill()
new_dates = pd.date_range(
    start=df['Q_M'].index.min(), end='2022-12-31', freq='M')
df['Q_M'] = df['Q_M'].reindex(new_dates).ffill()

data = pd.concat([df['D_M'], df['M_M'], df['Q_M']], axis=1)

data = data.reset_index()
data_to_insert = data.to_dict(orient='records')
collection.insert_many(data_to_insert)
