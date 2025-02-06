import { getGeneralEmployeesByEmail, getGeneralBuisnessId } from "./routes.js"; // Import route handlers

const generalRoutes = (app) => {
    app.get("/business/general/employees/email", getGeneralEmployeesByEmail);  // Employee by email
    app.get("/business/general/employees/business-id", getGeneralBuisnessId);  // Business ID by email
};

export default generalRoutes;  // Export the setup function
