// routes/employeeRoutes.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch customers for a specific business
const getCustomers = async (req, res) => {
    const { businessId } = req.params; // Extract business_id from URL parameters

    try {
        const customers = await prisma.customer.findMany({
            where: {
                business_id: parseInt(businessId), // Filter customers by business_id
            },
        });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: "Error fetching customers" });
    }
};

// Create a new customer for a specific business
const createCustomer = async (req, res) => {
    const { businessId } = req.params; // Extract business_id from URL parameters
    const { name, email, phone, address } = req.body; // Extract customer data from the request body

    try {
        const newCustomer = await prisma.customer.create({
            data: {
                name,
                email,
                phone,
                address,
                business_id: parseInt(businessId), // Link the customer to the business
            },
        });
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ error: "Error creating customer" });
    }
};

export { getCustomers, createCustomer };
