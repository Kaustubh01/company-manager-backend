// routes/employeeRoutes.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getSales = async (req, res) => {
    try {
        const sales = await prisma.sales.findMany({
            include: {
                customer: {
                    select: { name: true }
                },
                item: {
                    select: { item_name: true }
                }
            }
        });

        // Transform the data to return customer name and item name
        const formattedSales = sales.map(sale => ({
            sale_id: sale.id,
            customerName: sale.customer.name,
            itemName: sale.item.item_name,
            quantitySold: sale.quantity_sold,
            saleDate: sale.sale_date,
            totalPrice: sale.total_price
        }));

        res.json(formattedSales);
    } catch (error) {
        res.status(500).json({ error: "Error fetching sales data" });
    }
};



export { getSales };
