const express=require('express');
const router=express.Router();
const employeeController=require('../controller/employeeController');
const verifyEmployee=require('../middleware/verifyEmployee')

router.post("/registerEmployee",employeeController.registerEmployee)
router.post("/loginEmployee",employeeController.loginEmployee)
router.route("/Employee/:id").get(employeeController.getEmployee)
router.patch("/employee/Employee/:id",employeeController.updateEmployee)
router.route("/leave/:id").get(employeeController.getLeaveData).post(employeeController.applyForLeave)


module.exports=router
