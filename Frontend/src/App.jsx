import React, { useState } from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import { Auth } from './components/Auth';

function App() {
  const { stocks, isConnected } = useWebSocket();
  const [user, setUser] = useState(null);
  const [inputSymbol, setInputSymbol] = useState('');
  const [watchlist, setWatchlist] = useState(['AAPL', 'TSLA', 'AMZN', 'MSFT', 'NVDA']);

  const handleAddStock = (e) => {
    e.preventDefault();
    if (!inputSymbol.trim()) return;
    const symbolUpper = inputSymbol.trim().toUpperCase();

    if (!watchlist.includes(symbolUpper)) {
      setWatchlist([...watchlist, symbolUpper]);
    }
    setInputSymbol('');
  };

  const handleRemoveStock = (symbolToRemove) => {
    setWatchlist(watchlist.filter(s => s !== symbolToRemove));
  };

  if (!user) {
    return (
      <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>📈 Stock Ticker Dashboard</h1>
        <Auth onLoginSuccess={(userData) => setUser(userData)} />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif' }}>
      
      {/* Header with User Profile & Logout */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>📈 Live Stock Market Dashboard</h1>
          <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '14px' }}>Welcome back, <strong>{user.name || user.email}</strong>!</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ 
            padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600',
            backgroundColor: isConnected ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            color: isConnected ? '#4ade80' : '#f87171', border: `1px solid ${isConnected ? '#22c55e' : '#ef4444'}`
          }}>
            {isConnected ? '● Live Stream Connected' : '○ Disconnected'}
          </span>
          <button 
            onClick={() => setUser(null)}
            style={{ padding: '8px 16px', borderRadius: '6px', backgroundColor: '#334155', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Interactive Search Bar */}
      <form onSubmit={handleAddStock} style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
        <input 
          type="text" 
          placeholder="Enter stock symbol (e.g. GOOGL, META, NFLX)..."
          value={inputSymbol}
          onChange={(e) => setInputSymbol(e.target.value)}
          style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', fontSize: '15px' }}
        />
        <button 
          type="submit"
          style={{ padding: '12px 24px', borderRadius: '8px', backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
        >
          + Add Stock
        </button>
      </form>

      {/* Live Updating Table */}
      <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155', backgroundColor: '#0f172a', color: '#94a3b8', fontSize: '12px' }}>
              <th style={{ padding: '16px' }}>SYMBOL</th>
              <th style={{ padding: '16px' }}>LIVE PRICE ($)</th>
              <th style={{ padding: '16px' }}>TREND</th>
              <th style={{ padding: '16px' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((symbol) => {
              const stockData = stocks[symbol];
              return (
                <tr key={symbol} style={{ borderBottom: '1px solid #334155', transition: 'background-color 0.3s ease' }}>
                  <td style={{ padding: '16px', fontWeight: 'bold', fontSize: '16px' }}>{symbol}</td>
                  <td style={{ padding: '16px', fontSize: '18px', fontWeight: '600', fontFamily: 'monospace' }}>
                    {stockData ? `$${stockData.price.toFixed(2)}` : 'Loading...'}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold',
                      backgroundColor: stockData?.direction === 'up' ? 'rgba(34, 197, 94, 0.2)' : stockData?.direction === 'down' ? 'rgba(239, 68, 68, 0.2)' : '#334155',
                      color: stockData?.direction === 'up' ? '#4ade80' : stockData?.direction === 'down' ? '#f87171' : '#94a3b8'
                    }}>
                      {stockData?.direction === 'up' ? '▲ UP' : stockData?.direction === 'down' ? '▼ DOWN' : '─ EVEN'}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <button 
                      onClick={() => handleRemoveStock(symbol)}
                      style={{ padding: '6px 12px', borderRadius: '6px', backgroundColor: '#ef4444', color: 'white', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;