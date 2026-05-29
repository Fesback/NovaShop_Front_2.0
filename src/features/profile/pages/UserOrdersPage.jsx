import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, Clock, Truck, CheckCircle, XCircle, 
  Eye, X, ShoppingBag, Calendar 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { formatPrice } from '@/lib/utils';

// Mock de órdenes del cliente logueado
const customerOrders = [
  {
    id: 'ORD-001',
    date: '2026-05-10T14:30:00',
    status: 'ENTREGADO',
    total: 349.00,
    items: [{ id: 'P1', name: 'Aero Wireless Headphones', qty: 1, price: 349.00, image: '/products/headphones.png' }]
  },
  {
    id: 'ORD-004',
    date: '2026-05-25T09:15:00',
    status: 'PROCESANDO',
    total: 448.00,
    items: [
      { id: 'P2', name: 'Meridian Watch', qty: 1, price: 289.00, image: '/products/watch.png' },
      { id: 'P3', name: 'Arc Desk Lamp', qty: 1, price: 159.00, image: '/products/lamp.png' }
    ]
  },
  {
    id: 'ORD-009',
    date: '2026-05-28T18:00:00',
    status: 'PENDIENTE',
    total: 48.00,
    items: [{ id: 'P4', name: 'Terra Mug Set', qty: 1, price: 48.00, image: '/products/mugs.png' }]
  }
];

// Configuración estética de los estados del backend
const statusConfig = {
  PENDIENTE: { icon: Clock, text: 'Pending', color: 'secondary', step: 1 },
  PROCESANDO: { icon: Package, text: 'Processing', color: 'outline', step: 2 },
  ENVIADO: { icon: Truck, text: 'Shipped', color: 'default', step: 3 },
  ENTREGADO: { icon: CheckCircle, text: 'Delivered', color: 'success', step: 4 },
  CANCELADO: { icon: XCircle, text: 'Cancelled', color: 'destructive', step: 0 },
};

export function UserOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="border-b border-border pb-5">
        <h1 className="text-2xl font-semibold text-foreground">Order History</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Track your recent orders and view your purchase history.
        </p>
      </div>

      {/* Lista de Órdenes */}
      <div className="space-y-4">
        {customerOrders.map((order) => {
          const config = statusConfig[order.status];
          const StatusIcon = config.icon;

          return (
            <div 
              key={order.id}
              className="border border-border rounded-xl p-5 bg-card hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/50 rounded-xl flex items-center justify-center text-muted-foreground shrink-0 border border-border">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-sm font-semibold text-foreground">{order.id}</span>
                    <Badge variant={config.color} className="text-[11px] gap-1 px-2 py-0.5">
                      <StatusIcon className="w-3 h-3" />
                      {config.text}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(order.date).toLocaleDateString('es-PE', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-border">
                <div className="sm:text-right">
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                  <p className="text-base font-bold text-foreground">{formatPrice(order.total)}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          );
        })}

        {customerOrders.length === 0 && (
          <div className="p-12 text-center border border-dashed border-border rounded-2xl">
            <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
            <h3 className="font-medium text-foreground mb-1">No orders yet</h3>
            <p className="text-sm text-muted-foreground">When you purchase items, they will appear here.</p>
          </div>
        )}
      </div>

      {/* --- MODAL DETALLE DE COMPRA Y TRACKING --- */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedOrder(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-xl overflow-hidden"
            >
              {/* Header Modal */}
              <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
                <div>
                  <h2 className="text-lg font-semibold font-mono">Order Details #{selectedOrder.id}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Placed on {new Date(selectedOrder.date).toLocaleString('es-PE')}
                  </p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Línea de Tiempo de Seguimiento (Tracking Status Logic) */}
              {selectedOrder.status !== 'CANCELADO' && (
                <div className="mb-8 bg-secondary/30 p-5 rounded-xl border border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Delivery Status</p>
                  <div className="flex items-center justify-between relative w-full px-2">
                    {/* Línea gris de fondo */}
                    <div className="absolute top-[14px] left-4 right-4 h-0.5 bg-border -z-10" />
                    
                    {['PENDIENTE', 'PROCESANDO', 'ENVIADO', 'ENTREGADO'].map((state, index) => {
                      const currentStep = statusConfig[selectedOrder.status].step;
                      const stepIndex = index + 1;
                      const isCompleted = stepIndex <= currentStep;
                      const StepIcon = statusConfig[state].icon;

                      return (
                        <div key={state} className="flex flex-col items-center gap-1.5 z-10">
                          <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                            isCompleted 
                              ? 'bg-foreground text-background border-foreground shadow-sm' 
                              : 'bg-card text-muted-foreground border-border'
                          }`}>
                            <StepIcon className="w-4 h-4" />
                          </div>
                          <span className={`text-[10px] font-medium transition-colors ${
                            isCompleted ? 'text-foreground font-semibold' : 'text-muted-foreground'
                          }`}>
                            {statusConfig[state].text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Si está Cancelado */}
              {selectedOrder.status === 'CANCELADO' && (
                <div className="mb-6 bg-destructive/10 border border-destructive/20 p-4 rounded-xl flex items-center gap-3 text-destructive">
                  <XCircle className="w-5 h-5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">This order was cancelled</p>
                    <p className="text-xs opacity-80">This transaction is closed and cannot be modified.</p>
                  </div>
                </div>
              )}

              {/* Lista de Items */}
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Items Ordered</h3>
              <div className="border border-border rounded-xl overflow-hidden mb-6 max-h-[180px] overflow-y-auto bg-background/50">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-center">Qty</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                        <TableCell className="text-center text-muted-foreground">×{item.qty}</TableCell>
                        <TableCell className="text-right font-medium">{formatPrice(item.price)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Footer Totalizador */}
              <div className="flex justify-between items-center bg-secondary/40 p-4 rounded-xl border border-border">
                <span className="text-sm font-medium text-muted-foreground">Total Paid</span>
                <span className="text-xl font-bold text-foreground">{formatPrice(selectedOrder.total)}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}