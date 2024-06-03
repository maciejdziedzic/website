from pymongo import MongoClient
import pandas as pd
import os
import pathlib
from dotenv import load_dotenv
import datetime
from fredapi import Fred

env_path = pathlib.Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=env_path)
FRED_API_KEY = os.getenv("FRED_API_KEY")
fred = Fred(api_key=FRED_API_KEY)


client = MongoClient('localhost', 27017)
db = client.project2_db
collection = db.project2_collection

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
    'wages': ('AHETPI', 'M'),
    'cp': ('CP', 'Q'),
    'fed_debt_to_gdp': ('GFDGDPA188S', 'A'),
    'comm_banks_borrowings': ('LOANINV', 'M')
}

# Initialize DataFrames
dfs = {'D': pd.DataFrame(), 'M': pd.DataFrame(),
       'Q': pd.DataFrame(), 'A': pd.DataFrame()}


def fetch_data(df, var_name, series_id):
    series_data = fred.get_series(series_id)
    series_df = series_data.to_frame(name=var_name)
    series_df.index.name = 'date'
    return df.join(series_df, how='outer') if not df.empty else series_df


for var_name, (series_id, freq) in series_dict.items():
    dfs[freq] = fetch_data(dfs[freq], var_name, series_id)

df = {}
df['D_M'] = dfs['D'].resample('M').last()
df['M_M'] = dfs['M'].resample('M').last()
df['Q_M'] = dfs['Q'].resample('M').ffill()
df['A_M'] = dfs['A'].resample('M').ffill()
# new_dates = pd.date_range(
#     start=df['Q_M'].index.min(), end='2022-12-31', freq='M')
# df['Q_M'] = df['Q_M'].reindex(new_dates).ffill()
# df['A_M'] = dfs['A'].resample('M').ffill()

data = pd.concat([df['D_M'], df['M_M'], df['Q_M'], df['A_M']], axis=1)

data['wages_month'] = round(data['wages'] * 168, 2)
data['house_wages'] = round(data['houses']/data['wages_month'], 2)
data['iyc'] = round(data['bonds10tr'] - data['bonds2tr'], 2)
data['gdp_pct'] = round(data['gdp'].pct_change(periods=4) * 100, 2)
data['gdp_pct_ma4'] = round(data['gdp_pct'].rolling(window=12).mean(), 2)
data['gdpworld_pct'] = round(data['gdpworld'].pct_change(12) * 100, 2)
# data['debt_to_gdp'] = round(100 * data['debt'] / data['gdp']/1000, 2)
data['debt_to_gdp'] = round(data['fed_debt_to_gdp'], 2)
data['resins_to_gdp'] = round(100 * data['resins'] / data['gdp'], 2)
data['cbasstogdp'] = round(data['cbasstogdp'], 2)
data['cp_to_gdp'] = round(100 * data['cp'] / data['gdp'], 2)
data['m0_to_gdp'] = round(data['m0'] / data['gdp']/1000 * 100, 2)
data['m3_to_gdp'] = round((data['m3']/1000000) / data['gdp']/1000 * 100, 2)
# data['cpi_pct'] = round(data['cpi'].pct_change(periods=12) * 100, 2)
data['ppi_pct'] = round(data['ppi'].pct_change(periods=12) * 100, 2)
data['indpro'] = round(data['indpro'], 2)
data['oil'] = round(data['oil'], 2)
data['comm_banks_to_gdp'] = round(
    100 * (data['comm_banks_borrowings'] / (data['gdp'])), 2)

base_year = 258.906
data['adjusted_oil'] = data['oil'] * (base_year / data['cpi'])

csv_file_path = '../../frontend/public/cpi_manual_data.csv'
df = pd.read_csv(csv_file_path)
# Filter columns
month_columns = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
                 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
df_filtered = df[['Year'] + month_columns]

# Melt the dataframe
df_melted = df_filtered.melt(
    id_vars='Year', var_name='Month', value_name='value')

# Extract month and convert to numeric
df_melted['Month'] = df_melted['Month'].apply(lambda x: {
                                              'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12}[x])
df_melted['date'] = pd.to_datetime(df_melted['Year'].astype(
    str) + '-' + df_melted['Month'].astype(str) + '-01')
df_melted['date'] = df_melted['date'] + pd.offsets.MonthEnd(0)
df_melted.set_index('date', inplace=True)
df_melted.sort_index(inplace=True)
df_melted['cpi_manual'] = df_melted['value']
merged_df = data.merge(df_melted['cpi_manual'], on='date', how='left')

merged_df.index.name = 'date'
data = merged_df.reset_index()

data_to_insert = data.to_dict(orient='records')
collection.insert_many(data_to_insert)
