// routes.js (or a similar file)
import { getSales } from './employeeRoutes.js';  // Ensure correct path to employeeRoutes.js

const salesRoutes = (app) => {
    // Use :business_id as a route parameter
    app.get("/sales/:business_id", getSales);
}

export default salesRoutes;
