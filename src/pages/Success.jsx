
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function Success() {
  const location = useLocation();
  const { trxId } = location.state || {}; // Destructure safely

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <CheckCircle size={48} />
      </div>
      <h1 className="text-3xl font-black mb-2 text-text">Payment Successful!</h1>
      <p className="text-slate-500 mb-8 max-w-md">
        Thank you for your purchase. Your order has been confirmed.
      </p>
      
      {trxId && (
          <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300 mb-8">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Transaction ID</p>
              <p className="font-mono text-lg font-bold text-text">{trxId}</p>
          </div>
      )}

      <div className="flex gap-4">
          <Link to="/" className="px-6 py-3 rounded-full border border-slate-200 font-bold hover:bg-slate-50 transition-colors">
              Back to Home
          </Link>
          <Link to="/order-history" className="px-6 py-3 rounded-full bg-text text-white font-bold hover:bg-slate-800 transition-colors shadow-lg">
              View Order History
          </Link>
      </div>
    </div>
  );
}
