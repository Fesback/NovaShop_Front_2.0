import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';

// Mock de productos iniciales
const initialProducts = [
  { id: '1', slug: 'aero-wireless-headphones', name: 'Aero Wireless Headphones', short: 'Adaptive noise cancellation.', category: 'Audio', price: 349.00, status: 'Out of Stock', image: '/products/headphones.png', stock: 0 },
  { id: '2', slug: 'meridian-watch', name: 'Meridian Watch', short: 'Built around restraint.', category: 'Wearables', price: 289.00, status: 'Active', image: '/products/watch.png', stock: 15 },
  { id: '3', slug: 'arc-desk-lamp', name: 'Arc Desk Lamp', short: 'Focused, flicker-free light.', category: 'Lighting', price: 159.00, status: 'Active', image: '/products/lamp.png', stock: 24 },
];

export function ProductsAdminPage() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState(initialProducts);
  const [openDropdown, setOpenDropdown] = useState(null); // Controla qué menú de 3 puntos está abierto

  // Estados para los Modales
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [editingProduct, setEditingProduct] = useState(null); // null = Crear, objeto = Editar
  const [productToDelete, setProductToDelete] = useState(null);

  // Estado del Formulario
  const [formData, setFormData] = useState({
    name: '', category: '', price: '', stock: '', description: '', image: ''
  });

  // Filtrado
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handlers para abrir modales
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({ name: '', category: '', price: '', stock: '', description: '', image: '' });
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.short,
      image: product.image
    });
    setIsFormModalOpen(true);
    setOpenDropdown(null);
  };

  const handleOpenDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
    setOpenDropdown(null);
  };

  // Acciones CRUD (Simuladas por ahora)
  const handleSave = (e) => {
    e.preventDefault();
    if (editingProduct) {
      // Simular Update
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData, short: formData.description } : p));
    } else {
      // Simular Create
      const newProduct = {
        id: Math.random().toString(36).substr(2, 9),
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        ...formData,
        short: formData.description,
        status: formData.stock > 0 ? 'Active' : 'Out of Stock'
      };
      setProducts([newProduct, ...products]);
    }
    setIsFormModalOpen(false);
  };

  const confirmDelete = () => {
    setProducts(products.filter(p => p.id !== productToDelete.id));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage your product inventory and listings.
          </p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {filtered.length} product{filtered.length !== 1 && 's'}
        </span>
      </div>

      {/* Table */}
      <div className="border border-border rounded-xl overflow-visible bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="w-12 h-12 rounded-lg bg-secondary/50 overflow-hidden border border-border">
                    <img src={product.image || '/placeholder.svg'} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">{product.short}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{product.category}</Badge>
                </TableCell>
                <TableCell className="font-medium">
                  ${Number(product.price).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge variant={product.status === 'Active' ? 'success' : 'destructive'} className="capitalize">
                    {product.status}
                  </Badge>
                </TableCell>
                
                {/* Actions Dropdown */}
                <TableCell className="text-right relative">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-muted-foreground"
                    onClick={() => setOpenDropdown(openDropdown === product.id ? null : product.id)}
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {openDropdown === product.id && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setOpenDropdown(null)} 
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          className="absolute right-8 top-10 z-20 w-36 rounded-xl border border-border bg-card p-1.5 shadow-lg"
                        >
                          <Link to={`/product/${product.slug}`} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-foreground hover:bg-secondary">
                            <Eye className="w-4 h-4 text-muted-foreground" /> View
                          </Link>
                          <button onClick={() => handleOpenEdit(product)} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-foreground hover:bg-secondary">
                            <Edit className="w-4 h-4 text-muted-foreground" /> Edit
                          </button>
                          <div className="my-1 h-px w-full bg-border" />
                          <button onClick={() => handleOpenDelete(product)} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-destructive hover:bg-destructive/10">
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
      </div>

      {/* --- MODAL DE CREAR / EDITAR --- */}
      <AnimatePresence>
        {isFormModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsFormModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={() => setIsFormModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Product Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Minimalist Watch" />
                  <Input label="Category" required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} placeholder="e.g. Wearables" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Price (USD)" type="number" step="0.01" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="0.00" />
                  <Input label="Initial Stock" type="number" required value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} placeholder="0" />
                </div>
                <Input label="Image URL" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} placeholder="/products/image.png" />
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Short Description</label>
                  <textarea 
                    required 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                    className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    rows={3} 
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsFormModalOpen(false)}>Cancel</Button>
                  <Button type="submit">{editingProduct ? 'Save Changes' : 'Create Product'}</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL DE ELIMINAR --- */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsDeleteModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Delete Product</h2>
              <p className="text-muted-foreground mb-6">
                Are you sure you want to delete <span className="font-medium text-foreground">{productToDelete?.name}</span>? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={confirmDelete}>Yes, delete product</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}