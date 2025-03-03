## Json Placeholder API Testing 

This Project contains automated API tests using playwright to validate user authenticatiom, CRUD operations, and error handling

## Test Doc
https://docs.google.com/spreadsheets/d/17AW-ct1uDJP6DZucDXirI0u3wWgNjPuKkhDwxGLJtGM/edit?usp=sharing

## Features 

Automated API tests using playwright 
Covers authentication, user creation, updates, deletion and error handling
Includes both positive and negative test cases


## Installation

clone the Repository
git clone https://github.com/TobiA34/API-automation-testing
cd playwright-api-tests

#Install Dependencies

npm install


## Run test

npx playwright test

 Test Cases

 Authentication Tests

🔹 Login with valid credentials (200 OK)

🔹 Login with incorrect credentials (400 Bad Request)

 User Management Tests

🔹 Create user with valid data (201 Created)

🔹 Create user with missing fields (400 Bad Request)

🔹 Create user with invalid email format (400 Bad Request)

🔹 Fetch existing user (200 OK)

🔹 Fetch non-existent user (404 Not Found)

🔹 Update user with valid data (200 OK)

🔹 Update user with missing fields (400 Bad Request)

🔹 Delete existing user (204 No Content)

🔹 Delete non-existent user (404 Not Found)


