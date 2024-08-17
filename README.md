# FitHeal Backend

Welcome to the backend repository of the **FitHeal** application. FitHeal is a health and fitness platform designed to help users track their workouts, monitor their diet, and achieve their fitness goals.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This repository contains the backend code for the FitHeal application. The backend is responsible for handling user authentication, managing workout and diet data, and serving API requests to the frontend.

## Features

- **User Authentication:** Secure user registration and login using JWT.
- **Workout Management:** Create, update, delete, and retrieve workout plans.
- **Diet Tracking:** Manage dietary information including meal plans and nutritional data.
- **Progress Monitoring:** Track user progress over time with detailed analytics.
- **API Endpoints:** RESTful API to communicate with the frontend.

## Technologies

- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose ORM)
- **JWT Authentication**
- **Multer** (for file uploads)
- **dotenv** (for managing environment variables)

## Installation

To get the backend server up and running, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/fitheal-backend.git
    cd fitheal-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the environment variables:
   - Create a `.env` file in the root directory of the project.
   - Add the following environment variables:

    ```
    PORT=5000
    MONGO_URI=your-mongodb-connection-string
    JWT_SECRET=your-secret-key
    ```

4. Start the server:
    ```bash
    npm start
    ```

## Environment Variables

The following environment variables need to be configured:

- `PORT`: The port on which the server will run (default is `5000`).
- `MONGO_URI`: MongoDB connection string for the database.
- `JWT_SECRET`: Secret key used for signing JWT tokens.

## Usage

Once the server is up and running, you can use the following endpoints:

- **User Authentication:**
  - `POST /api/auth/register` - Register a new user.
  - `POST /api/auth/login` - Login an existing user.

- **Workout Management:**
  - `GET /api/workouts` - Get all workouts.
  - `POST /api/workouts` - Create a new workout.
  - `PUT /api/workouts/:id` - Update an existing workout.
  - `DELETE /api/workouts/:id` - Delete a workout.

- **Diet Tracking:**
  - `GET /api/diets` - Get all diet plans.
  - `POST /api/diets` - Create a new diet plan.
  - `PUT /api/diets/:id` - Update an existing diet plan.
  - `DELETE /api/diets/:id` - Delete a diet plan.
