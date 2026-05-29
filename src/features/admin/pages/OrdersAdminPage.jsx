import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Download, Eye, MoreHorizontal, Package,
  Truck, CheckCircle, Clock, XCircle,  X, Edit, ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { formatPrice } from '@/lib/utils';

// Mock Data extendida (similar al DTO que traerá tu API)
const initialOrders = [
  { id: 'ORD-001', customer: { name: 'John Smith', email: 'john@example.com' }, items: [{ name: 'Aero Wireless Headphones', qty: 1, price: 349.00 }], total: 349.00, status: 'ENTREGADO', payment: 'paid', date: '2024-01-15T10:30:00' },
  { id: 'ORD-002', customer: { name: 'Sarah Johnson', email: 'sarah@example.com' }, items: [{ name: 'Arc Desk Lamp', qty: 1, price: 159.00 }], total: 159.00, status: 'PROCESANDO', payment: 'paid', date: '2024-01-15T09:15:00' },
  { id: 'ORD-003', customer: { name: 'Mike Wilson', email: 'mike@example.com' }, items: [{ name: 'Meridian Watch', qty: 2, price: 289.00 }], total: 578.00, status: 'ENVIADO', payment: 'paid', date: '2024-01-14T16:45:00' },
  { id: 'ORD-004', customer: { name: 'Emily Brown', email: 'emily@example.com' }, items: [{ name: 'Terra Mug Set', qty: 1, price: 48.00 }], total: 48.00, status: 'PENDIENTE', payment: 'pending', date: '2024-01-14T14:20:00' },
];

const statusConfig = {
  PENDIENTE: { icon: Clock, color: 'secondary', label: 'Pendiente' },
  PROCESANDO: { icon: Package, color: 'outline', label: 'Procesando' },
  ENVIADO: { icon: Truck, color: 'default', label: 'Enviado' },
  ENTREGADO: { icon: CheckCircle, color: 'success', label: 'Entregado' },
  CANCELADO: { icon: XCircle, color: 'destructive', label: 'Cancelado' },
};


export function OrdersAdminPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [openMenu, setOpenMenu] = useState(null);

  // Estados del Modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  // Lógica espejo a tu Enum de Java
  const getAvailableTransitions = (estadoActual) => {
    switch (estadoActual) {
      case 'PENDIENTE': return ['PROCESANDO', 'CANCELADO'];
      case 'PROCESANDO': return ['ENVIADO'];
      case 'ENVIADO': return ['ENTREGADO'];
      default: return []; // ENTREGADO o CANCELADO
    }
  };

  const filtered = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setIsModalOpen(true);
    setOpenMenu(null);
  };

  const handleUpdateStatus = () => {
    if (newStatus === selectedOrder.status) return;
    
    // Simulamos la actualización
    setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status: newStatus } : o));
    setSelectedOrder({ ...selectedOrder, status: newStatus }); // Actualiza la vista en vivo
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-1">View and manage customer orders.</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="all">All Status</option>
          <option value="PENDIENTE">Pendiente</option>
          <option value="PROCESANDO">Procesando</option>
          <option value="ENVIADO">Enviado</option>
          <option value="ENTREGADO">Entregado</option>
          <option value="CANCELADO">Cancelado</option>
        </select>
        <span className="text-sm text-muted-foreground">{filtered.length} orders</span>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-border rounded-xl overflow-visible bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order) => {
              const StatusIcon = statusConfig[order.status].icon;
              return (
                <TableRow key={order.id}>
                  <TableCell><span className="font-mono text-sm font-medium text-foreground">{order.id}</span></TableCell>
                  <TableCell>
                    <p className="font-medium text-foreground">{order.customer.name}</p>
                    <p className="text-xs text-muted-foreground">{order.customer.email}</p>
                  </TableCell>
                  <TableCell><span className="font-medium text-foreground">{formatPrice(order.total)}</span></TableCell>
                  <TableCell>
                    <Badge variant={statusConfig[order.status].color} className="gap-1">
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig[order.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString('es-PE', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </TableCell>
                  <TableCell className="text-right relative">
                    <Button variant="ghost" size="icon" onClick={() => setOpenMenu(openMenu === order.id ? null : order.id)}>
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                    <AnimatePresence>
                      {openMenu === order.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className="absolute right-8 top-10 z-20 w-44 rounded-xl border border-border bg-card p-1.5 shadow-lg"
                          >
                            <button onClick={() => handleOpenModal(order)} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-foreground hover:bg-secondary">
                              <Eye className="w-4 h-4 text-muted-foreground" /> View / Update
                            </button>
                            <div className="my-1 h-px w-full bg-border" />
                            <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-foreground hover:bg-secondary">
                              <Download className="w-4 h-4 text-muted-foreground" /> Download Invoice
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </motion.div>

      {/* --- MODAL DETALLE DE ORDEN --- */}
      <AnimatePresence>
        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-xl">
              
              <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-accent" /> Order {selectedOrder.id}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">Placed on {new Date(selectedOrder.date).toLocaleString('es-PE')}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {/* Customer Info */}
                <div className="bg-secondary/40 p-4 rounded-xl border border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold">Customer Details</p>
                  <p className="font-medium text-foreground">{selectedOrder.customer.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer.email}</p>
                </div>

                {/* State Update logic */}
                <div className="bg-secondary/40 p-4 rounded-xl border border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold flex items-center gap-1">
                    <Edit className="w-3 h-3" /> Update Status
                  </p>
                  
                  {getAvailableTransitions(selectedOrder.status).length > 0 ? (
                    <div className="flex gap-2">
                      <select 
                        value={newStatus} 
                        onChange={(e) => setNewStatus(e.target.value)} 
                        className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm"
                      >
                        <option value={selectedOrder.status} disabled>Current: {selectedOrder.status}</option>
                        {getAvailableTransitions(selectedOrder.status).map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                      <Button size="sm" onClick={handleUpdateStatus} disabled={newStatus === selectedOrder.status}>Apply</Button>
                    </div>
                  ) : (
                    <Badge variant={statusConfig[selectedOrder.status].color} className="w-full justify-center py-1.5 opacity-80">
                      Final State: {selectedOrder.status} (Locked)
                    </Badge>
                  )}
                </div>
              </div>

              {/* Items List */}
              <h3 className="font-medium text-foreground mb-3">Order Items</h3>
              <div className="border border-border rounded-lg overflow-hidden mb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-center">Qty</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="text-center">{item.qty}</TableCell>
                        <TableCell className="text-right">{formatPrice(item.price)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Total Footer */}
              <div className="flex justify-between items-center bg-secondary/40 p-4 rounded-xl border border-border">
                <span className="font-medium text-muted-foreground">Grand Total</span>
                <span className="text-xl font-bold text-foreground">{formatPrice(selectedOrder.total)}</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}