// import React, { useState } from 'react';

// export const Auth = ({ onLoginSuccess }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     const endpoint = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';

//     try {
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });
//       const data = await response.json();

//       if (data.success) {
//         onLoginSuccess(data.user);
//       } else {
//         setError(data.message || 'Authentication failed');
//       }
//     } catch (err) {
//       setError('Server error. Make sure backend is running.');
//     }
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
//       <div style={{ backgroundColor: '#1e293b', padding: '2.5rem', borderRadius: '12px', width: '380px', border: '1px solid #334155' }}>
//         <h2 style={{ margin: '0 0 1rem 0', textAlign: 'center', color: '#f8fafc' }}>
//           {isLogin ? '🔑 Login to Dashboard' : '📝 Register Account'}
//         </h2>

//         {error && <p style={{ color: '#f87171', fontSize: '13px', textAlign: 'center' }}>{error}</p>}

//         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//           {!isLogin && (
//             <input
//               type="text"
//               placeholder="Full Name"
//               required
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
//             />
//           )}
//           <input
//             type="email"
//             placeholder="Email Address"
//             required
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             required
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
//           />
//           <button
//             type="submit"
//             style={{ padding: '12px', borderRadius: '6px', backgroundColor: '#2563eb', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
//           >
//             {isLogin ? 'Login' : 'Create Account'}
//           </button>
//         </form>

//         <p style={{ marginTop: '1.5rem', fontSize: '13px', textAlign: 'center', color: '#94a3b8' }}>
//           {isLogin ? "Don't have an account? " : "Already have an account? "}
//           <span 
//             onClick={() => setIsLogin(!isLogin)} 
//             style={{ color: '#60a5fa', cursor: 'pointer', textDecoration: 'underline' }}
//           >
//             {isLogin ? 'Register' : 'Login'}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };


import React, { useState } from 'react';

export const Auth = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const endpoint = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.success) {
        onLoginSuccess(data.user);
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Server connection error. Please try again.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '70vh'
    }}>
      <div style={{
        backgroundColor: '#131b2e',
        background: 'linear-gradient(145deg, #182238 0%, #0e1526 100%)',
        padding: '2.5rem 2rem',
        borderRadius: '24px',
        width: '380px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        textAlign: 'center'
      }}>
        
        {/* Top Header Icon & Title */}
        <div style={{
          width: '54px',
          height: '54px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.2rem auto',
          fontSize: '24px',
          boxShadow: '0 8px 16px rgba(37, 99, 235, 0.3)'
        }}>
          {isLogin ? '🔐' : '🚀'}
        </div>

        <h2 style={{ margin: '0 0 0.4rem 0', fontSize: '22px', fontWeight: '700', color: '#ffffff' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p style={{ margin: '0 0 1.8rem 0', color: '#94a3b8', fontSize: '13px' }}>
          {isLogin ? 'Enter your credentials to access live stocks' : 'Sign up to start tracking real-time market data'}
        </p>

        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            padding: '10px',
            borderRadius: '10px',
            fontSize: '12px',
            marginBottom: '1.2rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                padding: '13px 16px',
                borderRadius: '12px',
                border: '1px solid #2d3a54',
                backgroundColor: '#0a0f1d',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{
              padding: '13px 16px',
              borderRadius: '12px',
              border: '1px solid #2d3a54',
              backgroundColor: '#0a0f1d',
              color: '#ffffff',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={{
              padding: '13px 16px',
              borderRadius: '12px',
              border: '1px solid #2d3a54',
              backgroundColor: '#0a0f1d',
              color: '#ffffff',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />

          <button
            type="submit"
            style={{
              padding: '14px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: '#ffffff',
              border: 'none',
              fontWeight: '600',
              fontSize: '15px',
              cursor: 'pointer',
              marginTop: '0.4rem',
              boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)'
            }}
          >
            {isLogin ? 'Sign In' : 'Get Started'}
          </button>
        </form>

        <p style={{ marginTop: '1.8rem', fontSize: '13px', color: '#64748b' }}>
          {isLogin ? "Don't have an account? " : "Already registered? "}
          <span 
            onClick={() => { setIsLogin(!isLogin); setError(''); }} 
            style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: '600' }}
          >
            {isLogin ? 'Register now' : 'Sign in'}
          </span>
        </p>
      </div>
    </div>
  );
};