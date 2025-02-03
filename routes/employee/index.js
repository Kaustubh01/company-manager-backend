// routes/index.js
import { createEmployee, getEmployees, updateEmployeeSalary, updateEmployeeAttendance, getEmployeesByName, getEmployeesByEmail, getEmployeesById } from "./routes.js"; // Import route handlers

const employeeRoutes = (app) => {
    app.post("/employees/create", createEmployee);  // Register post route
    app.get("/employees", getEmployees);
    app.put("/employees/update-salary", updateEmployeeSalary);  // Register get route
    app.put("/employees/update-attendance", updateEmployeeAttendance); 
    app.get("/employees/search-name", getEmployeesByName); // Register get route
    app.get("/employees/search-email", getEmployeesByEmail); // Register get route
    app.get("/employees/search-id", getEmployeesById); // Register get route
};

export default employeeRoutes;  // Export the setup function
