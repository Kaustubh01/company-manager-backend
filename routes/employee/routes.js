// routes/employeeRoutes.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createEmployee = async (req, res) => {
    const { name, email, role, department } = req.body;

    if (!name || !email || !role || !department) {
        return res.status(400).json({ error: "Name, email, department and role are required" });
    }

    try {
        const newEmployee = await prisma.employee.create({
            data: { name, email, role, attendance: 0 , department},
        });
        res.status(201).json(newEmployee);  // Return the newly created employee
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({ error: "Error creating employee" });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: "Error fetching employees" });
    }
};

const updateEmployeeSalary = async (req, res) =>{
    const {id, newSalary} = req.body;
    try {
        const employee = await prisma.employee.update({
            where:{id},
            data:{
                salary: newSalary
            }
        });
        res.status(200).json(employee);
    } catch (error) {
        console.error("error updating employee salary", error);
        res.status(500).json({error: "error updating employee salary"});
    }
}

const updateEmployeeAttendance = async (req, res) => {
    const { id } = req.body;
    try {
        const employee = await prisma.employee.update({
            where:{id},
            data:{
                attendance : {increment:1},
                lastAttendanceRecorded : new Date()
            }
        });
        res.status(200).json(employee);
    } catch (error) {
        console.error("error updating employee attendance", error);
        res.status(500).json({error: "error updating employee salary"});
    }
}

const getEmployeesByName = async (req, res) => {
    const { name } = req.query;  // Extract name from the query string

    if (!name) {
        return res.status(400).json({ error: "Name query parameter is required" });
    }

    try {
        const employees = await prisma.employee.findMany({
            where: {
                name: {
                    contains: name,  // Find employees whose name contains the query string
                    mode: 'insensitive',  // Make the search case-insensitive
                },
            },
        });

        if (employees.length === 0) {
            return res.status(404).json({ error: "No employees found with that name" });
        }

        res.status(200).json(employees);  // Return the list of employees
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ error: "Error fetching employees" });
    }
};

const getEmployeesById = async (req, res) => {
    const { id } = req.query;

    if(!id){
        return res.status(400).json({ error: "id query parameter is required" });
    }

    const employeeId = parseInt(id, 10);
    if (isNaN(employeeId)) {
        return res.status(400).json({ error: "Invalid id format. It must be a number." });
    }

    try {
        const employee = await prisma.employee.findUnique({
            where:{
                id: employeeId
            }
        });
        if (!employee) {
            return res.status(404).json({error: "No employee present for the given id"});
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({error: "Error fetching employee"});
    }
}
const getEmployeesByEmail = async (req, res) => {
    const { email } = req.query;

    if(!email){
        return res.status(400).json({ error: "id query parameter is required" });
    }

    try {
        const employee = await prisma.employee.findUnique({
            where:{
                email: email
            }
        });
        if (!employee) {
            return res.status(404).json({error: "No employee present for the given email"});
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({error: "Error fetching employee"});
    }
}


export { createEmployee, getEmployees, updateEmployeeSalary, updateEmployeeAttendance, getEmployeesByName, getEmployeesByEmail, getEmployeesById };  // Export route handlers
