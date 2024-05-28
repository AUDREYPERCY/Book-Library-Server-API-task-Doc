
# Book Library API

A RESTful API for managing a book library application using Node.js, Express, and JavaScript. This API supports operations for creating, authenticating, and retrieving users, as well as adding, deleting, loaning out, returning, and updating books. Data is stored in a file (data.json), and the project includes robust error handling and asynchronous operations.

## Features

- User Management:

  - Create a new user
  - Authenticate a user
  - Retrieve all users
- Book Management:

  - Add a new book
  - Remove a book

  - Loan out a book to a user
  - Mark a book as returned
  - Update book details

## Installation

1. Clone the repository:
    sh
    git clone https://github.com/AUDREYPERCY/Book-Library-Server-api-.git
    cd Book-Library-Server-api-
    

2. Install dependencies:
    sh
    npm install
    

3. Set environment variables:
   - You can set the PORT environment variable in your terminal before running the server. For example:
     sh
     export PORT=3000  # For Unix-based systems
     set PORT=3000     # For Windows Command Prompt
     $env:PORT=3000    # For Windows PowerShell
     

4. Start the server:
    sh
    npm start
    


## API Endpoints

### Users

1. *CreateUser*
   - *Method:* POST
   - *URL:* /users
   - *Body:*

     json
     {
       "username": "john_doe",
       "password": "password123"
     }
     
   - *Description:* Create a new user.

2. *AuthenticateUser*
   - *Method:* POST
   - *URL:* /users/authenticate
   - *Body:*

     json
     {
       "username": "john_doe",
       "password": "password123"
     }
     
   - *Description:* Authenticate a user.

3. *GetAllUsers*
   - *Method:* GET
   - *URL:* /users
   - *Description:* Retrieve all users.

### Books

1. *CreateBook*
   - *Method:* POST
   - *URL:* /books
   - *Body:*
     json
     {
       "title": "Book Title",
       "author": "Author Name"
     }
     
   - *Description:* Add a new book.

2. *DeleteBook*
   - *Method:* DELETE
   - *URL:* /books/:id
   - *Description:* Remove a book.

3. *LoanOutBook*
   - *Method:* POST
   - *URL:* /books/:id/loan
   - *Body:*
     json
     {
       "userId": "USER_ID"
     }
     
   - *Description:* Loan out a book to a user.

4. *ReturnBook*
   - *Method:* POST
   - *URL:* /books/:id/return
   - *Description:* Mark a book as returned.

5. *UpdateBook*
   - *Method:* PUT
   - *URL:* /books/:id
   - *Body:*
     json
     {
       "title": "Updated Book Title",
       "author": "Updated Author Name"
     }
     
   - *Description:* Update book details.

## Testing

You can use Postman or ThunderClient to test the API endpoints.