import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import sequelize from './config/database.js';
import userRoutes from './routes/user.route.js';
import incomeRoutes from './routes/income.route.js';
import expenseRoutes from './routes/expense.route.js';
import categoryRoutes from './routes/category.route.js';
import budgetRoutes from './routes/budget.route.js';


const app = express();
const port = process.env.PORT || 5001;

try {
    await sequelize.authenticate();
    console.log('✅ Connected to MySQL DB using Sequelize');
    // await sequelize.sync({ alter: true })
    //                 .catch(err => console.log(err));
    console.log('✅ Models synchronized');
} catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server is running....");
});

app.use('/api/evision', userRoutes);
app.use('/api/evision', incomeRoutes);
app.use('/api/evision', expenseRoutes);
app.use('/api/evision', categoryRoutes);
app.use('/api/evision', budgetRoutes);


app.listen(port, () => {
    console.log("🚀 Server is running on " + port);
});


