# Todo Appmm
## Step 1: Clone the Repository
```sh
git clone https://github.com/erdem-bektas/Simple-Todo-App.git
````

## Step 2: Install Dependencies
### MacOs or Linux
When you type these commands in the root directory, the relevant script installs and starts the relevant dependencies using npm.
```sh
chmod +x start-project.sh
./start-project.sh
```

#### to see logs:
```sh
cat app.log
cat server.log
```
#### shutdown: 
```sh
kill $(cat app.pid) $(cat server.pid)
```
### Windows:
##### for Server:
```sh 
cd server && npm install && npm run dev
```
##### for App:
```sh 
cd app && npm install && npm run dev
```
### Step 3: Configure the Database
##### Server .env file example
```sh
PORT=8080
MONGO_URI=
JWT_SECRET=
```
##### App .env file example
```sh
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/
```
### Step 4: Environment Variables
- rsa keys creation (optional)
```sh 
openssl genpkey -algorithm RSA -out /keys/private_key.pem && openssl rsa -pubout -in /keys/private_key.pem -out /keys/public_key.pem
```

### Step 5: Start the Application

#### Development Mode
```sh
npm run dev
```

## API Routes

### User Routes

| HTTP Method | Endpoint       | Description                                                                 |
|-------------|----------------|-----------------------------------------------------------------------------|
| POST        | /register      | Registers a new user. Uses validation middleware. The request body should include `email` and `password`. |
| POST        | /login         | Logs in a user. Uses validation middleware. The request body should include `email` and `password`. |
| POST        | /refresh-token | Refreshes the access token.                                                 |

### Todo Routes

| HTTP Method | Endpoint        | Description                                                                  |
|-------------|-----------------|------------------------------------------------------------------------------|
| POST        | /add            | Adds a new todo item. Uses authentication and file upload middleware.        |
| POST        | /edit/:id       | Edits the todo item with the specified ID. Uses authentication and file upload middleware. |
| POST        | /delete/:id     | Deletes the todo item with the specified ID. Uses authentication middleware. |
| GET         | /list           | Lists all todo items. Uses authentication middleware.                        |
| GET         | /get/:id        | Retrieves the todo item with the specified ID. Uses authentication middleware. |
| GET         | /filter-tag/:tag| Filters todo items by the specified tag. Uses authentication middleware.     |

## Usage Instructions

### User Registration

To register a new user, send a POST request to the `/register` endpoint with the following JSON body:

```json
{
  "email": "user@example.com",
  "password": "userPassword1*"
}
```
___ 
### Author
##### Erdem Bektas