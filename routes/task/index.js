import { createTask, getTasks } from "./routes.js";

const taskRoutes = (app)=>{
    app.post("/task/create",createTask);
    app.get("/task", getTasks);
};

export default taskRoutes;