# Express REST API – Production-Grade Template (TypeScript)

A **production-ready Express REST API template** built with **TypeScript**, designed for **scalable microservices**, **event-driven architectures**, and **real-world backend systems** — not just CRUD demos.

This template focuses on **clean architecture**, **observability**, **fault tolerance**, and **operational readiness** from day one.

---

## ✨ Features

### Core
- ⚡ Express.js + TypeScript (ESM)
- 🧱 Clean modular architecture
- 🔒 Secure defaults (Helmet, CORS, compression)
- 📦 Environment-based configuration
- 🚀 Production-ready bootstrap lifecycle

### Observability
- 🧾 Structured logging with **Pino**
- 🔗 **Request-ID tracing** using AsyncLocalStorage
- 🐞 Centralized error handling
- 📊 ELK-ready (Elasticsearch + Kibana)
- 📁 File-based logging support

### Reliability
- ❌ Fail-fast startup (missing envs, infra failures)
- 🧠 Deterministic bootstrap order
- 🔄 Graceful shutdown handling
- 🧪 Test-friendly app initialization

### Architecture & Scalability
- 🧩 Microservice-ready structure
- 📬 Event-driven friendly (RabbitMQ / Redis / Kafka ready)
- ♻️ Stateless HTTP layer
- 🧵 Async-safe context propagation
- 🧰 Infrastructure separated from business logic

---

## 🏗 Project Structure
 
## 📁 Project Structure

```text
src/
├── app.ts                 # Express app (HTTP-only)
├── server.ts              # Service bootstrap & startup
├── bootstrap/
│   ├── index.ts
│   ├── db.bootstrap.ts
│   └── mq.bootstrap.ts
├── config/
│   └── env.ts             # Env loading & validation
├── infra/
│   ├── logger.ts          # Pino logger (structured JSON)
│   └── request-context.ts # AsyncLocalStorage context
├── middlewares/
│   ├── requestId.middleware.ts
│   └── default/
│       ├── errorHandler.ts
│       └── notFound.ts
├── modules/
│   └── todo/
│       ├── todo.routes.ts
│       ├── todo.controller.ts
│       └── todo.service.ts
├── types/
└── utils/
```

---

## 🚀 Startup Flow (Production-Grade)

The service **does not accept traffic** until all critical dependencies are ready.
Load environment variables

* Validate required configuration

* Initialize logger

* Connect database

* Initialize message broker (optional)

* Register consumers (optional)

* Create HTTP server

* Start listening


If any step fails → **process exits immediately**.

---

## 🔐 Environment Configuration

### `.env.example`
```env
NODE_ENV=development
PORT=5000
DB_URL=
DB_NAME=
LOG_LEVEL=info
SERVICE_NAME=todo-service
```

## Validation

* Required env variables are validated at startup

* Missing or invalid values crash the service early

* Configuration is immutable at runtime

## 🧾 Logging & Tracing
 
* Pino for high-performance structured logs

* JSON logs (machine-readable)

* Human-readable logs in development

* File or stdout output supported

* Request-ID Tracing

* One unique requestId per request

* Automatically propagated across async calls

* Included in every log line

* Supports incoming x-request-id headers

Example log:

{
  "level": 30,
  "time": "2026-02-09T10:30:00.000Z",
  "service": "todo-service",
  "requestId": "c1a7c8b2",
  "msg": "Incoming request"
}

## 📊 ELK Compatibility

* This project is ELK-ready by design:

* Logs are structured JSON

* No code changes needed to add Filebeat

* Request-ID enables end-to-end tracing in Kibana

* Typical flow:

Node.js → Filebeat → Elasticsearch → Kibana
 
 

## 🛑 Graceful Shutdown

* The service listens for:

* SIGINT

* SIGTERM

* And shuts down cleanly:

* Stops accepting new requests

* Closes HTTP server

* Allows in-flight requests to finish
 

## 🧠 Design Philosophy

* This template is built with the mindset that:

* Observability is not optional

* Startup order matters

* Fail fast > fail silently

* Logs are data, not strings

* Production bugs should be debuggable

## 📌 Who is this for?

* Backend developers

* Microservice architectures

* Event-driven systems

* Scalable REST APIs

* Interview-ready backend projects

* Developers aiming for real-world experience

 
# ⭐ Final Note

This is not a beginner CRUD template.

It’s a foundation for:

real production systems

system design interviews

scalable backend services

If you understand and can explain this project,
you are already operating at mid–senior backend level.


---
