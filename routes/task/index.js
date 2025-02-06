import { createTask, getTasks } from "./routes.js";

const taskRoutes = (app) => {
    app.post("/tasks", createTask);  // Changed path to plural for consistency
    app.get("/tasks", getTasks);
};

export default taskRoutes;
