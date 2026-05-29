import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Download, MoreHorizontal, User, Users, Plus, Edit, Trash2, X, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { formatPrice } from '@/lib/utils';

const initialCustomers = [
  { id: '1', name: 'John Smith', email: 'john@example.com', orders: 12, spent: 2499.99, status: 'active', joined: '2023-06-15', role: 'user' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', orders: 8, spent: 1299.99, status: 'active', joined: '2023-08-22', role: 'user' },
  { id: '3', name: 'Mike Wilson', email: 'mike@example.com', orders: 5, spent: 899.99, status: 'active', joined: '2023-10-01', role: 'user' },
  { id: '4', name: 'Emily Brown', email: 'emily@example.com', orders: 3, spent: 349.99, status: 'inactive', joined: '2023-11-15', role: 'user' },
  { id: '5', name: 'Admin Prueba', email: 'admin@novashop.com', orders: 0, spent: 0, status: 'active', joined: '2023-01-01', role: 'admin' },
];

const statusColors = {
  active: 'success', 
  inactive: 'secondary',
  new: 'outline',
};

export function CustomersAdminPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState('');
  const [openMenu, setOpenMenu] = useState(null);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const [formData, setFormData] = useState({ name: '', email: '', role: 'user', status: 'active' });

  const filtered = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenCreate = () => {
    setEditingCustomer(null);
    setFormData({ name: '', email: '', role: 'user', status: 'active' });
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({ name: customer.name, email: customer.email, role: customer.role, status: customer.status });
    setIsFormModalOpen(true);
    setOpenMenu(null);
  };

  const handleOpenDelete = (customer) => {
    setCustomerToDelete(customer);
    setIsDeleteModalOpen(true);
    setOpenMenu(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...c, ...formData } : c));
    } else {
      const newCustomer = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        orders: 0,
        spent: 0,
        joined: new Date().toISOString().split('T')[0]
      };
      setCustomers([newCustomer, ...customers]);
    }
    setIsFormModalOpen(false);
  };

  const confirmDelete = () => {
    setCustomers(customers.filter(c => c.id !== customerToDelete.id));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Customers</h1>
          <p className="text-muted-foreground mt-1">View and manage your customer base.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
          <Button onClick={handleOpenCreate}><Plus className="w-4 h-4 mr-2" /> Add Customer</Button>
        </div>
      </div>

      {/* Stats (Mantenemos tus stats intactos porque se ven geniales) */}
      <div className="grid gap-4 sm:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Customers</p>
              <p className="text-2xl font-bold text-foreground">{customers.length}</p>
            </div>
          </div>
        </motion.div>
        {/* ... (El resto de tus stats se mantienen igual) ... */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Customers</p>
              <p className="text-2xl font-bold text-foreground">{customers.filter((c) => c.status === 'active').length}</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Admin Users</p>
              <p className="text-2xl font-bold text-foreground">{customers.filter((c) => c.role === 'admin').length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search & Table */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <span className="text-sm text-muted-foreground">{filtered.length} customer{filtered.length !== 1 && 's'}</span>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-border rounded-xl overflow-visible bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-foreground">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{customer.name}</p>
                      <p className="text-xs text-muted-foreground">{customer.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`uppercase text-[10px] ${customer.role === 'admin' ? 'bg-accent/10 text-accent border-accent/20' : ''}`}>
                    {customer.role}
                  </Badge>
                </TableCell>
                <TableCell><span className="text-foreground">{customer.orders}</span></TableCell>
                <TableCell><span className="font-medium text-foreground">{formatPrice(customer.spent)}</span></TableCell>
                <TableCell>
                  <Badge variant={statusColors[customer.status]} className="capitalize">{customer.status}</Badge>
                </TableCell>
                <TableCell className="text-right relative">
                  <Button variant="ghost" size="icon" onClick={() => setOpenMenu(openMenu === customer.id ? null : customer.id)}>
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                  <AnimatePresence>
                    {openMenu === customer.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          className="absolute right-8 top-10 z-20 w-36 rounded-xl border border-border bg-card p-1.5 shadow-lg"
                        >
                          <button onClick={() => handleOpenEdit(customer)} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-foreground hover:bg-secondary">
                            <Edit className="w-4 h-4 text-muted-foreground" /> Edit Profile
                          </button>
                          <div className="my-1 h-px w-full bg-border" />
                          <button onClick={() => handleOpenDelete(customer)} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-destructive hover:bg-destructive/10">
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      {/* --- MODAL CREAR / EDITAR --- */}
      <AnimatePresence>
        {isFormModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsFormModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">{editingCustomer ? 'Edit Customer' : 'Add New Customer'}</h2>
                <button onClick={() => setIsFormModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <Input label="Full Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
                <Input label="Email Address" type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Role</label>
                    <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm">
                      <option value="user">User</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Status</label>
                    <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsFormModalOpen(false)}>Cancel</Button>
                  <Button type="submit">{editingCustomer ? 'Save Changes' : 'Add Customer'}</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL ELIMINAR --- */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Delete Customer</h2>
              <p className="text-muted-foreground mb-6">Are you sure you want to delete <span className="font-medium text-foreground">{customerToDelete?.name}</span>? This action cannot be undone.</p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={confirmDelete}>Yes, delete</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}