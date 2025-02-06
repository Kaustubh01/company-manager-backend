import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const createBusiness = async (req, res) => {
    const { name,type } = req.body;
    if (!name || !type) {
        return res.status(400).json({ error: "name and type are required" });
    }

    try {
        const newBusiness = await prisma.business.create({
            data: { 
                name:name,
                type:type
                 }
        });
        res.status(201).json(newBusiness);
    } catch (error) {
        console.error("Error creating buisness:", error);
        res.status(500).json({ error: "Error creating buisness" });
    }
};

export {createBusiness}