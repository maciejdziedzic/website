import os
import datetime
from fredapi import Fred
from dotenv import load_dotenv
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, classification_report, accuracy_score
import joblib
import numpy as np

load_dotenv("backend/.env")
FRED_API_KEY = os.getenv("API_KEY")
fred = Fred(api_key=FRED_API_KEY)

start_date = datetime.datetime(1970, 1, 1)
end_date = datetime.datetime(2022, 12, 31)
extended_date_range = pd.date_range(start=start_date, end=end_date)

series_dict = {
    'bonds2tr': ('DGS2', 'M'),
    'gdp': ('GDP', 'Q'),
    'recession': ('JHDUSRGDPBR', 'Q'),
    'bonds10tr': ('DGS10', 'M'),
    'cpi': ('CPIAUCSL', 'M'),
}

__bonds2tr = fred.get_series(series_dict['bonds2tr'][0])
b2tr_start_date = pd.Timestamp('1976-06-01')
b2tr_end_date = pd.Timestamp('1977-12-31')
missing_start_date = pd.Timestamp('1970-01-31')
mean_value = __bonds2tr[b2tr_start_date:b2tr_end_date].mean()
missing_dates = pd.date_range(
    start=missing_start_date, end=b2tr_start_date - pd.DateOffset(days=1), freq='M')
missing_df = pd.DataFrame(index=missing_dates, data={'bonds2tr': mean_value})
bonds2tr_df = pd.DataFrame(__bonds2tr, columns=['bonds2tr'])
extended_df = pd.concat([missing_df, bonds2tr_df])
result_df = extended_df.resample('Q').last()
bonds2tr = result_df[(result_df.index >= start_date)
                     & (result_df.index <= end_date)]

bonds10tr = fred.get_series(series_dict['bonds10tr'][0])
bonds10tr = pd.DataFrame(bonds10tr, columns=['bonds10tr'])
bonds10tr = bonds10tr.resample('Q').last()
bonds10tr = bonds10tr[(bonds10tr.index >= start_date)
                      & (bonds10tr.index <= end_date)]

iyc = bonds10tr['bonds10tr']/100 - bonds2tr['bonds2tr']/100
iyc = pd.DataFrame(iyc, columns=['iyc'])

cpi = fred.get_series(series_dict['cpi'][0])
cpi = pd.DataFrame(cpi, columns=['cpi'])
cpi = cpi.resample('Q').last()
cpi = cpi[(cpi.index >= start_date) & (cpi.index <= end_date)]

gdp = fred.get_series(series_dict['gdp'][0])
gdp = pd.DataFrame(gdp, columns=['gdp'])
gdp['gdp'] = gdp['gdp'].pct_change()
gdp = gdp[(gdp.index >= start_date) & (gdp.index <= end_date)]
gdp.index = gdp.index.to_period('Q').to_timestamp('Q')

recession = fred.get_series(series_dict['recession'][0])
recession = pd.DataFrame(recession, columns=['recession'])
recession = recession.resample('Q').last()
recession = recession[(recession.index >= start_date)
                      & (recession.index <= end_date)]
df = pd.concat([recession, gdp,  iyc], axis=1)
df.index.name = 'date'

# Splitting data into train and test sets
X = df[['gdp',  'iyc']]
y = df['recession']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# Initializing models
logreg = LogisticRegression()
rf = RandomForestClassifier()

# Fitting and predicting with Logistic Regression
logreg.fit(X_train, y_train)
y_pred_logreg = logreg.predict(X_test)

# Fitting and predicting with Random Forest
rf.fit(X_train, y_train)
y_pred_rf = rf.predict(X_test)

joblib.dump(rf, 'backend/model/saved_model.pkl')
