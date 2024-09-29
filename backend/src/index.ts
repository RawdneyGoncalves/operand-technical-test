import express from 'express';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
