import joblib
import numpy as np
import pandas as pd


# feature_values = [0.05,  0.4]
# feature_names = ['gdp', 'iyc']

# X_test = pd.DataFrame([feature_values], columns=feature_names)
# pred_test = logistic_regression.predict(X_test)

# print(pred_test)


def run_model():
    logistic_regression = joblib.load('data/saved_model.pkl')

    return log_msg
