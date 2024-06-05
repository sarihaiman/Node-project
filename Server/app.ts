import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config()
const app = express();
const PORT = process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

import business_router from './Routers/business.router';
import user_router from './Routers/user.router';
import PhotographyPackage_Router from './Routers/PhotographyPackage.Router'
import OrderPackage_Router from './Routers/OrderPackage.Router'

app.use(business_router)
app.use(user_router)
app.use(PhotographyPackage_Router)
app.use(OrderPackage_Router)

app.listen(PORT, () =>{
  console.log(`http://localhost:${PORT}`)
}).on('error',function(err){ console.log("Error occurred, server can't start" , err); })

