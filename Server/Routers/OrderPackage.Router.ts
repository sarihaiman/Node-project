import express from 'express';
const OrderPackageController = require('../Controllers/OrderPackage.Controller');
const router = express.Router();

router.get('/OrderPackage', OrderPackageController.get)
router.post('/OrderPackage', OrderPackageController.post)
router.put('/OrderPackage/:Id', OrderPackageController.put)
router.delete('/OrderPackage/:Id', OrderPackageController.deleteOne)

export default router