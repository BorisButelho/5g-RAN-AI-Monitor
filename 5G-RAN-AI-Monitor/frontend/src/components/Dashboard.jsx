import { useEffect, useState } from "react";
import axios from "axios";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";

function Dashboard() {

    const [towers, setTowers] = useState([]);
    const [selectedTower, setSelectedTower] = useState(null);
    const [chartData, setChartData] = useState([]);

    const generateInitialChartData = (tower) => {

        const temp =
            tower.tower_metrics.temperature;

        const latency =
            tower.tower_metrics.latency;

        const packetLoss =
            tower.tower_metrics.packet_loss;

        return Array.from({ length: 8 }, (_, i) => ({

            time: `${i + 1}`,

            temperature:
                temp + (Math.random() * 8 - 4),

            latency:
                latency + (Math.random() * 20 - 10),

            packet_loss:
                packetLoss + (Math.random() * 2 - 1)

        }));
    };

    const fetchPredictions = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/predict"
            );

            const incomingTowers =
                response.data.towers;

            setTowers(incomingTowers);

            if (
                !selectedTower &&
                incomingTowers.length > 0
            ) {

                const firstTower =
                    incomingTowers[0];

                setSelectedTower(firstTower);

                setChartData(
                    generateInitialChartData(firstTower)
                );
            }

            if (selectedTower) {

                const updatedTower =
                    incomingTowers.find(
                        tower =>
                            tower.tower_name ===
                            selectedTower.tower_name
                    );

                if (updatedTower) {

                    setSelectedTower(updatedTower);

                    setChartData(prev => [

                        ...prev.slice(-11),

                        {
                            time:
                                new Date().toLocaleTimeString(),

                            temperature:
                                updatedTower.tower_metrics
                                    .temperature,

                            latency:
                                updatedTower.tower_metrics
                                    .latency,

                            packet_loss:
                                updatedTower.tower_metrics
                                    .packet_loss
                        }

                    ]);
                }
            }

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {

        fetchPredictions();

        const interval =
            setInterval(fetchPredictions, 8000);

        return () => clearInterval(interval);

    }, []);

    const getStatusColor = (status) => {

        if (status === "FAILURE") {
            return "#ff4d4f";
        }

        if (status === "WARNING") {
            return "#f59e0b";
        }

        return "#22c55e";
    };

    const getStatusBg = (status) => {

        if (status === "FAILURE") {
            return "#2b0b12";
        }

        if (status === "WARNING") {
            return "#2d1f08";
        }

        return "#0d2014";
    };

    return (

        <div
            style={{
                background: "#000000",
                width: "100vw",
                height: "100vh",
                color: "#f1f5f9",
                fontFamily: "Arial",
                display: "flex",
                overflow: "hidden"
            }}
        >

            <div
                style={{
                    width: "360px",
                    minWidth: "360px",
                    background: "#050816",
                    borderRight: "1px solid #1e293b",
                    padding: "24px",
                    overflowY: "auto"
                }}
            >

                <h1
                    style={{
                        fontSize: "34px",
                        marginBottom: "10px",
                        color: "#f8fafc"
                    }}
                >
                    5G RAN NOC
                </h1>

                <p
                    style={{
                        color: "#64748b",
                        marginBottom: "35px",
                        lineHeight: "1.6",
                        fontSize: "15px"
                    }}
                >
                    Mumbai Telecom Infrastructure Monitoring
                </p>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "18px"
                    }}
                >

                    {towers.map((tower, index) => (

                        <div
                            key={index}

                            onClick={() => {

                                setSelectedTower(tower);

                                setChartData(
                                    generateInitialChartData(tower)
                                );

                            }}

                            style={{
                                background:
                                    selectedTower?.tower_name ===
                                        tower.tower_name
                                        ? "#111827"
                                        : "#0b1120",

                                border:
                                    selectedTower?.tower_name ===
                                        tower.tower_name
                                        ? `2px solid ${getStatusColor(
                                            tower.prediction
                                        )}`
                                        : "1px solid #1e293b",

                                borderRadius: "18px",

                                padding: "20px",

                                cursor: "pointer",

                                transition: "0.2s",

                                boxShadow:
                                    selectedTower?.tower_name ===
                                        tower.tower_name
                                        ? `0 0 25px ${getStatusColor(
                                            tower.prediction
                                        )}55`
                                        : "none"
                            }}
                        >

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",

                                    alignItems: "center",

                                    marginBottom: "16px"
                                }}
                            >

                                <div>

                                    <h2
                                        style={{
                                            fontSize: "21px",
                                            lineHeight: "1.4",
                                            color: "#f8fafc"
                                        }}
                                    >
                                        {tower.tower_name}
                                    </h2>

                                    <p
                                        style={{
                                            color: "#64748b",
                                            fontSize: "12px",
                                            marginTop: "5px"
                                        }}
                                    >
                                        5G NR Sector Monitoring
                                    </p>

                                </div>

                                <div
                                    style={{
                                        background:
                                            getStatusBg(
                                                tower.prediction
                                            ),

                                        color:
                                            getStatusColor(
                                                tower.prediction
                                            ),

                                        padding: "8px 14px",

                                        borderRadius: "10px",

                                        fontWeight: "bold",

                                        fontSize: "12px"
                                    }}
                                >
                                    {tower.prediction}
                                </div>

                            </div>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "1fr 1fr",

                                    gap: "12px"
                                }}
                            >

                                <div
                                    style={{
                                        background: "#172033",
                                        padding: "14px",
                                        borderRadius: "12px"
                                    }}
                                >

                                    <p
                                        style={{
                                            color: "#64748b",
                                            fontSize: "10px",
                                            marginBottom: "8px"
                                        }}
                                    >
                                        LATENCY
                                    </p>

                                    <h3
                                        style={{
                                            fontSize: "22px",
                                            color: "#f8fafc"
                                        }}
                                    >
                                        {tower.tower_metrics
                                            .latency.toFixed(0)}
                                    </h3>

                                </div>

                                <div
                                    style={{
                                        background: "#172033",
                                        padding: "14px",
                                        borderRadius: "12px"
                                    }}
                                >

                                    <p
                                        style={{
                                            color: "#64748b",
                                            fontSize: "10px",
                                            marginBottom: "8px"
                                        }}
                                    >
                                        TEMPERATURE
                                    </p>

                                    <h3
                                        style={{
                                            fontSize: "22px",
                                            color: "#f8fafc"
                                        }}
                                    >
                                        {tower.tower_metrics
                                            .temperature.toFixed(0)}°C
                                    </h3>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            <div
                style={{
                    flex: 1,
                    padding: "35px",
                    overflowY: "auto",
                    background: "#020617"
                }}
            >

                {selectedTower && (

                    <>

                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",

                                alignItems: "center",

                                marginBottom: "35px"
                            }}
                        >

                            <div>

                                <h1
                                    style={{
                                        fontSize: "44px",
                                        marginBottom: "10px",
                                        color: "#f8fafc"
                                    }}
                                >
                                    {selectedTower.tower_name}
                                </h1>

                                <p
                                    style={{
                                        color: "#64748b",
                                        fontSize: "16px"
                                    }}
                                >
                                    Real-Time 5G NR Tower Analytics
                                    & Predictive Monitoring
                                </p>

                            </div>

                            <div
                                style={{
                                    background:
                                        getStatusBg(
                                            selectedTower.prediction
                                        ),

                                    color:
                                        getStatusColor(
                                            selectedTower.prediction
                                        ),

                                    padding: "16px 28px",

                                    borderRadius: "14px",

                                    fontWeight: "bold",

                                    fontSize: "18px"
                                }}
                            >
                                {selectedTower.prediction}
                            </div>

                        </div>

                        <div
                            style={{
                                display: "grid",

                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(220px, 1fr))",

                                gap: "18px",

                                marginBottom: "35px"
                            }}
                        >

                            {Object.entries(
                                selectedTower.tower_metrics
                            ).map(([key, value]) => (

                                <div
                                    key={key}
                                    style={{
                                        background: "#0b1120",

                                        border:
                                            "1px solid #1e293b",

                                        borderRadius: "18px",

                                        padding: "24px"
                                    }}
                                >

                                    <p
                                        style={{
                                            color: "#64748b",
                                            fontSize: "12px",
                                            marginBottom: "14px",
                                            letterSpacing: "1px"
                                        }}
                                    >
                                        {key
                                            .replaceAll("_", " ")
                                            .toUpperCase()}
                                    </p>

                                    <h2
                                        style={{
                                            fontSize: "36px",
                                            color: "#f8fafc",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {value.toFixed
                                            ? value.toFixed(2)
                                            : value}
                                    </h2>

                                </div>

                            ))}

                        </div>

                        <div
                            style={{
                                display: "grid",

                                gridTemplateColumns:
                                    "1fr 1fr",

                                gap: "24px"
                            }}
                        >

                            <div
                                style={{
                                    background: "#0b1120",

                                    border:
                                        "1px solid #1e293b",

                                    borderRadius: "20px",

                                    padding: "28px"
                                }}
                            >

                                <h2
                                    style={{
                                        marginBottom: "14px",
                                        fontSize: "28px",
                                        color: "#f8fafc"
                                    }}
                                >
                                    Tower Temperature Trend
                                </h2>

                                <div
                                    style={{
                                        width: "100%",
                                        height: "420px"
                                    }}
                                >

                                    <ResponsiveContainer>

                                        <LineChart data={chartData}>

                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                stroke="#1e293b"
                                            />

                                            <XAxis
                                                dataKey="time"
                                                tick={{
                                                    fill: "#94a3b8"
                                                }}
                                            />

                                            <YAxis
                                                tick={{
                                                    fill: "#94a3b8"
                                                }}
                                            />

                                            <Tooltip />

                                            <Line
                                                type="monotone"
                                                dataKey="temperature"
                                                stroke="#38bdf8"
                                                strokeWidth={3}
                                                dot={{
                                                    r: 4
                                                }}
                                            />

                                        </LineChart>

                                    </ResponsiveContainer>

                                </div>

                            </div>

                            <div
                                style={{
                                    background: "#0b1120",

                                    border:
                                        "1px solid #1e293b",

                                    borderRadius: "20px",

                                    padding: "28px"
                                }}
                            >

                                <h2
                                    style={{
                                        marginBottom: "14px",
                                        fontSize: "28px",
                                        color: "#f8fafc"
                                    }}
                                >
                                    Network Instability Analysis
                                </h2>

                                <div
                                    style={{
                                        width: "100%",
                                        height: "420px"
                                    }}
                                >

                                    <ResponsiveContainer>

                                        <AreaChart data={chartData}>

                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                stroke="#1e293b"
                                            />

                                            <XAxis
                                                dataKey="time"
                                                tick={{
                                                    fill: "#94a3b8"
                                                }}
                                            />

                                            <YAxis
                                                tick={{
                                                    fill: "#94a3b8"
                                                }}
                                            />

                                            <Tooltip />

                                            <Area
                                                type="monotone"
                                                dataKey="latency"
                                                stroke="#ef4444"
                                                fill="#7f1d1d"
                                            />

                                            <Area
                                                type="monotone"
                                                dataKey="packet_loss"
                                                stroke="#f59e0b"
                                                fill="#78350f"
                                            />

                                        </AreaChart>

                                    </ResponsiveContainer>

                                </div>

                            </div>

                        </div>

                    </>

                )}

            </div>

        </div>

    );
}

export default Dashboard;