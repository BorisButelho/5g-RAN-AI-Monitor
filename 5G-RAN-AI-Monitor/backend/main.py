from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import random
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("model/failure_predictor.pkl")

tower_names = [
    "Mumbai-RAN-BKC-01",
    "Mumbai-RAN-Andheri-02",
    "Mumbai-RAN-Nariman-03",
    "Mumbai-RAN-Powai-04"
]

columns = [
    "signal_strength",
    "packet_loss",
    "temperature",
    "bandwidth_usage",
    "cpu_usage",
    "latency",
    "active_users",
    "power_voltage"
]


def generate_metrics():

    return [
        random.randint(40, 100),
        random.uniform(0, 10),
        random.uniform(20, 95),
        random.uniform(10, 100),
        random.uniform(10, 100),
        random.uniform(1, 300),
        random.randint(10, 1000),
        random.uniform(180, 260)
    ]


@app.get("/")
def home():

    return {
        "message": "5G RAN AI Monitoring Backend Running"
    }


@app.get("/predict")
def predict():

    towers = []

    labels = {
        0: "FAILURE",
        1: "NORMAL",
        2: "WARNING"
    }

    for tower in tower_names:

        sample_data = [generate_metrics()]

        sample_df = pd.DataFrame(
            sample_data,
            columns=columns
        )

        prediction = model.predict(sample_df)

        metrics = {
            "signal_strength": sample_data[0][0],
            "packet_loss": sample_data[0][1],
            "temperature": sample_data[0][2],
            "bandwidth_usage": sample_data[0][3],
            "cpu_usage": sample_data[0][4],
            "latency": sample_data[0][5],
            "active_users": sample_data[0][6],
            "power_voltage": sample_data[0][7]
        }

        towers.append({
            "tower_name": tower,
            "prediction": labels[int(prediction[0])],
            "tower_metrics": metrics
        })

    return {
        "towers": towers
    }
