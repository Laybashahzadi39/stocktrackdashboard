require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect MongoDB Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Socket.io Setup for Realtime Stock Updates
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

const stocks = [
    { symbol: 'AAPL', price: 180.50 },
    { symbol: 'TSLA', price: 240.20 },
    { symbol: 'AMZN', price: 175.80 },
    { symbol: 'MSFT', price: 420.10 },
    { symbol: 'NVDA', price: 120.30 }
];

io.on('connection', (socket) => {
    console.log(`⚡ Client Connected: ${socket.id}`);

    const interval = setInterval(() => {
        const updatedStocks = stocks.map(stock => {
            const change = (Math.random() - 0.49) * 2;
            stock.price = Math.max(10, parseFloat((stock.price + change).toFixed(2)));
            return {
                symbol: stock.symbol,
                price: stock.price,
                direction: change >= 0 ? 'up' : 'down',
                timestamp: Date.now()
            };
        });
        io.emit('stockUpdate', updatedStocks);
    }, 2000);

    socket.on('disconnect', () => {
        clearInterval(interval);
        console.log(`❌ Client Disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Clean MERN Backend Server running on http://localhost:${PORT}`);
});