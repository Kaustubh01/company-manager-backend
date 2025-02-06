import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createTask = async (req, res) => {
    const { employeeId, title, desc, dueDate, status } = req.body;

    // Validate required fields
    if (!employeeId || !title) {
        return res.status(400).json({ error: "Employee ID and title are required." });
    }

    if (isNaN(employeeId)) {
        return res.status(400).json({ error: "Employee ID must be a valid number." });
    }

    if (dueDate && isNaN(Date.parse(dueDate))) {
        return res.status(400).json({ error: "Invalid due date format." });
    }

    try {
        // Create task
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

const getTasks = async (req, res) => {
    const { employeeId } = req.query;

    if (!employeeId) {
        return res.status(400).json({ error: "Employee ID query parameter is required." });
    }

    if (isNaN(employeeId)) {
        return res.status(400).json({ error: "Employee ID must be a valid number." });
    }

    try {
        const tasks = await prisma.task.findMany({
            where: { employeeId: parseInt(employeeId) },
            orderBy: { createdAt: "desc" }, // Most recent tasks first
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

export { createTask, getTasks };
