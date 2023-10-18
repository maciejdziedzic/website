import joblib

# 1. Load the saved model from the .pkl file
model_path = 'S&P500_model.pkl'
model = joblib.load(model_path)

# 2. Prepare the sample input values
# The double brackets ensure the values are shaped correctly for the model input
sample_values = [[2.88, 1]]

# 3. Make a prediction using the loaded model
predicted_gold_value = model.predict(sample_values)

print(f"Predicted Gold Value: {predicted_gold_value[0]}")
