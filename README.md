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

Each Java-based microservice uses either Gradle or Maven as the build tool, and implements an appropriate communication protocol based on its use case:

| **Microservice**         | **Build-Tool** | **Repository Name**                 | **Protocol**  | **Reason**                                                                 |
|---------------------------|----------------|-------------------------------------|---------------|-----------------------------------------------------------------------------|
| Property Service          | Gradle         | `gentlecorp-property-service`      | REST          | Suitable for standard CRUD operations on structured data.                  |
| Customer Service          | Gradle         | `gentlecorp-customer-service`      | REST          | REST ensures easy integration with other services for customer management. |
| Account Service           | Maven          | `gentlecorp-account-service`       | REST          | Financial data management benefits from REST's simplicity and security.    |
| Invoice Service           | Maven          | `gentlecorp-invoice-service`       | REST          | REST provides clarity in handling transactional document APIs.             |
| Transaction Service       | Gradle         | `gentlecorp-transaction-service`   | REST          | REST fits well for secure, synchronous financial transactions.             |
| Booking Service           | Maven          | `gentlecorp-booking-service`       | REST          | REST offers reliable booking operations for third-party integrations.      |
| Entertainment Service     | Gradle         | `gentlecorp-entertainment-service` | GraphQL       | GraphQL allows querying flexible multimedia content.                       |
| Activity Service          | Maven          | `gentlecorp-activity-service`      | REST          | REST supports straightforward activity management and planning.            |

### Python (FastAPI)

Each Python-based microservice implements a protocol tailored to its specific function:

| **Microservice**         | **Repository Name**                  | **Protocol**  | **Reason**                                                                 |
|---------------------------|--------------------------------------|---------------|-----------------------------------------------------------------------------|
| Notification Service      | `gentlecorp-notification-service`   | REST          | REST handles asynchronous notification triggers effectively.               |
| Activity Log Service      | `gentlecorp-activity-log-service`   | REST          | REST provides simple endpoints for storing and retrieving logs.            |
| Recommendation Service    | `gentlecorp-recommendation-service` | GraphQL       | GraphQL enables personalized and flexible recommendation queries.          |
| Reviews Service           | `gentlecorp-reviews-service`        | GraphQL       | GraphQL handles nested data for user reviews efficiently.                  |
| Transport Service         | `gentlecorp-transport-service`      | REST          | REST ensures compatibility with external transport APIs.                   |

### TypeScript (NestJS)

Each TypeScript-based microservice uses either REST or GraphQL based on its data complexity:

| **Microservice**         | **Repository Name**                 | **Protocol**  | **Reason**                                                                 |
|---------------------------|-------------------------------------|---------------|-----------------------------------------------------------------------------|
| Auction Service           | `gentlecorp-auction-service`       | GraphQL       | GraphQL supports real-time updates and flexible bidding data queries.      |
| Order Service             | `gentlecorp-order-service`         | REST          | REST fits the transactional nature of order processing.                    |
| Inventory Service         | `gentlecorp-inventory-service`     | REST          | REST ensures compatibility with inventory tracking systems.                |
| Menu Service              | `gentlecorp-menu-service`          | GraphQL       | GraphQL offers dynamic queries for menu items and configurations.          |
| Payment Service           | `gentlecorp-payment-service`       | REST          | REST is ideal for secure and transactional financial operations.           |
| Product Service           | `gentlecorp-product-service`       | GraphQL       | GraphQL enables flexible and efficient product catalog queries.            |
| ShoppingCart Service      | `gentlecorp-shoppingcart-service`  | REST          | REST ensures compatibility and simplicity for cart operations.             |

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
