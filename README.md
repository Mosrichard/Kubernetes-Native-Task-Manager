# 🚀 Full-Stack Task Manager

A production-ready, cloud-native task management application built with React, Node.js, Express, and MongoDB. Fully containerized and ready to deploy on Kubernetes!

![Architecture](https://img.shields.io/badge/Architecture-Microservices-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5?logo=kubernetes)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Local Development](#-local-development)
- [Kubernetes Deployment](#-kubernetes-deployment)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

- ✅ **Create, Read, Update, Delete** tasks
- ✅ **Mark tasks as complete/incomplete**
- ✅ **Real-time task statistics**
- ✅ **Beautiful, responsive UI**
- ✅ **Production-ready with Nginx**
- ✅ **Kubernetes-native architecture**
- ✅ **Persistent data storage**
- ✅ **Health checks & monitoring**
- ✅ **Mongo Express for database management**

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster                    │
│                                                           │
│  ┌──────────────┐      ┌──────────────┐                │
│  │   Ingress    │──────│   Frontend   │                │
│  │  Controller  │      │    (Nginx)   │                │
│  └──────────────┘      └──────┬───────┘                │
│         │                      │                         │
│         │              ┌───────▼────────┐               │
│         │              │  Nginx Proxy   │               │
│         │              │  /api → :5000  │               │
│         │              └───────┬────────┘               │
│         │                      │                         │
│         │              ┌───────▼────────┐               │
│         │              │    Backend     │               │
│         │              │  (Node.js)     │               │
│         │              └───────┬────────┘               │
│         │                      │                         │
│         │              ┌───────▼────────┐               │
│         │              │    MongoDB     │               │
│         │              │  (Persistent)  │               │
│         │              └────────────────┘               │
│         │                                                │
│  ┌──────▼──────────┐                                    │
│  │ Mongo Express   │                                    │
│  │  (Port 8081)    │                                    │
│  └─────────────────┘                                    │
└─────────────────────────────────────────────────────────┘
```

**Key Design Decisions:**
- **Nginx Reverse Proxy**: Eliminates CORS issues, single entry point
- **Service Discovery**: Uses Kubernetes DNS for inter-service communication
- **Persistent Storage**: MongoDB data survives pod restarts
- **Health Checks**: Ensures high availability

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Axios** - HTTP client
- **Nginx** - Production web server

### Backend
- **Node.js 18** - JavaScript runtime
- **Express** - Web framework
- **Mongoose** - MongoDB ODM

### Database
- **MongoDB 6** - NoSQL database
- **Mongo Express** - Web-based admin interface

### DevOps
- **Docker** - Containerization
- **Kubernetes** - Orchestration
- **Nginx Ingress** - Load balancing

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Docker** (v20.10+) - [Install Docker](https://docs.docker.com/get-docker/)
- **Kubernetes** (Minikube/Kind/K3s) - [Install Minikube](https://minikube.sigs.k8s.io/docs/start/)
- **kubectl** - [Install kubectl](https://kubernetes.io/docs/tasks/tools/)
- **Docker Hub Account** - [Sign up](https://hub.docker.com/)

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd Full-Stack-App
```

### 2️⃣ Build and Push Docker Images

```bash
# Login to Docker Hub
docker login

# Build and push images
docker build -t <your-dockerhub-username>/taskmanager-backend:latest ./backend
docker build -t <your-dockerhub-username>/taskmanager-frontend:latest ./frontend

docker push <your-dockerhub-username>/taskmanager-backend:latest
docker push <your-dockerhub-username>/taskmanager-frontend:latest
```

### 3️⃣ Update Kubernetes Manifests

Edit the following files and replace `mosrichard1234` with your Docker Hub username:
- `k8s-yaml/backend.yaml`
- `k8s-yaml/frontend.yaml`

### 4️⃣ Deploy to Kubernetes

```bash
# Start Minikube (if using Minikube)
minikube start

# Enable Ingress
minikube addons enable ingress

# Deploy the application
kubectl apply -f k8s-yaml/

# Wait for pods to be ready
kubectl get pods -n task-app -w
```

### 5️⃣ Access the Application

```bash
# Add to /etc/hosts
echo "$(minikube ip) taskmanager.com" | sudo tee -a /etc/hosts

# Open in browser
open http://taskmanager.com
```

---

## 💻 Local Development

### Using Docker Compose

```bash
# Start all services
docker compose up --build

# Access the application
open http://localhost:8080
```

### Manual Setup

**Backend:**
```bash
cd backend
npm install
npm start
# Runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

**MongoDB:**
```bash
docker run -d -p 27017:27017 mongo:6
```

---

## ☸️ Kubernetes Deployment

### Deployment Order

```bash
# 1. Create namespace
kubectl apply -f k8s-yaml/namespace.yaml

# 2. Deploy MongoDB
kubectl apply -f k8s-yaml/mongo.yaml

# 3. Deploy Backend
kubectl apply -f k8s-yaml/backend.yaml

# 4. Deploy Frontend
kubectl apply -f k8s-yaml/frontend.yaml

# 5. Deploy Ingress
kubectl apply -f k8s-yaml/ingress.yaml

# 6. (Optional) Deploy Mongo Express
kubectl apply -f k8s-yaml/mongo-express.yaml
```

### Verify Deployment

```bash
# Check all resources
kubectl get all -n task-app

# Check pod logs
kubectl logs -n task-app -l app=backend
kubectl logs -n task-app -l app=frontend

# Check services
kubectl get svc -n task-app

# Check ingress
kubectl get ingress -n task-app
```

### Access Services

**Frontend (via Ingress):**
```bash
# Add to /etc/hosts
echo "$(minikube ip) taskmanager.com" | sudo tee -a /etc/hosts

# Access
open http://taskmanager.com
```

**Mongo Express (Database Admin):**
```bash
# Port forward
kubectl port-forward -n task-app svc/mongo-express-service 8081:8081

# Access
open http://localhost:8081
# Login: admin / admin123
```

---

## 📁 Project Structure

```
Full-Stack-App/
├── backend/
│   ├── Dockerfile              # Backend container image
│   ├── package.json            # Node.js dependencies
│   └── server.js               # Express API server
│
├── frontend/
│   ├── public/
│   │   └── index.html          # HTML template
│   ├── src/
│   │   ├── App.js              # Main React component
│   │   ├── App.css             # Styles
│   │   └── index.js            # React entry point
│   ├── Dockerfile              # Frontend container image
│   ├── nginx.conf              # Nginx reverse proxy config
│   └── package.json            # React dependencies
│
├── k8s-yaml/
│   ├── namespace.yaml          # Kubernetes namespace
│   ├── backend.yaml            # Backend deployment & service
│   ├── frontend.yaml           # Frontend deployment & service
│   ├── mongo.yaml              # MongoDB deployment & service
│   ├── ingress.yaml            # Ingress configuration
│   ├── mongo-express.yaml      # Mongo Express deployment
│   ├── mongo-configmap.yaml    # MongoDB configuration
│   └── mongo-secrets.yaml      # MongoDB secrets
│
├── docker-compose.yaml         # Local development setup
└── README.md                   # This file
```

---

## 🔌 API Endpoints

### Base URL
- **Local**: `http://localhost:5000/api`
- **Kubernetes**: `http://taskmanager.com/api`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |
| GET | `/health` | Health check |

### Example Requests

**Create Task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Kubernetes"}'
```

**Get All Tasks:**
```bash
curl http://localhost:5000/api/tasks
```

**Update Task:**
```bash
curl -X PUT http://localhost:5000/api/tasks/<task-id> \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Delete Task:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/<task-id>
```

---

## 🐛 Troubleshooting

### Pods Not Starting

```bash
# Check pod status
kubectl get pods -n task-app

# Describe pod for details
kubectl describe pod <pod-name> -n task-app

# Check logs
kubectl logs <pod-name> -n task-app
```

### ImagePullBackOff Error

```bash
# Verify image exists on Docker Hub
docker pull <your-dockerhub-username>/taskmanager-frontend:latest

# Check image name in YAML files
kubectl get deployment -n task-app -o yaml | grep image:
```

### 502 Bad Gateway

```bash
# Check if backend is running
kubectl get pods -n task-app -l app=backend

# Check backend logs
kubectl logs -n task-app -l app=backend

# Verify service endpoints
kubectl get endpoints -n task-app
```

### MongoDB Connection Issues

```bash
# Check MongoDB pod
kubectl get pods -n task-app -l app=mongodb

# Check MongoDB logs
kubectl logs -n task-app -l app=mongodb

# Verify service name
kubectl get svc -n task-app mongodb-service
```

### Ingress Not Working

```bash
# Check ingress status
kubectl get ingress -n task-app

# Verify ingress controller is running
kubectl get pods -n ingress-nginx

# Check ingress logs
kubectl logs -n ingress-nginx -l app.kubernetes.io/component=controller
```

---

## 🔧 Configuration

### Environment Variables

**Backend:**
- `MONGO_URI` - MongoDB connection string (default: `mongodb://mongodb-service:27017/taskmanager`)
- `PORT` - Server port (default: `5000`)

**Frontend:**
- Uses Nginx reverse proxy, no environment variables needed

### Scaling

```bash
# Scale backend
kubectl scale deployment backend -n task-app --replicas=3

# Scale frontend
kubectl scale deployment frontend -n task-app --replicas=3
```

### Update Deployment

```bash
# Update image
kubectl set image deployment/backend -n task-app \
  backend=<your-dockerhub-username>/taskmanager-backend:v2

# Rollback if needed
kubectl rollout undo deployment/backend -n task-app
```

---

## 📝 Best Practices Implemented

✅ **Multi-stage Docker builds** - Smaller image sizes  
✅ **Health checks** - Kubernetes liveness/readiness probes  
✅ **Persistent storage** - Data survives pod restarts  
✅ **Service discovery** - Uses Kubernetes DNS  
✅ **Reverse proxy** - No CORS issues  
✅ **Namespace isolation** - Better resource management  
✅ **Resource limits** - Prevents resource exhaustion  
✅ **Security** - Non-root containers  

---

## 👨‍💻 Author


- GitHub: [@Mosrichard](https://github.com/Mosrichard)

---

**⭐ If you found this project helpful, please give it a star!**
