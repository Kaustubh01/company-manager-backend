import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getGeneralEmployeesByEmail = async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: "Email query parameter is required" });
    }

    try {
        const employee = await prisma.employee.findUnique({
            where: {
                email,
            },
        });

        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        res.status(200).json(employee);
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({ error: "Error fetching employee" });
    }
};

export {getGeneralEmployeesByEmail}