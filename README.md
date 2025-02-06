Employee Management System Backend:
Packages used : Nodejs, Express, Mongoose, Bcryptjs, cors, Jsonwebtoken, Nodemon....

This repo has backend of Employee management system. 
Here the Folder structures are well composed to give clear picture of the data flow.

The Models had 2 schemas 1. For user 2 For the tasks.

The controllers has 2 controller options to perform CRUD operations on the tasks and Users.

Middleware has a admin protected toute which helps us to check if the user has admin access before he hits the end point.

Routes has all the api end points which is used to Perform CRUD on users and tasks.

In Common folder there is an auth file which helps to create decode and verify Json webtoken and also helps to end the session once the expiry time reaches.
