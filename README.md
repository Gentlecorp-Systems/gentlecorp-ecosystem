# GentleCorp-Ecosystem

Welcome to the GentleCorp-Ecosystem! This project is a comprehensive suite of microservices designed to meet various needs in a modern digital environment. The ecosystem encompasses a wide range of services, from online shopping and travel booking to financial services, social networking, and more.

## Table of Contents

1. [Overview](#overview)
2. [Microservices and Languages](#microservices-and-languages)
3. [Tech Stack](#tech-stack)
4. [Repository Structure](#repository-structure)
5. [Getting Started](#getting-started)
   - [Using Docker](#using-docker)
   - [Starting Individually](#starting-individually)
6. [Contributing](#contributing)
7. [License](#license)

---

## Overview

**GentleCorp-Ecosystem** is a modular, scalable, and flexible microservices-based platform. It offers a variety of services including online shopping, travel booking, banking, real estate management, food delivery, and more. The platform leverages modern web technologies to deliver a seamless user experience.

## Microservices and Languages

Each microservice is implemented in the language best suited to its specific needs. Below is a detailed breakdown:

### TypeScript (NestJS)

1. **Auction Service**
   - Function: Manage auctions and bids in real time.

2. **Order Service**
   - Function: Manage order creation, updates, and tracking.

3. **Inventory Service**
   - Function: Handle product stock and availability.

4. **Menu Service**
   - Function: Manage and display dynamic menus.

5. **Payment Service**
   - Function: Process secure financial transactions.

6. **Product Service**
   - Function: Manage product catalogs for online shopping.

7. **ShoppingCart Service**
   - Function: Handle user shopping cart data temporarily.

### Java (Spring Boot)

1. **Property Service**
   - Function: Manage property listings and details.

2. **Customer Service**
   - Function: Manage customer profiles and data.

3. **Account Service**
   - Function: Manage bank accounts and financial data.

4. **Invoice Service**
   - Function: Generate and manage transaction invoices.

5. **Transaction Service**
   - Function: Handle financial transactions securely.

6. **Booking Service**
   - Function: Manage reservations and bookings.

7. **Entertainment Service**
   - Function: Manage multimedia content.

8. **Activity Service**
   - Function: Organize and manage leisure activities.

### Python (FastAPI)

1. **Notification Service**
   - Function: Send real-time notifications via various channels.

2. **Activity Log Service**
   - Function: Track and store user activity logs.

3. **Recommendation Service**
   - Function: Provide personalized suggestions based on user behavior.

4. **Reviews Service**
   - Function: Manage and store user reviews and ratings.

5. **Transport Service**
   - Function: Integrate and manage transport options.

---

## Tech Stack

### Frontend

- **Framework**: [Next.js](https://nextjs.org/) (using the App Router)
- **Language**: TypeScript
- **Styling**: [Bootstrap](https://getbootstrap.com/)

### Backend

#### TypeScript (NestJS)
- Auction Service
- Order Service
- Inventory Service
- Menu Service
- Payment Service
- Product Service
- ShoppingCart Service

#### Java (Spring Boot)
- Property Service
- Customer Service
- Account Service
- Invoice Service
- Transaction Service
- Booking Service
- Entertainment Service
- Activity Service

#### Python (FastAPI)
- Notification Service
- Activity Log Service
- Recommendation Service
- Reviews Service
- Transport Service

---

## Repository Structure

```
root/
├── frontend/
│   └── gentlecorp-ui
├── backend/
│   ├── auction-service/ (NestJS)
│   ├── property-service/ (Spring Boot)
│   ├── notification-service/ (FastAPI)
│   └── ...
└── docs/
    └── README.md
```

---

## Getting Started

### Using Docker

1. Clone the repository.
2. Run `docker-compose up` to start all services.

### Starting Individually

1. Navigate to the service directory.
2. Install dependencies (`npm install`, `mvn clean install`, or `pip install`).
3. Start the service.

---

## Contributing

We welcome contributions! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

This project is licensed under the [MIT License](LICENSE).
