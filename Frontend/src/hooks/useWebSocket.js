import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

export const useWebSocket = () => {
    const [stocks, setStocks] = useState({});
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socket = io(SOCKET_URL);

        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('stockUpdate', (tradeData) => {
            if (tradeData && tradeData.length > 0) {
                setStocks((prevStocks) => {
                    const updated = { ...prevStocks };
                    tradeData.forEach((trade) => {
                        const prevPrice = prevStocks[trade.symbol]?.price || trade.price;
                        const direction = trade.price > prevPrice ? 'up' : trade.price < prevPrice ? 'down' : 'same';

                        updated[trade.symbol] = {
                            symbol: trade.symbol,
                            price: trade.price,
                            prevPrice: prevPrice,
                            direction: direction,
                            timestamp: trade.timestamp
                        };
                    });
                    return updated;
                });
            }
        });

        return () => socket.disconnect();
    }, []);

    return { stocks, isConnected };
};