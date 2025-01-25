# GentleCorp-Ecosystem

Welcome to the GentleCorp-Ecosystem! This project is a comprehensive suite of microservices designed to meet various needs in a modern digital environment. The ecosystem encompasses a wide range of services, from online shopping and travel booking to financial services, social networking, and more.

## Table of Contents

1. [Overview](#overview)
2. [Microservices and Languages](#microservices-and-languages)
3. [Repository Names](#repository-names)
4. [Tech Stack](#tech-stack)
5. [Database Selection](#database-selection)
6. [Repository Structure](#repository-structure)
7. [Getting Started](#getting-started)
   - [Using Docker](#using-docker)
   - [Starting Individually](#starting-individually)
8. [Contributing](#contributing)
9. [License](#license)

---

## Overview

**GentleCorp-Ecosystem** is a modular, scalable, and flexible microservices-based platform. It offers a variety of services including online shopping, travel booking, banking, real estate management, food delivery, and more. The platform leverages modern web technologies to deliver a seamless user experience.

## Microservices and Languages

Each microservice is implemented in the language best suited to its specific needs. Below is a detailed breakdown:

### TypeScript (NestJS)

1. **Note Service**
   - Function: Manage personal notes for users.
   - **Reason**: SQLite is an ideal choice for a lightweight, local-first service that allows users to create, edit, and delete personal notes efficiently.

2. **Auction Service**
   - Function: Manage auctions and bids in real time.

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
   - **Language**: TypeScript (NestJS)
   - **Build-Tool**: N/A (JavaScript-based, no additional build tool)
   - **Database**: PostgreSQL
   - **Protocol**: REST
   - **Reason**: Ensures reliable, secure, and scalable handling of payment data.

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
| Todo Service              | SQLite         | `gentlecorp-todo-service`          | REST          | Lightweight database for managing user-specific todo items.                |

### Python (FastAPI)

Each Python-based microservice implements a protocol tailored to its specific function:

| **Microservice**         | **Repository Name**                  | **Protocol**  | **Reason**                                                                 |
|---------------------------|--------------------------------------|---------------|-----------------------------------------------------------------------------|
| Notification Service      | `gentlecorp-notification-service`   | REST          | REST handles asynchronous notification triggers effectively.               |
| Activity Log Service      | `gentlecorp-activity-log-service`   | REST          | REST provides simple endpoints for storing and retrieving logs.            |
| Recommendation Service    | `gentlecorp-recommendation-service` | GraphQL       | GraphQL enables personalized and flexible recommendation queries.          |
| Reviews Service           | `gentlecorp-reviews-service`        | GraphQL       | GraphQL handles nested data for user reviews efficiently.                  |
| Transport Service         | `gentlecorp-transport-service`      | REST          | REST ensures compatibility with external transport APIs.                   |

---

## Database Selection

Each microservice is paired with a database that best suits its requirements, ensuring a balance between scalability, performance, and maintainability. To ensure diversity, each language uses all four database systems at least once.

### TypeScript (NestJS)

| **Microservice**         | **Database**  | **Reason**                                                                 |
|---------------------------|---------------|-----------------------------------------------------------------------------|
| Note Service              | SQLite        | Lightweight and ideal for local-first personal note management.             |
| Auction Service           | PostgreSQL    | Strong support for transactions and real-time updates.                     |
| Payment Service           | PostgreSQL    | Reliable, secure, and scalable handling of payment data.                   |

### Java (Spring Boot)

| **Microservice**         | **Database**  | **Reason**                                                                 |
|---------------------------|---------------|-----------------------------------------------------------------------------|
| Property Service          | MySQL         | Relational database ideal for structured property listings.                |
| Customer Service          | MongoDB       | Flexibility for unstructured and evolving customer data.                   |
| Account Service           | PostgreSQL    | Strong ACID compliance for sensitive financial account data.               |
| Invoice Service           | PostgreSQL    | Reliable for complex invoice data and transactional integrity.             |
| Transaction Service       | MySQL         | Optimized for high-volume financial transaction processing.                |
| Booking Service           | PostgreSQL    | Secure and scalable for centralized booking data.                          |
| Entertainment Service     | MongoDB       | Best suited for managing multimedia content.                               |
| Activity Service          | Redis         | Fast access to frequently queried activity-related data.                   |
| Todo Service              | SQLite        | Lightweight and localized storage for todo items.                          |

### Python (FastAPI)

| **Microservice**         | **Database**  | **Reason**                                                                 |
|---------------------------|---------------|-----------------------------------------------------------------------------|
| Notification Service      | Redis         | Ideal for real-time notifications and temporary data.                      |
| Activity Log Service      | MongoDB       | Flexible schema for storing diverse log entries.                           |
| Recommendation Service    | PostgreSQL    | Optimal for managing and querying relational recommendation data.          |
| Reviews Service           | MySQL         | Relational data model fits structured review data with complex queries.     |
| Transport Service         | SQLite        | Lightweight solution for small-scale transport data.                       |

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

 <https://gentlecorp-systems.github.io/gentlecorp-ecosystem/>

---

## License

This project is licensed under the [MIT License](LICENSE).
