import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const createTask = async (req, res) => {
    const { employeeId, title, desc, dueDate } = req.body;

    // Validate required fields
    if (!employeeId || !title) {
        return res.status(400).json({ error: "Employee ID and title are required" });
    }

    try {
        // Create a new task with the provided fields, associating it with the employee
        const newTask = await prisma.task.create({
            data: {
                title,
                description: desc,
                dueDate, // Ensure this matches your field name in the Prisma schema
                employeeId // Associate the task with the employee
            }
        });

        res.status(201).json(newTask); // Return the newly created task
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Error creating task" });
    }
}

const getTasks = async (req, res) => {
    const { employeeId } = req.query;

    // Validate if employeeId is provided and is a valid integer
    if (!employeeId) {
        return res.status(400).json({ error: "Employee ID query parameter is required" });
    }

    if (isNaN(employeeId)) {
        return res.status(400).json({ error: "Employee ID must be a valid number" });
    }

    try {
        // Convert employeeId to an integer
        const tasks = await prisma.task.findMany({
            where: {
                employeeId: parseInt(employeeId) // Ensure it's an integer
            }
        });

        if (tasks.length === 0) {
            return res.status(404).json({ error: "No tasks found for this employee" });
        }

        res.status(200).json(tasks); // Return the list of tasks
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Error fetching tasks" });
    }
}


export {createTask, getTasks};