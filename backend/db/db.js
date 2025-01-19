const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false); // Disable strict query mode
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit the process with failure code
    }
};

module.exports = { db };
