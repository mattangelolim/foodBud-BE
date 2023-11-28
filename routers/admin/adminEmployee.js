const express = require("express");
const router = express.Router();
const Employee = require("../../models/employee");

// Call all employee
// http://localhost:9001/api/all/employee
router.get("/all/employee", async (req, res) => {
  try {
    const employee = await Employee.findAll();
    res.json({ employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/employee/register", async (req, res) => {
  try {
    const {
      emp_Id,
      emp_name,
      emp_position,
      emp_email,
      emp_contactnum,
      emp_address,
    } = req.body;

    // Create a new client
    const newEmployee = await Employee.create(req.body);

    res
      .status(201)
      .json({
        message: "Employee registered successfully",
        employee: newEmployee,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Find one Employee
router.get("/employee", async (req, res) => {
  try {
    const id = req.query.id;
    const employee = await Employee.findOne({
      where: {
        emp_id: empID,
      },
    });
    res.json({ employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Update Employee
// http://localhost:9001/api/update/employee
router.post("/employee/update", async (req, res) => {
  const employeeId = req.query.id;

  try {
    // Find the Employee by ID
    const existingEmployee = await Client.findByPk(employeeId);

    if (!existingEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Update Employee details
    existingEmployee.emp_name = req.body.emp_name || existingEmployee.emp_name;
    existingEmployee.emp_position =
      req.body.emp_address || existingEmployee.emp_position;
    existingEmployee.emp_email =
      req.body.emp_contact || existingEmployee.emp_email;
    existingEmployee.emp_contactnum =
      req.body.emp_email || existingEmployee.emp_contactnum;
    existingEmployee.emp_address =
      req.body.emp_address || existingEmployee.emp_address;

    // Save the updated Employee
    const updatedEmployee = await existingEmployee.save();

    res.json({
      message: "Employee details updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Employee
// http://localhost:9001/api/delete/employee
router.post("/employee/delete", async (req, res) => {
  try {
    const empID = req.query.empID;

    // Check if the Employee with the provided ID exists
    const existingEmployee = await Employee.findByPk(empID);

    if (!existingEmployee) {
      return res.status(404).json({ message: "Employee Record not found" });
    }

    // If the Employee exists, proceed with deletion
    await Employee.destroy({
      where: {
        emp_id: empID,
      },
    });

    res.status(200).json({ message: "Employee record deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
