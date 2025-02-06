// routes/employeeRoutes.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getSales = async (req, res) => {
    const { business_id } = req.params;  // Get the business_id from the route parameters

    try {
        const sales = await prisma.sales.findMany({
            where: {
                business_id: parseInt(business_id)  // Filter sales by business_id
            },
            include: {
                customer: {
                    select: { name: true }
                },
                item: {
                    select: { item_name: true, price: true } // Including price to display as well
                },
                business: {
                    select: { name: true } // You can include the business name if necessary
                }
            }
        });

        // Transform the data to return customer name, item name, and other sales details
        const formattedSales = sales.map(sale => ({
            sale_id: sale.id,
            customerName: sale.customer.name,
            itemName: sale.item.item_name,
            itemPrice: sale.item.price,  // Adding item price
            quantitySold: sale.quantity_sold,
            saleDate: sale.sale_date,
            totalPrice: sale.total_price,
            businessName: sale.business.name  // If you need business info, add it here
        }));

        res.json(formattedSales);
    } catch (error) {
        res.status(500).json({ error: "Error fetching sales data" });
    }
};

export { getSales };
