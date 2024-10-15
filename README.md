# Securities Management Application

This is a full-stack web application built to manage securities data. The project includes a **Postgress** to store data, **GraphQL backend** to serve data, a **React frontend** to display the data with features like pagination, and a **data pusher script** to load securities data from a JSON file into a PostgreSQL database.

## Demo and screenshots

Video link - https://drive.google.com/file/d/1lQ8x-KznKm9DRL5aQu0cKZyzB7sP8v48/view?usp=drive_link

Click the image above to watch a video demo of the application.
###  screenshots

![image](https://github.com/user-attachments/assets/26c3c1fc-bb76-4a3c-8745-4d7f0c29307c)

![image](https://github.com/user-attachments/assets/e7334a6c-c126-437a-b4ff-b0c67b13e37b)

![image](https://github.com/user-attachments/assets/3e5cc003-1525-4de3-80e3-ff86892ce961)

![image](https://github.com/user-attachments/assets/d516b677-6433-4017-91ff-e6180d05e566)


## Features

- **Securities Listing**: View a list of securities with essential information like ticker, name, sector, country, and trend.
- **Security Details**: Detailed view for each security, including historical prices and volumes, displayed in chart using highchart.
- **Pagination**: Optimized data loading with pagination, showing 10 securities at a time.
- **404 Page**: A user-friendly "No Page Found" message for invalid URLs.
- **Jest Test Cases**: Comprehensive unit test coverage for React components using Jest and React Testing Library.
- **GraphQL API**: A well-structured GraphQL API to serve securities data, with support for pagination and filtering.
- **Typescipt**: Both React and GQL codebase are in typescipt

## Installation Guide

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (`v14+` recommended).
- **PostgreSQL**: A PostgreSQL database instance is required to store securities data.

### 1. Setting up the Database (Postgres)

Open postgress sql query tool and create security table

```bash
CREATE TABLE securities (
    ticker VARCHAR(15) PRIMARY KEY,
    security_name VARCHAR(255),
    sector VARCHAR(255),
    country VARCHAR(255),
    trend DECIMAL,
    prices JSONB -- Storing prices as a JSONB column
);
```
Run data_pusher script to push entries from data.json. Populate DB configurations in the file to connect to database

 ```bash
cd scripts
npm i
node data_pusher.js
```
Verify the script logs and table

### 2. Setting up the API server (Graphql)

Navigate to the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

Populate .env file with DB configurations

Start the API server

```bash
npm run dev
```


### 3. Setting up the Frontend (React)

Navigate to the `frontend` directory and install dependencies:

```bash
cd frontend
npm install
```

Update .env file to point to correct graphql endpoint.

Start the application

```bash
npm run dev
```
To run unit test cases
```bash
npm run test
```

## How to use the application

- **Home Page**: Visit http://localhost:3000 to view a paginated list of securities.
- **Security Details**: Click on any security in the list to view detailed price history and trends


## Further Improvements

- Authentication: Adding user authentication to restrict access to sensitive data.
- Advanced Filtering: Support for additional filters like country, sector, or trend range.
- Optimized Data Fetching: Implement caching and data prefetching for faster load times.
