// server.js
import express from "express";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employee/index.js";
import taskRoutes from "./routes/task/index.js";
import salesRoutes from "./routes/sales/index.js";  // Import the routes setup function
import customerRoutes from "./routes/customer/index.js";
import inventoryRoutes from "./routes/inventory/index.js";

dotenv.config();
const app = express();

app.use(express.json());

// Setup all routes
employeeRoutes(app);
taskRoutes(app);
salesRoutes(app);
customerRoutes(app);
inventoryRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
