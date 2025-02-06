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
            include: {
                business:true // Include the related business data
            },
        });

        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        res.status(200).json(employee);  // Send entire employee object, including the business details
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({ error: "Error fetching employee" });
    }
};

const getGeneralBuisnessId = async (req, res) => {
    const { email } = req.query;  // Get email from query parameter
    if (!email) {
        return res.status(400).json({ error: "Email query parameter is required" });
    }

    try {
        // Find the employee by email, including business details
        const employee = await prisma.employee.findUnique({
            where: {
                email,
            },
            select: {
                business_id: true,  // Only select the business_id from the employee
            },
        });

        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        // Return the business_id
        res.status(200).json({ business_id: employee.business_id });
    } catch (error) {
        console.error("Error fetching business ID:", error);
        res.status(500).json({ error: "Error fetching business ID" });
    }
};


export { getGeneralEmployeesByEmail,getGeneralBuisnessId };
