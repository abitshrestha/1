import express from 'express';
import 'dotenv/config.js';
import cors from 'cors';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import morgan from 'morgan';
import { connectDB } from './config/db.js';

const PORT=process.env.PORT;

connectDB();

const app=express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.get('/check',(req,res)=>{
    res.send('hello world!');
});

app.listen(PORT,()=>{
    console.log(`Server listening on http://localhost:${PORT}`);
}); 