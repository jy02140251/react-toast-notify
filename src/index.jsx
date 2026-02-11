import React, { useState, useCallback, useEffect } from 'react';

export const useToggle = (initial = false) => {
  const [state, setState] = useState(initial);
  const toggle = useCallback(() => setState(s => !s), []);
  return [state, toggle, setState];
};

export const useAsync = (asyncFn, deps = []) => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: null
  });

  useEffect(() => {
    let mounted = true;
    setState(s => ({ ...s, loading: true }));

    asyncFn()
      .then(data => mounted && setState({ loading: false, error: null, data }))
      .catch(error => mounted && setState({ loading: false, error, data: null }));

    return () => { mounted = false; };
  }, deps);

  return state;
};

export const Button = ({ children, onClick, variant = 'primary', disabled }) => {
  const styles = {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: variant === 'primary' ? '#007bff' : '#6c757d',
    color: 'white',
    opacity: disabled ? 0.6 : 1
  };

  return (
    <button style={styles} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', minWidth: '300px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ margin: 0 }}>{title}</h2>
          <button onClick={onClose}>X</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default { useToggle, useAsync, Button, Modal };