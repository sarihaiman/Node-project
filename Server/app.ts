import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
dotenv.config()
const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

import business_router from './Routers/business.router';
import user_router from './Routers/user.router';
import PhotographyPackage_Router from './Routers/PhotographyPackage.Router';
import OrderPackage_Router from './Routers/OrderPackage.Router';
import cors from 'cors';
import upload_router from './Routers/upload.router';
import feedback from './Routers/Feedback.Router';

app.use(cors());
app.use(user_router)
app.use(PhotographyPackage_Router)
app.use(OrderPackage_Router)
app.use(business_router)
app.use(upload_router);
app.use(feedback);



















const mailgun = require('mailgun-js')({
  apiKey: 'c82a25f27f747c18a4333aeeb7a2e92f-2b755df8-0e5648b1',
  domain: 'sandbox13391acc10be4865ad8a5b240fc50aeb.mailgun.org'
});

const sendEmail = (to: string, subject: string, text: string) => {
  const data = {
      from: 's97414h@gmail.com',
      to,
      subject,
      text
  };

  mailgun.messages().send(data, (error: any, body: any) => {
      if (error) {
          console.error(error);
      } else {
          console.log(body);
      }
  });
};

// שימוש
// sendEmail('s97414h@gmail.com', 'Test Email', 'זהו מייל ניסיון מ-Mailgun');


















const options: swaggerJsdoc.Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My API Documentation',
        version: '1.0.0',
        description: 'API Documentation using Swagger',
      },
    },
    apis: [
      path.join(__dirname, 'Routers/*.ts'),  // קבצים בתיקיית routes
      path.join(__dirname, 'Controllers/*.ts') // קבצים בתיקיית controllers
    ],
  };
  
  const swaggerSpec = swaggerJsdoc(options);
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
  import exampleRouter from './Routers/OrderPackage.Router';
  app.use('/api', exampleRouter);
  
app.listen(PORT, () => {
  console.log(`Server is running on port : http://localhost:${PORT}`)
}).on('error', function (err) { console.log("Error occurred, server can't start", err); })
