import os
import datetime
import pandas as pd
import numpy as np
from fredapi import Fred
from dotenv import load_dotenv
from sklearn.model_selection import TimeSeriesSplit
from sklearn.metrics import mean_squared_error
from sklearn.linear_model import LinearRegression
import statsmodels.api as sm
import joblib


def load_data_from_fred(api_key, series_code):
    fred = Fred(api_key=api_key)
    series = fred.get_series(series_code)
    df = pd.DataFrame(series)
    return df


def preprocess_stooq_data(filepath, column_name):
    df = pd.read_csv(filepath)
    df['Data'] = pd.to_datetime(df['Data'])
    df.set_index('Data', inplace=True)
    df = df.rename(columns={"Zamkniecie": column_name})
    df = df[[column_name]]
    df_q = df.resample('Q').last()
    df_q[f'{column_name}_q_pct'] = df_q[column_name].pct_change() * 100
    df_q = df_q.drop(column_name, axis=1)
    return df_q[(df_q.index >= start_date) & (df_q.index <= end_date)]


def build_and_validate_model(X, y, model_name):
    tscv = TimeSeriesSplit(n_splits=2)
    model = LinearRegression()

    for train_index, test_index in tscv.split(X):
        X_train, X_test = X[train_index], X[test_index]
        y_train, y_test = y[train_index], y[test_index]
        model.fit(X_train, y_train)
        predictions = model.predict(X_test)
        mse = mean_squared_error(y_test, predictions)
        print(f"{model_name} Test MSE: {mse}")

    print(f"{model_name} Model Coefficients:", model.coef_)
    print(f"{model_name} Model Intercept:", model.intercept_)

    r2_score_train = model.score(X_train, y_train)
    r2_score_test = model.score(X_test, y_test)

    print(f"{model_name} Training R^2: {r2_score_train}")
    print(f"{model_name} Test R^2: {r2_score_test}")

    # Statsmodels for detailed statistics
    X_with_const = sm.add_constant(X_train)
    ols_model = sm.OLS(y_train, X_with_const)
    result = ols_model.fit()
    print(result.summary())

    # Save model to a .pkl file
    joblib.dump(model, f"{model_name}_model.pkl")

    return model


# Environment setup
load_dotenv("../.env")
FRED_API_KEY = os.getenv("API_KEY")

start_date = datetime.datetime(1970, 1, 1)
end_date = datetime.datetime(2022, 12, 31)

# Data loading and preprocessing
gold = preprocess_stooq_data('../data/xausd.csv', 'gold')
sp500 = preprocess_stooq_data('../data/spx.csv', 'sp500')
cpi = load_data_from_fred(FRED_API_KEY, 'CPIAUCSL')
cpi.columns = ['cpi']
cpi = cpi.resample('Q').last()
cpi['cpi_pct'] = cpi['cpi'].pct_change() * 100
cpi.index = cpi.index + pd.offsets.MonthEnd(0)
cpi.index.name = 'date'
fedrate = load_data_from_fred(FRED_API_KEY, 'FEDFUNDS')
fedrate.columns = ['fedrate']
fedrate_avg = fedrate.resample('Q').mean()
fedrate = fedrate_avg[(fedrate_avg.index >= start_date)
                      & (fedrate_avg.index <= end_date)]
fedrate.index.name = 'date'

# Final DataFrame
df = pd.concat([gold, sp500, cpi, fedrate], axis=1)
df = df.drop(['cpi'], axis=1)
df['fedrate_change'] = df['fedrate'].diff()
df['fed_sentiment'] = np.where(
    df['fedrate_change'] > 0, 1, np.where(df['fedrate_change'] < 0, -1, 0))
df = df.drop(columns=['fedrate_change'])
df = df[(df.index >= start_date) & (df.index <= end_date)]

# Build and validate models
X_sp500 = df[['cpi_pct', 'fed_sentiment']].values
y_sp500 = df['sp500_q_pct'].values
build_and_validate_model(X_sp500, y_sp500, "S&P 500")

X_gold = df[['cpi_pct', 'fed_sentiment']].values
y_gold = df['gold_q_pct'].values
build_and_validate_model(X_gold, y_gold, "Gold")
