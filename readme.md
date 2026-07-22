# 🚀 NodePulse - Node.js Monitoring & Observability Stack

A complete monitoring and observability project built with **Node.js**, **Prometheus**, **Grafana**, **Loki**, **Winston**, and **Docker**.

This project demonstrates how to collect application metrics, monitor API performance, generate structured logs, and visualize everything using Grafana dashboards.

---

## ✨ Features

- 📈 Prometheus Metrics Collection
- 📊 Grafana Dashboards
- 📝 Loki Log Aggregation
- 📦 Winston Logging
- ⚡ HTTP Response Time Monitoring
- 📊 Request Counter
- 📉 Histogram Metrics
- 🐳 Dockerized Monitoring Stack
- 📋 JSON Structured Logs
- 🔍 Log Filtering using Grafana Explore

---

## 🛠 Tech Stack

- Node.js
- Express.js
- Prometheus
- Grafana
- Loki
- Winston
- Winston-Loki
- Prom-client
- Response-Time
- Docker

---

# Architecture

```
                Node.js Application
                        │
        ┌───────────────┴────────────────┐
        │                                │
        ▼                                ▼
   Prom-client                      Winston Logger
        │                                │
        ▼                                ▼
  Prometheus Metrics              Winston Loki Transport
        │                                │
        ▼                                ▼
     Prometheus                        Loki
             └──────────────┬────────────┘
                            ▼
                         Grafana
```

---

# Project Structure

```
NodePulse/
│
├── index.js
├── util.js
├── package.json
├── prometheus.yml
├── docker-compose.yml
├── README.md
│
├── dashboards/
│   ├── metrics-dashboard.json
│   └── logs-dashboard.json
│
└── screenshots/
    ├── dashboard.png
    ├── prometheus.png
    └── logs.png
```

---

# Installation

```bash
git clone https://github.com/YOUR_USERNAME/NodePulse.git

cd NodePulse

npm install
```

Run the application

```bash
npm start
```

---

# Start Monitoring Stack

### Prometheus

```bash
docker run -d \
-p 9090:9090 \
-v ${PWD}/prometheus.yml:/etc/prometheus/prometheus.yml \
prom/prometheus
```

### Grafana

```bash
docker run -d \
-p 3000:3000 \
grafana/grafana
```

### Loki

```bash
docker run -d \
-p 3100:3100 \
--name=loki \
grafana/loki
```

---

# Metrics Collected

- Process CPU Usage
- Memory Usage
- Heap Usage
- Heap Total
- Event Loop Lag
- Active Requests
- Active Handles
- Request Counter
- HTTP Response Time Histogram

---

# Logging Features

- Structured JSON Logs
- Info Logs
- Error Logs
- Console Logging
- Loki Integration
- Grafana Log Explorer

---

# Grafana Dashboard

## Metrics Dashboard

![Dashboard](snapshots/Grafana_Dashboard.png)

---

## Logs Dashboard

![Logs](snapshots/loki_logs.png)

---

# Live Dashboard Snapshot

https://snapshots.raintank.io/dashboard/snapshot/SPObaYiNTIsE5DtTQVJFSgUZ4FLQZaEj

---

# API Endpoints

| Endpoint | Description |
|----------|-------------|
| / | Home Route |
| /slow | Heavy Processing Route |
| /metrics | Prometheus Metrics |

---

# Future Improvements

- Alertmanager Integration
- Kubernetes Deployment
- Docker Compose Stack
- CI/CD Pipeline
- OpenTelemetry
- Distributed Tracing

---

# Author

**Sudarshan Herwade**

