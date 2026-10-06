// Data formatting helper for Finnhub trade payloads
const formatStockData = (trades) => {
    if (!trades || !Array.isArray(trades)) return [];
    
    return trades.map(trade => ({
        symbol: trade.s,       // Stock Symbol (e.g. AAPL)
        price: trade.p,        // Current Price
        volume: trade.v,       // Trade Volume
        timestamp: trade.t     // Timestamp
    }));
};

module.exports = { formatStockData };