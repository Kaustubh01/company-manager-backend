import { getCustomers } from './routes.js';

const customerRoutes = (app) => {
    // Fetch customers for a specific business by businessId
    app.get("/customers/:businessId", getCustomers);
};

export default customerRoutes;
