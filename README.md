# noodee

noodee is a Node.js global package that streamlines the setup process of new Node.js projects. It creates a project directory with a standard structure, initializes a Node.js environment, and sets up a basic Express server with Sequelize for database interactions.

## Features

- Creates a basic project structure including `src` and `tests` directories.
- Initializes a Node.js project with a `package.json` file.
- Sets up an Express server in `server.js`.
- Configures Sequelize for database operations.
- Installs essential npm packages like `express`, `sequelize`, `morgan`, etc.
- Creates a basic `.env` file for environment variables.
- Sets up a basic routing structure.

## Prerequisites

- Node.js
- npm

## Installation

To install the package globally, run:

```bash
npm install -g noodee
Or
npx install noodee
```

## Usage
To create a new Node.js project, run:

```bash
noodee [project-name]
```
Replace [project-name] with your desired project name. This command creates a new directory with the project name and sets up the project structure inside it.

Project Structure
The project will have the following structure:

```bash
[project-name]/
├── src/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── utils/
├── tests/
├── public/
│   └── images/
├── docs/
├── server.js
├── package.json
└── .env
```
## Configuration
Environment Variables
The .env file is created in the project root with default settings. Modify this file to change environment variables such as database credentials and port numbers.

Example .env file:

```bash
API_PORT=5010
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=
DB_DIALECT=mysql
```

### Adding Routes
Add routes in the src/routes directory. The package sets up a basic routing structure that can be expanded according to your application requirements.

Development
Run the server with:

```bash 
node server.js
```
For development purposes, use nodemon for hot-reloading:

```bash
nodemon server.js
```
### Contributions
Contributions to noodee are welcome. Please ensure to follow the contribution guidelines.

### License
noodee is licensed under ISC
