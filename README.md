# PhishGuard AI – Multi-Stack Phishing Detection System

PhishGuard AI is an AI-powered phishing detection ecosystem consisting of a browser extension, a unified backend, an AI inference service, and a management website. It analyzes URLs and webpage content in real-time to provide explainable risk scoring.

## 🏗️ Architecture

The project is organized into four main components:

- **`/backend`**: Java Spring Boot 3.x application. Acts as the orchestrator and API gateway.
- **`/ai-service`**: Python Flask service that hosts the `scikit-learn` phishing detection model.
- **`/frontend/extension`**: "WiseShield" browser extension (Chromium-based).
- **`/frontend/website`**: Next.js 16 management dashboard and information portal.

## 🚀 Getting Started

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running the System
To launch the entire stack (Backend, AI Service, and Website), run:

```bash
docker-compose up --build
```

- **Backend API**: `http://localhost:8080/api/v1`
- **AI Service**: `http://localhost:5001`
- **Website Dashboard**: `http://localhost:3000`

### Installing the Browser Extension
1. Open Chrome and go to `chrome://extensions/`.
2. Enable **"Developer mode"**.
3. Click **"Load unpacked"**.
4. Select the `frontend/extension` folder.
5. The extension is pre-configured to connect to `http://localhost:8080/api/v1`.

## 🛡️ Detection Logic

PhishGuard AI uses a hybrid approach for detection:

1. **Heuristic Analysis (40%)**: Rule-based checks on URL length, subdomain depth, keyword detection, and credential field presence.
2. **AI Analysis (60%)**: Machine learning classification of URL intent using a pre-trained model (`url_model.pkl`).

## 🛠️ Tech Stack

- **Backend**: Java 17, Spring Boot 3.2, Maven, Docker.
- **AI Service**: Python 3.9, Flask, Scikit-learn, Pandas.
- **Website**: Next.js 16, React 19, Tailwind CSS, Framer Motion.
- **Extension**: Vanilla JavaScript, Chrome Extension Manifest V3.
- **Orchestration**: Docker Compose.
