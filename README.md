# Todo-App

RedHat Screener

### Version

node v11.11.0
npm v6.9.0

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

## Data Models

### User Model

```json
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
```json
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
