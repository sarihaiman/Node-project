import express from 'express';
const PhotographyPackageController = require('../Controllers/PhotographyPackage.Controller');
const router = express.Router();

router.get('/PhotographyPackage', PhotographyPackageController.get)
router.post('/PhotographyPackage', PhotographyPackageController.post)
router.put('/PhotographyPackage/:Id', PhotographyPackageController.put)
router.delete('/PhotographyPackage/:Id', PhotographyPackageController.deleteOne)

export default router