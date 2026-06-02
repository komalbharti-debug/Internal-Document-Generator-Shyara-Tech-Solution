import { configDotenv } from 'dotenv';
import express from 'express';
import dotenv from 'dotenv' ; 
import userRoute from './routes/userRoutes.js';
import prisma from './src/config/prisma.js';
// const prisma = require('./src/config/prisma');

dotenv.config();


const app = express();

const PORT = process.env.PORT || 5000; 

// Test Route for Prisma 
app.get('/test-db', async (req, res) => {
    const templates = await prisma.template.findMany();

    res.json({
        success: true,
        data: templates
    });
});



// Routes
app.use('/user',userRoute)





// Starting Server 
app.listen(PORT,()=>{
    console.log(`Server is running at http//:localhost:${PORT}`);
})