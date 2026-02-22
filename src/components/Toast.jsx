
import { useEffect, useState } from 'react';
import { useNotification } from '@/context/NotificationContext';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import clsx from 'clsx';

export default function ToastContainer() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed bottom-[88px] left-1/2 -translate-x-1/2 md:bottom-auto md:top-24 md:left-auto md:right-6 md:translate-x-0 z-[100] flex flex-col gap-2 w-full max-w-sm px-4 md:px-0 pointer-events-none">
      {notifications.map((notification) => (
        <ToastItem 
            key={notification.id} 
            notification={notification} 
            onDismiss={() => removeNotification(notification.id)} 
        />
      ))}
    </div>
  );
}

function ToastItem({ notification, onDismiss }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300); 
  };

  const icons = {
    success: <CheckCircle className="text-green-500 shrink-0" size={20} />,
    error: <XCircle className="text-red-500 shrink-0" size={20} />,
    info: <Info className="text-blue-500 shrink-0" size={20} />,
  };

  const borderColors = {
      success: 'border-l-green-500',
      error: 'border-l-red-500',
      info: 'border-l-blue-500'
  }

  return (
    <div
      className={clsx(
        "pointer-events-auto flex items-center gap-3 p-4 bg-white rounded-lg shadow-lg border border-slate-100 border-l-4 transition-all duration-300 transform",
        borderColors[notification.type] || borderColors.info,
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
      )}
      role="alert"
    >
      {icons[notification.type]}
      <p className="flex-1 text-sm font-medium text-slate-700">{notification.message}</p>
      <button onClick={handleDismiss} className="text-slate-400 hover:text-slate-600 transition-colors p-1 -mr-2">
        <X size={16} />
      </button>
    </div>
  );
}
