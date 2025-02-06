import { getInventory, addProduct } from "./routes.js";

const inventoryRoutes = (app) => {
    app.get("/inventory/:business_id", getInventory); // Fetch inventory for a specific business
    app.post("/inventory/add-product", addProduct);
};

export default inventoryRoutes;
