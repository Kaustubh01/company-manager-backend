// routes/employeeRoutes.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getCustomers = async (req, res) => {
    try {
        const customers = await prisma.customer.findMany();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: "Error fetching customers" });
    }
};



export { getCustomers };
