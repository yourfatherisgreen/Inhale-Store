
import { useShop } from '@/context/ShopContext';
import { formatCurrency } from '@/utils';
import { Package } from 'lucide-react';

export default function OrderHistory() {
  const { history } = useShop();

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4 animate-fade-in">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
            <Package size={40} />
        </div>
        <h2 className="text-2xl font-bold text-text">No orders yet</h2>
        <p className="text-slate-500 max-w-xs mx-auto">Looks like you haven't placed any orders.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <h1 className="text-3xl font-bold">Order History</h1>
      <div className="space-y-4">
        {history.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between mb-4 pb-4 border-b border-slate-100 gap-4">
                <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Transaction ID</p>
                    <p className="font-mono text-sm font-bold">{order.id}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Date</p>
                    <p className="text-sm">{new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString()}</p>
                </div>
                <div>
                     <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Total</p>
                     <p className="text-lg font-bold text-primary">{formatCurrency(order.total)}</p>
                </div>
            </div>
            
            <div className="space-y-3">
                {order.items.map((item, idx) => (
                    <div key={`${order.id}-${idx}`} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                            <p className="text-xs text-slate-500">Size: {item.variant} • Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium">{formatCurrency(item.price)}</p>
                    </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
