
import { createContext, useContext, useState, useCallback, useRef } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const idRef = useRef(0);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const showNotification = useCallback((message, type = 'info') => {
    const id = ++idRef.current;
    console.log('[Notification]', id, message, type); // Debug
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto-dismiss
    setTimeout(() => {
      removeNotification(id);
    }, 3000);
  }, [removeNotification]);

  return (
    <NotificationContext.Provider value={{ notifications, showNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
