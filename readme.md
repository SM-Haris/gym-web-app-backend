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

## Docker Support
This project includes a docker.yaml file and a Dockerfile to create a Docker image of the application. You can use these files to deploy the application in a containerized environment.

### Prerequisites:
**Docker:** Ensure you have Docker installed on your system. You can download and install Docker from the official website (https://www.docker.com/products/docker-desktop/).
Instructions:

### Navigate to the project directory:

```Bash
cd gym-web-app-frontend
```

### Build and run the container:

```Bash
docker-compose up --build
```

This command performs the following actions:

Builds a Docker image for the application using the Dockerfile. (This only happens on the first run or if your code has changed.)
Creates and starts a Docker container based on the image.
Runs the application within the container.
Access the Frontend:

The GymUp frontend will be accessible on your local machine through port 80. You can access it using a web browser by visiting:

```bash
http://localhost:80
```

### Additional Notes:

The docker-compose.yaml file defines the configuration for the containerized application.

By default, the docker-compose up --build command starts the container in the foreground. To run it in the background, use the -d flag:

```Bash
docker-compose up --build -d
```

You can stop the container using the following command:

```Bash
docker-compose down
```

This approach allows you to leverage Docker's containerization features for a more isolated and portable deployment of your GymUp frontend API.

## Known Issues

This backend is for testing purposes only. Real transactions through Stripe are disabled.
Functionality might be limited in this testing version.