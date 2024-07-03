# GymUp - Gym Management App (Node.js TypeScript Backend)
## Description

This is the backend API for the GymUp gym management application, built with Node.js, TypeScript, Express, PostgreSQL, and Sequelize. It provides the functionality to:

* Manage user accounts (signup, login)
* Process memberships and subscriptions (using Stripe - disabled in testing version)
* Track member attendance
* Generate member and revenue statistics

## Prerequisites
 
Node.js (version 16 or later) and npm (or yarn) installed (https://nodejs.org/en/download/package-manager/current)
Installation

## Clone the Repository:

```Bash
git clone https://github.com/SM-Haris/gym-web-app-backend.git
```
Use code with caution.

## Install Dependencies:

Navigate to the project directory:

```Bash
cd gym-web-app-backend
```
Use code with caution.

Install dependencies using npm or yarn:

```Bash
npm install
```

Use code with caution.

## Environment Setup

Create a .env file in the project root.
Add environment variables for database connection details, Stripe API keys (for testing and production), and any other sensitive configurations. Refer to the documentation of each library for specific variable names.
Usage (Development)

## Start the development server:

```Bash
npm start
```
Use code with caution.

This will typically start the server on a default port (e.g., http://localhost:5000). The exact port number might vary.

## (Optional) Development Mode:

```Bash
npm run dev
```
Use code with caution.

This starts a development server with hot reloading and watchers for code changes.

## Configuration

Database connection details are expected to be defined in environment variables.
Stripe API keys (for testing and production) should be configured in the .env file.
Testing

(No testing scripts are currently defined in this package.json. You'll need to implement unit and/or integration tests for your backend logic.)

## Contributing

We welcome contributions! The project uses the ISC license. Feel free to create pull requests with improvements or bug fixes.

## Deployment

Deployment instructions will depend on your chosen hosting provider. Consider using platforms like Heroku or AWS for deploying Node.js applications.

## Known Issues

This backend is for testing purposes only. Real transactions through Stripe are disabled.
Functionality might be limited in this testing version.