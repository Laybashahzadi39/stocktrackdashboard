import React from 'react';

export const StockTable = ({ stocks }) => {
  const stockList = Object.values(stocks);

  return (
    <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #334155', backgroundColor: '#0f172a', color: '#94a3b8', fontSize: '12px', letterSpacing: '1px' }}>
            <th style={{ padding: '16px' }}>SYMBOL</th>
            <th style={{ padding: '16px' }}>PRICE ($)</th>
            <th style={{ padding: '16px' }}>TREND</th>
            <th style={{ padding: '16px' }}>LAST UPDATED</th>
          </tr>
        </thead>
        <tbody>
          {stockList.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                ⏳ Waiting for live stock updates from backend...
              </td>
            </tr>
          ) : (
            stockList.map((stock) => (
              <tr key={stock.symbol} style={{ 
                borderBottom: '1px solid #334155',
                transition: 'background-color 0.4s ease',
                backgroundColor: stock.direction === 'up' 
                  ? 'rgba(34, 197, 94, 0.15)' 
                  : stock.direction === 'down' 
                  ? 'rgba(239, 68, 68, 0.15)' 
                  : 'transparent'
              }}>
                <td style={{ padding: '16px', fontWeight: 'bold', fontSize: '16px' }}>{stock.symbol}</td>
                <td style={{ padding: '16px', fontSize: '20px', fontWeight: '600', fontFamily: 'monospace' }}>
                  ${stock.price.toFixed(2)}
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: stock.direction === 'up' ? 'rgba(34, 197, 94, 0.2)' : stock.direction === 'down' ? 'rgba(239, 68, 68, 0.2)' : '#334155',
                    color: stock.direction === 'up' ? '#4ade80' : stock.direction === 'down' ? '#f87171' : '#94a3b8'
                  }}>
                    {stock.direction === 'up' ? '▲ UP' : stock.direction === 'down' ? '▼ DOWN' : '─ EVEN'}
                  </span>
                </td>
                <td style={{ padding: '16px', color: '#64748b', fontSize: '13px' }}>
                  {new Date(stock.timestamp).toLocaleTimeString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};