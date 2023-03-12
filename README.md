# Employee-review-system using NodeJS

## Tech Stack

*NodeJS , ExpressJS ,MongoDB , passport auth , EJS ,Bootstrap*

**Overview :**

 Employee review system using NodeJS, mongoDB, passport where employees can give performance reviews to each other assigned by admin or manager . 

 **Features :**

 - Admin view
    - Add/remove/update/view employees
    - Add/update/view performance reviews
    - Assign employees to participate in another employee's performance review
- Employee view
    - List of performance review requiring feedback
    - Submit feedback
-  1 login for admin and employee
- An employee can register, only admin can make an employee an admin


## Run Locally

1) Clone the project

```bash
  git clone https://github.com/Manraj-singh/Employee-review-system.git
```
alternatively , download the code zip file

2) install the nodemodules from package.json  :

```bash
  npm install
```

3) make sure you have Node, npm and mongoDB in your system

4) finally start it on your local server

```bash
  npm start
```
Open [http://localhost:8000](http://localhost:8000) to view it in your browser.
NOTE: PORT is defined on root index.js file .
## Folder Structure
```
.gitignore
assets
   |-- css
   |   |-- admin_view.css        
   |   |-- sign_in.css
configs
   |-- index.js
   |-- mongoose.js
   |-- passport-local-strategy.js
controllers
   |-- adminController.js        
   |-- employeeController.js     
   |-- index.js
index.js
middlewares
   |-- employee.js
   |-- index.js
   |-- set-flash.js
models
   |-- employee.js
   |-- index.js
   |-- review.js
package-lock.json
package.json
routes
   |-- admin.js
   |-- employee.js
   |-- index.js
secretKeys.js
views
   |-- add_employee.ejs
   |-- admin_view.ejs
   |-- edit_employee.ejs
   |-- employee_view.ejs
   |-- layout.ejs
   |-- partials
   |   |-- _navbar.ejs
   |-- performance_review.ejs
   |-- sign_in.ejs
```

walkthrough: 
- assets folder contains static files like css, js, images
- config folder contains all the configurations like mongoose /passport strategy
- controllers contains all the code which executes for a particular route . admin controllers has logic with admin priviliges
- middlewares folder contains custom middleware like precheks before registering /login ,and Flash notification

- models folder has all the schemas defined like employee,review

- routes folder has all the routes , admin.js has routes with admin privilages
- secretkeys file has all the secret keys if any
- ejs views are written in views folder

- root index file contains the express server setup


basic flow: index.js > routes > passport authentication > middlewares > controller logic > renders ejs views in frontend
