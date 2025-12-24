import joblib 
from fastapi import FastAPI
import json
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

model = joblib.load('./infant_mortality_model.pkl')
features = joblib.load('./model_features.pkl')

app = FastAPI(title='Infant Mortality Predictor')
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],      # list, not string
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get('/')
def home():
    return {"message":"API running successfully"}

@app.post("/predict")
def predict(data: dict):

    raw_df = pd.DataFrame([data])

    df = pd.get_dummies(
        raw_df,
        columns=["b0","b4","m18","m15","v025","m17"],
        drop_first=False
    )
    df = df.astype(int)
    for col in features:
        if col not in df.columns:
            df[col] = 0


    df = df[features]


    prob = float(model.predict_proba(df)[0][1])

    threshold = 0.35
    raw_score = float(model.predict_proba(df)[0][1])

# Convert to interpretable risk
    risk_of_death = 1 - raw_score

    prediction = "High Risk" if risk_of_death >= 0.45 else "Low Risk"

    return {
    "model_score": round(raw_score, 3),
    "risk_of_death": round(risk_of_death, 3),
    "prediction": prediction
    }