import { createTask, getTasks, updateTaskStatus } from "./routes.js";

const taskRoutes = (app) => {
    app.post("/tasks", createTask);  // Changed path to plural for consistency
    app.get("/tasks", getTasks);
    app.post("/tasks/update-status", updateTaskStatus)
};

export default taskRoutes;
