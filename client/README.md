# eksamen_pg6301

## Open and Start server

1. When you first open the project open the terminal and type "cd clint" this will change to the client directory, then type "npm i" to install all necessary dependencies

2. type "cd .." to go back

3. Then type "cd server" this will change to the server directory, then type "npm i" to install all necessary dependencies

4. inside the server directory type node seed.js

5. when you are inside of the server directory you can type "npm start" to start the server

6. when you are inside of the client directory you can type "npm start" to start the server

## Login

manager login:
u: admin
p: admin

Employee login:
u: employee
p: password

## Endpoints

### Authentication

- **Endpoint:** `/api/auth`
- **Description:** Provides authentication and user-related functionality.

### Activities

- **Endpoint:** `/api/activities`
- **Description:** Manages activities available for employees to log hours.

### Logged Hours

- **Endpoint:** `/api/log-hours`
- **Description:** Manages logged hours for activities by employees.
