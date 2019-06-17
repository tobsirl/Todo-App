# Todo-App

Backend RESTful API using express
Frontend ReactJS

RedHat Screener

## Installation requirements

### Prerequisite

- node v11.11.0
- npm v6.9.0

Installing dependencies:

```bash
npm install
```

Use npm install in both the client and server directories

To run the dev server

```bash
npm run dev
```

The project uses concurrently so both backend and frontend with start together.
Run from server directory.

```json
"dev": "concurrently \"npm run server\" \"npm run client\""
```

### Server Side

- dotenv
- bcryptjs
- concurrently
- express
- jsonwebtoken
- express-validator
- @babel/core
- @babel/node
- @babel/preset-env
- eslint
- nodemon

### Client Side

- axios
- react
- react-dom
- react-router-dom

## Data Models

### User Model

```js
// User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
```

### Task Model

```js
// Task Model
const TaskSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});
```

## Screenshot

![TodoApp](https://user-images.githubusercontent.com/25591390/59565022-e1fb5980-9045-11e9-986d-66d24fd1e5fc.png)

### API design

[Swagger API Documentation](https://app.swaggerhub.com/apis-docs/tobsirl/Todo-App/1.0.0)

## Frontend Routing

| Route     | Public/Private | Component | Description             |
| --------- | -------------- | --------- | ----------------------- |
| /         | Public         | Home      |                         |
| /register | Public         | Register  | Create a User Account   |
| /login    | Public         | Login     | Login with User Account |

Would like to have done more on the frontend, the register user route is working front to back

## Security and Authentication

- [jwt-token](https://jwt.io/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

JSON Web Tokens are used to authenicate the client

bcryptjs is used to hash the password so it can be safely stored in the database
