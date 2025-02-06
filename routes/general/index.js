import { getGeneralEmployeesByEmail } from "./routes.js"; // Import route handlers

const generalRoutes = (app) => {

    app.get("/business/general/employees/email", getGeneralEmployeesByEmail); 
};

export default generalRoutes;  // Export the setup function
