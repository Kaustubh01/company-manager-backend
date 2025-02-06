import { createEmployee, getEmployees, updateEmployeeSalary, updateEmployeeAttendance, getEmployeesByName, getEmployeesByEmail, getEmployeesById } from "./routes.js"; // Import route handlers

const employeeRoutes = (app) => {
    // Modify the routes to include the businessId parameter
    app.post("/business/:businessId/employees/create", createEmployee);  // Register post route with businessId
    app.get("/business/:businessId/employees", getEmployees);  // Register get route with businessId
    app.put("/business/:businessId/employees/update-salary", updateEmployeeSalary);  // Register put route with businessId
    app.put("/business/:businessId/employees/update-attendance", updateEmployeeAttendance); 
    app.get("/business/:businessId/employees/search-name", getEmployeesByName);  // Register get route with businessId
    app.get("/business/:businessId/employees/search-email", getEmployeesByEmail);  // Register get route with businessId
    app.get("/business/employees/search-email", getEmployeesByEmail);  // Register get route with businessId
    app.get("/business/:businessId/employees/search-id", getEmployeesById);  // Register get route with businessId
};

export default employeeRoutes;  // Export the setup function
