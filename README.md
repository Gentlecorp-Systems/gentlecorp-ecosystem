# GentleCorp-Ecosystem

Welcome to the GentleCorp-Ecosystem! This project is a comprehensive suite of microservices designed to meet various needs in a modern digital environment. The ecosystem encompasses a wide range of services, from online shopping and travel booking to financial services, social networking, and more.

## Table of Contents

1. [Overview](#overview)
2. [Microservices and Languages](#microservices-and-languages)
3. [Repository Names](#repository-names)
4. [Tech Stack](#tech-stack)
5. [Repository Structure](#repository-structure)
6. [Getting Started](#getting-started)
   - [Using Docker](#using-docker)
   - [Starting Individually](#starting-individually)
7. [Contributing](#contributing)
8. [License](#license)

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

Each Java-based microservice uses either Gradle or Maven as the build tool, chosen based on the complexity and dependency management needs:

| **Microservice**         | **Build-Tool** | **Repository Name**                 | **Reason**                                                                 |
|---------------------------|----------------|-------------------------------------|-----------------------------------------------------------------------------|
| Property Service          | Gradle         | `gentlecorp-property-service`      | Gradle's flexibility supports complex dependency graphs.                   |
| Customer Service          | Gradle         | `gentlecorp-customer-service`      | Ideal for rapid builds and managing modular dependencies.                  |
| Account Service           | Maven          | `gentlecorp-account-service`       | Preferred for its stability in large-scale enterprise projects.            |
| Invoice Service           | Maven          | `gentlecorp-invoice-service`       | Reliable for managing well-defined project structures.                     |
| Transaction Service       | Gradle         | `gentlecorp-transaction-service`   | Supports dynamic and multi-project builds efficiently.                     |
| Booking Service           | Maven          | `gentlecorp-booking-service`       | Provides excellent dependency version control for transactional services.  |
| Entertainment Service     | Gradle         | `gentlecorp-entertainment-service` | Suitable for projects requiring flexible plugin integrations.              |
| Activity Service          | Maven          | `gentlecorp-activity-service`      | Maven's maturity makes it ideal for production-level stability.            |

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

## Repository Names

Each microservice has its dedicated repository. Below are the names:

### TypeScript (NestJS)

1. **Auction Service**: `gentlecorp-auction-service`
2. **Order Service**: `gentlecorp-order-service`
3. **Inventory Service**: `gentlecorp-inventory-service`
4. **Menu Service**: `gentlecorp-menu-service`
5. **Payment Service**: `gentlecorp-payment-service`
6. **Product Service**: `gentlecorp-product-service`
7. **ShoppingCart Service**: `gentlecorp-shoppingcart-service`

### Java (Spring Boot)

1. **Property Service**: `gentlecorp-property-service`
2. **Customer Service**: `gentlecorp-customer-service`
3. **Account Service**: `gentlecorp-account-service`
4. **Invoice Service**: `gentlecorp-invoice-service`
5. **Transaction Service**: `gentlecorp-transaction-service`
6. **Booking Service**: `gentlecorp-booking-service`
7. **Entertainment Service**: `gentlecorp-entertainment-service`
8. **Activity Service**: `gentlecorp-activity-service`

### Python (FastAPI)

1. **Notification Service**: `gentlecorp-notification-service`
2. **Activity Log Service**: `gentlecorp-activity-log-service`
3. **Recommendation Service**: `gentlecorp-recommendation-service`
4. **Reviews Service**: `gentlecorp-reviews-service`
5. **Transport Service**: `gentlecorp-transport-service`

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
