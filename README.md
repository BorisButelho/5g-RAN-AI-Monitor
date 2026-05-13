 AI-Based 5G RAN Failure Prediction & Monitoring System

## Overview

AI-Based 5G RAN Failure Prediction & Monitoring System is a real-time telecom infrastructure analytics platform designed to simulate predictive monitoring in a 5G Radio Access Network (RAN) environment.

The system continuously monitors multiple simulated Mumbai-based RAN towers and analyzes live operational metrics such as:

* Signal Strength
* Packet Loss
* Temperature
* Bandwidth Usage
* CPU Usage
* Latency
* Active Users
* Power Voltage

Using a Machine Learning model, the platform classifies tower conditions into:

* NORMAL
* WARNING
* FAILURE

The project demonstrates how AI can be integrated into telecom network operations to enable proactive fault detection and predictive maintenance.

---

# Real-World Problem

Modern telecom infrastructure generates massive amounts of operational telemetry data.

In traditional systems:

* Engineers manually inspect logs
* Issues are often detected after degradation begins
* Root cause analysis takes time
* Downtime impacts users and SLAs

Telecom failures are commonly caused by combinations of:

* Overheating
* Congestion
* Signal degradation
* Power instability
* Transport/network instability
* Hardware overload

Threshold-based systems can miss gradual degradation patterns.

This project addresses the problem by using AI to analyze multiple network metrics simultaneously and predict abnormal tower conditions before complete failure occurs.

---

# AI Contribution

The system uses a Random Forest Classification model trained on telecom telemetry data.

Instead of relying on fixed thresholds, the AI model learns relationships between:

* Network congestion
* Packet loss
* Temperature spikes
* CPU stress
* Traffic load
* Signal degradation

The model predicts whether a tower is:

* Operating normally
* Showing early warning signs
* Approaching failure conditions

This simulates proactive monitoring used in modern telecom Network Operations Centers (NOCs).

---

# Features

* Real-time telecom monitoring dashboard
* Multi-tower RAN simulation
* AI-based predictive classification
* Live telemetry generation
* Tower-specific analytics view
* Temperature trend visualization
* Network instability analysis
* Interactive tower selection
* Enterprise-style dark themed desktop UI
* FastAPI backend API
* React + Vite frontend
* Machine Learning integration with Scikit-learn

---

# System Architecture

```
Simulated Tower Metrics
          ↓
Telemetry Generator (Python)
          ↓
FastAPI Backend API
          ↓
Random Forest Prediction Engine
          ↓
Prediction Results + Tower Metrics
          ↓
React Dashboard Visualization
```

---

# Technologies Used

## Frontend

* React
* Vite
* Axios
* Recharts

## Backend

* Python
* FastAPI
* Uvicorn
* Pandas

## Machine Learning

* Scikit-learn
* Random Forest Classifier
* Joblib

---

# How It Works

## 1. Telemetry Simulation

The backend generates simulated telecom tower metrics including:

* Signal strength
* Packet loss
* Temperature
* Bandwidth usage
* CPU utilization
* Latency
* Active users
* Power voltage

---

## 2. AI Prediction Layer

The generated metrics are passed into the Random Forest model.

The model analyzes relationships between all parameters and predicts:

* NORMAL
* WARNING
* FAILURE

---

## 3. Backend API

FastAPI exposes prediction endpoints and streams live tower analytics.

---

## 4. Frontend Visualization

The React dashboard:

* Displays tower status
* Shows operational KPIs
* Renders temperature trend graphs
* Displays instability analysis charts
* Enables interactive tower monitoring


---

# Future Improvements

* Integration with real telecom telemetry sources
* SNMP/OpenTelemetry integration
* Real-time Kafka streaming
* Authentication and RBAC
* Docker deployment
* Kubernetes deployment
* AI confidence scoring
* Historical analytics storage
* Tower heatmaps
* Geo-mapping integration
* Anomaly detection models
* LSTM-based predictive forecasting


