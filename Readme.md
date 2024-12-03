# Second Brain App

The Second Brain App is a personal content management platform that allows users to store, organize, and share content from various sources like Twitter, YouTube, and Google Docs in a centralized place. The app is designed for scalability, with plans to integrate features such as data embeddings and advanced search capabilities in the future.

---

## Features

- **User Management**: Secure signup and login functionality with robust validation and password security.
- **Content Management**: Add, fetch, and delete content with tags for better organization.
- **Shareable Links**: Create shareable links to share your content with others.
- **Fetch Shared Content**: View content shared by other users.

---

## API Endpoints

### User Authentication

#### Sign Up

**POST** `/api/v1/signup`

Request Body:

```json
{
  "username": "demo_user",
  "password": "Demo@1234"
}
```

Constraints:

- Username: 3-10 letters
- Password: 8-20 characters with at least one uppercase letter, one lowercase letter, one special character, and one number

Responses:

- **200**: Signed up
- **411**: Error in inputs
- **403**: User already exists
- **500**: Server error

---

#### Sign In

**POST** `/api/v1/signin`

Request Body:

```json
{
  "username": "demo_user",
  "password": "Demo@1234"
}
```

Responses:

- **200**: Returns JWT token
  ```json
  {
    "token": "dummy_jwt_token"
  }
  ```
- **403**: Wrong username/password
- **500**: Internal server error

---

### Content Management

#### Add New Content

**POST** `/api/v1/content`

Request Body:

```json
{
  "type": "document",
  "link": "https://example.com/document",
  "title": "Demo Document",
  "tags": ["example", "demo"]
}
```

---

#### Fetch All Content

**GET** `/api/v1/content`

Response:

```json
{
  "content": [
    {
      "id": 1,
      "type": "document",
      "link": "https://example.com/document",
      "title": "Demo Document",
      "tags": ["example", "demo"]
    }
  ]
}
```

---

#### Delete Content

**DELETE** `/api/v1/content`

Request Body:

```json
{
  "contentId": "1"
}
```

Responses:

- **200**: Delete succeeded
- **403**: Trying to delete a document you don’t own

---

### Shareable Links

#### Create a Shareable Link

**POST** `/api/v1/brain/share`

Request Body:

```json
{
  "share": true
}
```

Response:

```json
{
  "link": "https://example.com/shared_link"
}
```

---

#### Fetch Shared Content

**GET** `/api/v1/brain/:shareLink`

Responses:

- **200**: Returns username and content array
  ```json
  {
    "username": "demo_user",
    "content": [
      {
        "id": 1,
        "type": "document",
        "link": "https://example.com/document",
        "title": "Demo Document",
        "tags": ["example", "demo"]
      }
    ]
  }
  ```
- **404**: Invalid or disabled share link

---

## Database Schema

### Users Table

```javascript
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
```

### Tags Table

```javascript
const tagSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
});
```

### Content Table

```javascript
const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: "Tag" }],
  userId: { type: Types.ObjectId, ref: "User", required: true },
});
```

### Shareable Link Table

```javascript
const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});
```

---

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: JWT

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/second-brain-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd second-brain-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables in a `.env` file:
   ```
   PORT=3000
   MONGO_URI=<your_mongo_db_uri>
   JWT_SECRET=<your_secret_key>
   ```
5. Start the server:
   ```bash
   npm start
   ```

---

## Visual Overview

### API Workflow Diagram

```plaintext
User ---> [Sign Up/Sign In] ---> JWT Token Generated
     \-> [Add Content] ---> Content Stored in DB
     \-> [Fetch Content] ---> Content Displayed
     \-> [Create Shareable Link] ---> Link Generated ---> Shared Content Retrieved
```

### Example Response Visual

![Content Response Example](https://via.placeholder.com/600x400?text=Content+Response+Visual)

---

## Future Enhancements

- Integration with AI for data embeddings and semantic search
- Advanced analytics for user activity tracking
- Role-based access control
- Content categorization with ML models

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
