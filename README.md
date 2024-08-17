# FitHeal - Backend

## Overview

The backend for the FitHeal application is built with Node.js and provides essential functionalities for managing fitness routines, dietary tracking, and user progress. It handles data management, authentication, and various API endpoints for workouts, diet plans, user profiles, and progress tracking.

## Features

### API Endpoints

#### Exercises API

- **GET /api/exercise/get_all_exercises**
  - Retrieve all exercises.

- **GET /api/exercise/get_exercise**
  - Retrieve a single exercise.
  
- **POST /api/exercise/create**
  - Add a new exercise.

- **PUT /api/exercise/update/:id**
  - Update an existing exercise.

- **DELETE /api/exercise/delete/:id**
  - Delete a exercise.

- **GET /api/exercise/pagination_exercise**
  - For pagination of exercise

- **GET /api/exercise/search_exercise**
  - For searching exercise.

#### Meal PLans API
- **POST /api/meal/create**
  - Add a new meal plan.

- **GET /api/meal/get_all_meals**
  - Retrieve all meals plans.

- **GET /api/meal/get_meal/:id**
  - Retrieve a single meal plan.

- **PUT /api/meal/update_meal/:id**
  - Update an existing meal plan.

- **DELETE /api/meal/delete/:id**
  - Delete a meal plan.
    
- **GET /api/meal/pagination_meal**
  - For pagination of meal
    
- **GET /api/meal/search_meal**
  - FOr searching a meal plan.


#### Users API
- **POST /api/user/login**
  - User login to obtain a JWT token.
  
- **POST /api/user/register**
  - User registration.

- **GET /api/user/get_single_user/:id**
  - Retrieve details of a specific user.

- **PUT /api/user/update_profile/:id**
  - Update user information.
    
- **POST /api/user/forgot_password**
  - For forgot password
  
- **POST /api/user/verify_otp**
  - For OTP verification

## Authentication

### JWT-based Authentication

- **Secure User Authentication**: Utilizes JSON Web Tokens (JWT) to ensure secure user authentication for accessing protected routes.

## Technologies

- **Node.js**: Server-side runtime environment for building scalable applications.
- **Express.js**: Web framework for creating RESTful APIs and handling server-side logic.
- **MongoDB**: NoSQL database for efficient storage and retrieval of application data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js, providing schema-based solutions.

## Environment Variables

The following environment variables must be set for the application to function correctly:

- **MONGO_URI**: MongoDB connection string.
- **JWT_SECRET**: Secret key for JWT authentication.
- **PORT**: The port on which the server will run (default is `5000`).

## Author

- **Aashraya Karki**
