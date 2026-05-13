import pandas as pd
import numpy as np
import random

data = []

for i in range(5000):

    signal_strength = random.randint(40, 100)
    packet_loss = random.uniform(0, 10)
    temperature = random.uniform(20, 95)
    bandwidth_usage = random.uniform(10, 100)
    cpu_usage = random.uniform(10, 100)
    latency = random.uniform(1, 300)
    active_users = random.randint(10, 1000)
    power_voltage = random.uniform(180, 260)

    status = "NORMAL"

    if (
        temperature > 80 or
        packet_loss > 7 or
        latency > 250 or
        power_voltage < 190
    ):
        status = "FAILURE"

    elif (
        temperature > 65 or
        packet_loss > 4 or
        latency > 180
    ):
        status = "WARNING"

    data.append([
        signal_strength,
        packet_loss,
        temperature,
        bandwidth_usage,
        cpu_usage,
        latency,
        active_users,
        power_voltage,
        status
    ])

columns = [
    "signal_strength",
    "packet_loss",
    "temperature",
    "bandwidth_usage",
    "cpu_usage",
    "latency",
    "active_users",
    "power_voltage",
    "status"
]

df = pd.DataFrame(data, columns=columns)

df.to_csv("generated_data.csv", index=False)

print("Dataset generated successfully!")
