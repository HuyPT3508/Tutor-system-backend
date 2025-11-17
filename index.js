// index.js
const express = require("express");
const cors = require("cors");
const dbConfig = require('./config/database'); // Import cấu hình CSDL
const { Sequelize } = require('sequelize');

// Load .env variables
require('dotenv').config();

const app = express();

// Thiết lập Middleware
app.use(cors());
app.use(express.json()); // Dùng để đọc body JSON từ request

// Khởi tạo Sequelize (Kết nối CSDL)
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool
});

// Kiểm tra kết nối CSDL
async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connection to the database has been established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error.message);
        process.exit(1); // Thoát nếu không kết nối được
    }
}

// Route Test cơ bản
app.get("/", (req, res) => {
    res.json({ message: "Tutor Support Backend is running!" });
});


// Khởi chạy Server
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}.`);
    });
});