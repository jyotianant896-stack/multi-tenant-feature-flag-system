require('dotenv').config();
require('./config/db');

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const featureRoutes = require('./routes/featureRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/users', userRoutes);


const errorMiddleware =
    require('./middleware/errorMiddleware');

app.use(errorMiddleware);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});