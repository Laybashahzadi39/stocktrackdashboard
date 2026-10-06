const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

// 1. Get all saved watchlist stocks
router.get('/watchlist', async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Add a new stock symbol to watchlist
router.post('/watchlist', async (req, res) => {
    try {
        const { symbol } = req.body;
        if (!symbol) return res.status(400).json({ message: 'Symbol is required' });

        const existingSymbol = await Stock.findOne({ symbol: symbol.toUpperCase() });
        if (existingSymbol) {
            return res.status(400).json({ message: 'Stock already in watchlist' });
        }

        const newStock = new Stock({ symbol: symbol.toUpperCase() });
        await newStock.save();
        res.status(201).json(newStock);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Remove stock from watchlist
router.delete('/watchlist/:symbol', async (req, res) => {
    try {
        await Stock.findOneAndDelete({ symbol: req.params.symbol.toUpperCase() });
        res.json({ message: 'Stock removed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;