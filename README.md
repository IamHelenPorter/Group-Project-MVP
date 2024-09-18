`cd client` and `npm install`


- - Access the MySQL interface in a new window in your terminal by running `mysql -u root -p`
- Create a new database called goal: `create database group_project;`



- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

DB_HOST=localhost
DB_USER=root
DB_PASS= "Enter your MySQL password here"
DB_NAME=group_project



-`npm run migrate` in project directory