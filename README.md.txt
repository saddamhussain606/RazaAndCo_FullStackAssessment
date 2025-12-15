# Job Assessment App

1. Backend (.NET 8 API)

   1.1 Install Requirements
       - .NET 8 SDK
       - SQL Server

   1.2 Clone Backend Repository

   1.3 Configure SQL Server Connection
       - Open appsettings.json and update the connection string:

   1.4 Run Backend API
       dotnet run
       - This will create the database automatically and seed the default Admin user.

   1.5 Default Admin User Credentials
       Username: admin
       Password: Admin@123

   1.6 Access API Documentation (Swagger)
       https://localhost:7117/swagger/index.html

2. Frontend (React.js)

   2.1 Clone Frontend Repository
       cd job-assessment-ui

   2.2 Install Dependencies
       npm install

   2.3 Configure API URL
       - Create a .env file in the frontend root folder:
         REACT_APP_API_BASE_URL=https://localhost:7117/api

   2.4 Start React App
       npm start
       - Open in browser:
         http://localhost:3000

3. Login & Roles

   3.1 Admin User (Full Access)
       Username: admin
       Password: Admin@123
       - Can view "Users" menu for creating, editing, deleting, and listing users.

   3.2 Regular Users
       - Can only login and view the dashboard. No access to Users menu.

4. Notes

   4.1 Run backend API first, then frontend.
   4.2 Admin role controls user CRUD operations.
   4.3 The database will automatically seed admin user on first run.
