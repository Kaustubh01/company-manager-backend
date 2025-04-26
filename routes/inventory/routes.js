import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get inventory items for a specific business
const getInventory = async (req, res) => {
    const { business_id } = req.params;
    try {
        const inventoryItems = await prisma.inventory.findMany({
            where: { business_id: parseInt(business_id) }
        });
        res.json(inventoryItems);
    } catch (error) {
        console.error("Error fetching inventory items:", error);
        res.status(500).json({ error: "Error fetching inventory items" });
    }
};

// Add a new product to inventory
const addProduct = async (req, res) => {
    const { item_name, quantity, price, supplier, category, business_id } = req.body;

    if (!item_name || quantity == null || price == null || !supplier || !category || !business_id) {
        return res.status(400).json({ error: "All product details including business ID and category are required" });
    }

    try {
        const newProduct = await prisma.inventory.create({
            data: { 
                item_name, 
                quantity, 
                price, 
                supplier, 
                category, // Ensure category is included
                business_id: parseInt(business_id) 
            },
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Error creating product" });
    }
};

// Update an existing inventory item
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { item_name, quantity, price, supplier, category, business_id } = req.body;

    try {
        const updatedProduct = await prisma.inventory.update({
            where: { id: parseInt(id) },
            data: { 
                item_name, 
                quantity, 
                price, 
                supplier, 
                category,  // Ensure category is included
                business_id: parseInt(business_id) 
            },
        });
        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Error updating product" });
    }
};

// Delete an inventory item
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.inventory.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Error deleting product" });
    }
};

export { getInventory, addProduct, updateProduct, deleteProduct };
