- Create a repository
- Initialize the repositary
- node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen a port to 7777
- Write request handlers for /test, /hello
- Install nodemon for update script inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret an tilde (^ vs ~)

- Initialize git
- .gitignore
- Create a remote repo on github
- Push all code to remote origin
- Play with routes and route extension example /hello, / , /hello2, /xyz
- Order of route matter a lot
- Install postman app and make a workspace
- Write logic to handle GET, POST, PATCH, DELETE Api calls and test them on postman
- Explore routing and use of ?, +, (), \* in the routes
- Use of regex in routes /a/ , /.\*fly$/
- Reading the query params in the routes
- Reading the dynamic routes

- Multiple Route handlers - Play with the code
- next()
- next function and errors along with res.send()
- app.use("/route", rH, [rH2, rH3], rH4, rH5);
- What is the Middleware? Why do we need it?
- How express JS basically handles requests behind the scenes
- Difference app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy with middleware for all user routes, except /user/login
- Error Handling using app.use("/", (err,req,res,next) = {});

- Create a free culster on MongoDB official website (Mongo Atlas)
- Install mongoose library
- Connect your application to the Database "Connection-url"/devTinder
- Call the connectDB function and connect to database before starting application on 7777
- Create a userSchema & user Model
- Create Post / signup API to add data to database
- Push some documents using API calls from postman
- Error Handling using try, catch

- JS Object vs JSON (differences)
- Add the express.json middleware to your app
- Make your signup API dynamic to receive data from the end server
- User.findOne with duplicate email ids, which object returned
- API - Get user by email
- API - Feed API - GET / feed - get all the users from the database
- API - Get user by ID
- Create a delete user API
- Difference between PATCH and PUT
- API - Update a User
- Explore the mongoose documentation for Model API https://mongoosejs.com/docs/api/model.html
- What are option in a Model.findOneAndUpdate method, explore more about it
- API - Update the user with email ID

- Explore schematype option from the documentation
- add required, unique, lowercase, min, minLength, trim
- Add default
- Create a custom validate function for gender
- Improve the DB Schema - PUT all appropriate validation in each field of schema
- Add timestamp to the user schema
- Add API level validation on Patch request & Signup post API
- Add API validation for each field
- Install validator
- Explore validator library function for password, email
- NEVER TRUST req.body

- Validate data in Signup API
- Install bcrypt package
- Create Passwordhash using bcrypt.hash & save the user is excrupted password
- Create Login API
- Compare password and throw error if email or password invalid

- install cookie-parser
- just send a dummy cookie to user
- create GET / profile APi and check if you get the cookie back
- install jsonwebtoken
- In login API, after email and passowrd validation, create a JWT token and send it to user in cookies
- read the cookies inside your profile API and find the logged in user
- userAuth Middleware
- Add the userAuth middleware in profile API and and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days
- Create userSchema method to getJWT()
- Create userSchema method to comparePassword(passwordInputByUser)

- Explore tinder APIs
- Create a list all API you can think of in Dev Tinder
- Group multiple routes under repective routers
- Read documentation for express.Router
- Create routes folder for managing auth,profile, request routers
- create authRouter, profileRouter, requestRouter
- Import these routers in app.js
- Create POST /logout API
- Create PATCH /profile/edit
- Create PATCH /profile/password API => forgot password API
- Make you validate all data in every POST, PATCH apis
- Create Connnection Request Schema
- Send Connection Request API
- Proper validation of Data
- Think about ALL corner cases
- $or query $and query in mongoose - https://www.mongodb.com/docs/manual/reference/operator/query-logical/
- schema.pre("save") function
- Read more about indexes in MongoDB
- Why do we need index in DB?
- What is the advantages and disadvantage of creating?
- Read this arcticle about compond indexes - https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
- ALWAYS THINK ABOUT CORNER CASES
- Write code with proper validations for POST /request/review/:status/:requestId
- Thought process - POST vs GET
- Read about ref and populate https://mongoosejs.com/docs/populate.html
- Create GET /user/requests/received with all the checks
- Create GET GET /user/connections
- Logic for GET /feed API
- Explore the $nin , $and, $ne and other query operatorators
- Pagination

NOTES:

/feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)

/feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)

/feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)

/feed?page=4&limit=10 => 21-30 => .skip(30) & .limit(10)

skip = (page-1)\*limit;
