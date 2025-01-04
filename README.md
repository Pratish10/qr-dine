# QR Dine

## Overview

**QR Dine** is a SaaS-based platform that revolutionizes the restaurant dining experience by allowing customers to scan a unique QR code placed on
each table to view the menu, place orders, and interact with the restaurant directly from their mobile devices. Restaurant owners can manage multiple
branches, tables, menus, and categories through the admin portal, while customers can seamlessly place orders via the client portal.

This platform provides a digital solution to streamline ordering and reduce waiting times, enhancing the overall customer dining experience.

## Features

### For Restaurant Owners

- **Multi-Branch Support**: Register and manage multiple restaurant branches.
- **Menu Management**: Add and manage menus, food categories, and items.
- **Table Management**: Create and manage tables with unique QR codes.
- **Order Management**: View incoming orders and manage them from the admin portal.
- **Subscription Plans**: Choose between Free (default), Starter, and Pro versions for more features.

### For Customers

- **QR Code Scanning**: Scan a unique QR code at the table to access the restaurant’s menu.
- **Easy Ordering**: Browse the menu and place orders directly from the customer’s device.
- **No Wait Staff Needed**: Order without needing to call a waiter, enhancing convenience and reducing wait times.

## Subscription Plans

### 1. **Free (Default) Version**:

- Basic features for restaurants with limited menus and tables.
- One branch per restaurant.
- Limited order management features.

### 2. **Starter Version**:

- Unlock additional features such as more branches and basic analytics.
- Support for more menus and tables.
- Monthly subscription.

### 3. **Pro Version**:

- Full access to all features including advanced order management, reporting, and analytics.
- Multiple branches per restaurant.
- Priority customer support.
- Monthly subscription.

## How It Works

### For Customers:

1. **Scan the QR Code**: Scan the unique QR code placed on the table.
2. **View the Menu**: Browse through the restaurant’s menu and select the items you want to order.
3. **Place Your Order**: Add items to the cart and submit your order directly from your device.
4. **Order Confirmation**: The restaurant receives the order in real-time via the admin portal.

### For Restaurant Owners:

1. **Register Your Restaurant**: Create an account and register your restaurant(s).
2. **Add Branches**: Register and manage multiple restaurant branches.
3. **Create Menus**: Set up menus with categories (e.g., appetizers, main courses, desserts).
4. **Assign Tables and QR Codes**: Manage tables and generate unique QR codes for each.
5. **Receive Orders**: View and manage orders as they come in from customers.

## Installation

### Prerequisites

- **Node.js** (for Next.js application)
- **Prisma** (for database management)
- **Stripe** (for handling payments)
- **Google/Facebook Authentication** (optional for login)

## Running Locally

> [!NOTE]  
> This project uses [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) only as a package manager.

1. Clone the repository:

```bash
git clone https://github.com/Pratish10/qr-dine.git
```

2. Navigate to the project directory:

```bash
cd qr-dine
```

3. Create a .env file:

```bash
Copy `.env.example` and rename it to `.env`.
```

4. Install dependencies:

```bash
yarn install
```

5. Set up Prisma and run the database migrations:

```bash
npx prisma migrate dev
```

6. Start the development server:

```bash
yarn dev
```

## UML Diagram
Below is the UML Diagram of the project

![prisma-uml](https://github.com/user-attachments/assets/68353458-dc16-4bfe-87db-d5e20a1f25eb)

## Stripe Payment Test Card Numbers
Use the following test card numbers to simulate payments in Stripe during development. These card numbers are for **test mode only** and will not result in real charges.

## Test Card Numbers
| **Card Number**        | **Card Type**     | **Description**                        |
|------------------------|-------------------|----------------------------------------|
| 4000 0035 6000 0008    | Visa              | Successful payment                     |

## Expiry and CVV
- **Expiry Date**: Use any future date  
- **CVV**: Use any 3-digit number

## Important Notes
- These card numbers only work in Stripe's **test mode**.  

