const WebSocket = require('ws');
const { formatStockData } = require('../utils/helperFunction');

let finnhubSocket = null;

const connectFinnhub = (io, symbols = ['AAPL', 'TSLA', 'AMZN', 'MSFT', 'NVDA']) => {
    const apiKey = process.env.FINNHUB_API_KEY;

    if (!apiKey || apiKey === 'YOUR_FINNHUB_API_KEY_HERE') {
        console.warn("⚠️ FINNHUB_API_KEY missing in .env file!");
    }

    finnhubSocket = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);

    finnhubSocket.on('open', () => {
        console.log('✅ Connected to Finnhub Live Stock Stream');
        symbols.forEach(symbol => {
            finnhubSocket.send(JSON.stringify({ type: 'subscribe', symbol }));
        });
    });

    finnhubSocket.on('message', (data) => {
        try {
            const parsedData = JSON.parse(data);
            if (parsedData.type === 'trade') {
                const formattedData = formatStockData(parsedData.data);
                io.emit('stockUpdate', formattedData);
            }
        } catch (error) {
            console.error('Error parsing Finnhub message:', error);
        }
    });

    finnhubSocket.on('error', (err) => {
        console.error('❌ Finnhub WS Error:', err.message);
    });

    finnhubSocket.on('close', () => {
        console.log('🔄 Finnhub Connection closed. Reconnecting in 5s...');
        setTimeout(() => connectFinnhub(io, symbols), 5000);
    });
};

module.exports = { connectFinnhub };