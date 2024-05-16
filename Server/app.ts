import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
const app = express();
const PORT = process.env.PORT

import PhotographyPackage_Controller from './Controllers/PhotographyPackage.Controller'

app.use(PhotographyPackage_Controller)

app.listen(PORT, () =>{
  console.log(`http://localhost:${PORT}`)
}).on('error',function(err){ console.log("Error occurred, server can't start" , err); })
