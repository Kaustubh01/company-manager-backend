import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function to validate employee ID
const isValidEmployeeId = (id) => id && !isNaN(id);

// Create a new task
const createTask = async (req, res) => {
    const { employeeId, title, desc, dueDate, status } = req.body;

    if (!isValidEmployeeId(employeeId) || !title) {
        return res.status(400).json({ error: "Employee ID and title are required and must be valid." });
    }

    if (dueDate && isNaN(Date.parse(dueDate))) {
        return res.status(400).json({ error: "Invalid due date format." });
    }

    try {
        const newTask = await prisma.task.create({
            data: {
                title,
                description: desc || null,
                dueDate: dueDate ? new Date(dueDate) : null,
                status: status || "pending",
                employeeId: parseInt(employeeId),
            },
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Internal server error while creating task." });
    }
};

// Get tasks for an employee
const getTasks = async (req, res) => {
    const { employeeId } = req.query;

    if (!isValidEmployeeId(employeeId)) {
        return res.status(400).json({ error: "Employee ID query parameter is required and must be valid." });
    }

    try {
        const tasks = await prisma.task.findMany({
            where: { employeeId: parseInt(employeeId) },
            orderBy: { createdAt: "desc" },
        });

        if (!tasks.length) {
            return res.status(404).json({ error: "No tasks found for this employee." });
        }

        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Internal server error while fetching tasks." });
    }
};

// Update task status
const updateTaskStatus = async (req, res) => {
    const { taskId, status } = req.body;

    if (!taskId || isNaN(taskId) || !status) {
        return res.status(400).json({ error: "Task ID and new status are required and must be valid." });
    }

    try {
        const updatedTask = await prisma.task.update({
            where: { id: parseInt(taskId) },
            data: { status },
        });

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error updating task status:", error);

        if (error.code === "P2025") {
            return res.status(404).json({ error: "Task not found." });
        }

        res.status(500).json({ error: "Internal server error while updating task status." });
    }
};

export { createTask, getTasks, updateTaskStatus };
