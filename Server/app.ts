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
import PhotographyPackage_Router from './Routers/PhotographyPackage.Router';
import OrderPackage_Router from './Routers/OrderPackage.Router';
import aouthentication_user from './Middleware/aouthentication_user.middleware';
import aouthentication_admin from './Middleware/aouthentication_admin.middleware';

app.use(user_router)
app.use(aouthentication_user)
app.use(aouthentication_admin)
app.use(PhotographyPackage_Router)
app.use(OrderPackage_Router)
app.use(business_router)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
}).on('error', function (err) { console.log("Error occurred, server can't start", err); })

