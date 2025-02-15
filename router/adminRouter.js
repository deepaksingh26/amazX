const express=require('express');
const router=express.Router();
const adminController=require('../controller/adminController');
const verifyAdmin = require('../middleware/verifyAdmin');


router.post("/admin/login",adminController.LoginAdmin)
router.get("/Employees",adminController.getAllEmployee)
router.delete("/Employee/:id",adminController.deleteEmployee)
router.patch("/Employee/:id",adminController.updateEmployee)
router.post("/addAdmin",adminController.addAdmin)
router.get('/admins',adminController.getAllAdmins)
router.delete('/admin/:id',adminController.deleteAdmin).patch('/admin/:id',verifyAdmin,adminController.updateAdmin)
router.route("/pendingleave").get(adminController.getPendingLeaveData)
router.route("/updateleavestatus/:id").post(adminController.updateLeaveStatus)
router.route("/payallemployee").post(adminController.payAllEmployee)

module.exports=router;
