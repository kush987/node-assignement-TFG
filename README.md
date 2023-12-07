### Project Setup ###

# Step 1: Install Node.js
Make sure you have Node.js version 16 installed. You can download it here.

`node -v` # Check installed Node.js version
`npm install` # Install project dependencies

# Step 2: Set Up Docker Containers
 Run the following commands to start MySQL, MongoDB, and RabbitMQ in isolated Docker containers.

`docker-compose -f docker-compose-mysql.yml up -d`
`docker-compose -f docker-compose-mongodb.yml up -d`
`docker-compose -f docker-compose-rabbitmq.yml up -d`

# Step 3: Configure Email Service
 In the email-service.js file, replace the email and password with your own credentials (without 2FA) to enable sending emails for user registration.

# Step 4: Start the Application
`npm start` # or `npm run dev` for development

This will launch the application, and you can access it at http://localhost:3000.

# Api Collection
import this `assignment.postman_collection.json` in postman to view all the API collection.