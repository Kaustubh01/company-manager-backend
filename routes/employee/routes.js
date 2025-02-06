import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Middleware to get the business ID from the request
const getBusinessIdFromRequest = (req) => {
    const { businessId } = req.params;  // Business ID should be provided in the URL parameters
    if (!businessId) {
        throw new Error("Business ID is required");
    }
    return parseInt(businessId, 10);
};

const createEmployee = async (req, res) => {
    const { name, email, role, department, password } = req.body;
    const { businessId } = req.params;  // Get businessId from URL params

    if (!name || !email || !role || !department || !password) {
        return res.status(400).json({ error: "Name, email, department, password, and role are required" });
    }

    try {
        const newEmployee = await prisma.employee.create({
            data: {
                name,
                email,
                role,
                department,
                password,
                attendance: 0,
                business: {
                    connect: { id: parseInt(businessId) },  // Connect employee to the business by ID
                },
            },
        });
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({ error: "Error creating employee" });
    }
};

const getEmployees = async (req, res) => {
    const businessId = getBusinessIdFromRequest(req);  // Get business ID from URL

    try {
        const employees = await prisma.employee.findMany({
            where: {
                business: {  // Corrected field name here
                    id: businessId,  // Only return employees belonging to the specified business
                },
            },
        });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: "Error fetching employees" });
    }
};

const updateEmployeeSalary = async (req, res) => {
    const { id, newSalary } = req.body;
    const businessId = getBusinessIdFromRequest(req);  // Get business ID from URL

    try {
        const employee = await prisma.employee.update({
            where: { id },
            data: {
                salary: newSalary,
            },
            include: {
                business: true,  // Corrected field name here
            },
        });

        if (!employee || employee.business.id !== businessId) {
            return res.status(404).json({ error: "Employee not found in the specified business" });
        }

        res.status(200).json(employee);
    } catch (error) {
        console.error("Error updating employee salary:", error);
        res.status(500).json({ error: "Error updating employee salary" });
    }
};

const updateEmployeeAttendance = async (req, res) => {
    let { id } = req.body;
    const businessId = getBusinessIdFromRequest(req);  // Get business ID from URL

    // Parse the employee ID to an integer
    id = parseInt(id, 10);

    // Check if the ID is a valid number
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid employee ID" });
    }

    try {
        const employee = await prisma.employee.update({
            where: { id },
            data: {
                attendance: { increment: 1 },
                lastAttendanceRecorded: new Date(),
            },
            include: {
                business: true,  // Corrected field name here
            },
        });

        if (!employee || employee.business.id !== businessId) {
            return res.status(404).json({ error: "Employee not found in the specified business" });
        }

        res.status(200).json(employee);
    } catch (error) {
        console.error("Error updating employee attendance:", error);
        res.status(500).json({ error: "Error updating employee attendance" });
    }
};


const getEmployeesByName = async (req, res) => {
    const { name } = req.query;
    const businessId = getBusinessIdFromRequest(req);  // Get business ID from URL

    if (!name) {
        return res.status(400).json({ error: "Name query parameter is required" });
    }

    try {
        const employees = await prisma.employee.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
                business: {  // Corrected field name here
                    id: businessId,  // Filter by business ID
                },
            },
        });

        if (employees.length === 0) {
            return res.status(404).json({ error: "No employees found with that name for the specified business" });
        }

        res.status(200).json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ error: "Error fetching employees" });
    }
};

const getEmployeesById = async (req, res) => {
    const { id } = req.query;
    const businessId = getBusinessIdFromRequest(req);  // Get business ID from URL

    if (!id) {
        return res.status(400).json({ error: "ID query parameter is required" });
    }

    const employeeId = parseInt(id, 10);
    if (isNaN(employeeId)) {
        return res.status(400).json({ error: "Invalid ID format. It must be a number." });
    }

    try {
        const employee = await prisma.employee.findUnique({
            where: {
                id: employeeId,
            },
            include: {
                business: true,  // Corrected field name here
            },
        });

        if (!employee || employee.business.id !== businessId) {
            return res.status(404).json({ error: "Employee not found in the specified business" });
        }

        res.status(200).json(employee);
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({ error: "Error fetching employee" });
    }
};

const getEmployeesByEmail = async (req, res) => {
    const { email } = req.query;
    const businessId = getBusinessIdFromRequest(req);  // Get business ID from URL

    if (!email) {
        return res.status(400).json({ error: "Email query parameter is required" });
    }

    try {
        const employee = await prisma.employee.findUnique({
            where: {
                email,
            },
            include: {
                business: true,  // Corrected field name here
            },
        });

        if (!employee || employee.business.id !== businessId) {
            return res.status(404).json({ error: "Employee not found in the specified business" });
        }

        res.status(200).json(employee);
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({ error: "Error fetching employee" });
    }

    const getGeneralEmployeeByEmail = async (req, res) => {
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
    
};




export { 
    createEmployee, 
    getEmployees, 
    updateEmployeeSalary, 
    updateEmployeeAttendance, 
    getEmployeesByName, 
    getEmployeesByEmail, 
    getEmployeesById,
};
