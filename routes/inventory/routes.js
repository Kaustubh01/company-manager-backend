// routes/employeeRoutes.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getInventory = async (req, res) => {
    try {
        const inventoryItems = await prisma.inventory.findMany();
        res.json(inventoryItems);
    } catch (error) {
        res.status(500).json({ error: "Error fetching inventory items" });
    }
};


export { getInventory };
