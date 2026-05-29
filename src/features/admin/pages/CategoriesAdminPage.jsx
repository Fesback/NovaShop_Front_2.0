import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Edit, Trash2, Tags, X, AlertCircle } from 'lucide-react';
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

// Mock data adaptado a tu nuevo catálogo
const initialCategories = [
  { id: '1', name: 'Audio', description: 'Sound, refined.', status: 'active', productCount: 12 },
  { id: '2', name: 'Wearables', description: 'Time, well kept.', status: 'active', productCount: 8 },
  { id: '3', name: 'Lighting', description: 'Light with intent.', status: 'active', productCount: 5 },
  { id: '4', name: 'Furniture', description: 'Comfort by design.', status: 'inactive', productCount: 0 },
  { id: '5', name: 'Accessories', description: 'The finishing details.', status: 'active', productCount: 24 },
];

export function CategoriesAdminPage() {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState(initialCategories); // <-- Agregado setCategories

  // Estados para los Modales
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Estado del Formulario
  const [formData, setFormData] = useState({
    name: '', description: '', status: 'active'
  });

  // Filtrado en cliente
  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase()) ||
    cat.description.toLowerCase().includes(search.toLowerCase())
  );

  // Handlers para abrir modales
  const handleOpenCreate = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '', status: 'active' });
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      status: category.status,
    });
    setIsFormModalOpen(true);
  };

  const handleOpenDelete = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  // Acciones CRUD
  const handleSave = (e) => {
    e.preventDefault();
    if (editingCategory) {
      // Simular Update
      setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, ...formData } : c));
    } else {
      // Simular Create
      const newCategory = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        productCount: 0, // Inicia con 0 productos
      };
      setCategories([newCategory, ...categories]);
    }
    setIsFormModalOpen(false);
  };

  const confirmDelete = () => {
    setCategories(categories.filter(c => c.id !== categoryToDelete.id));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header del Módulo */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Categories</h1>
          <p className="text-muted-foreground mt-1">
            Manage your product categories and collections.
          </p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Create Category
        </Button>
      </div>

      {/* Barra de Búsqueda */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {filtered.length} categor{filtered.length !== 1 ? 'ies' : 'y'}
        </span>
      </div>

      {/* Tabla de Datos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border border-border rounded-xl overflow-hidden bg-card"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Products</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {category.id}
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {category.name}
                </TableCell>
                <TableCell className="text-muted-foreground truncate max-w-[250px]">
                  {category.description}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary" className="font-mono">
                    {category.productCount}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={category.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                    {category.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => handleOpenEdit(category)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={() => handleOpenDelete(category)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filtered.length === 0 && (
          <div className="p-12 text-center flex flex-col items-center">
            <Tags className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
            <h3 className="font-medium text-foreground mb-2">No categories found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search.</p>
          </div>
        )}
      </motion.div>

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
                <h2 className="text-xl font-semibold">{editingCategory ? 'Edit Category' : 'Create Category'}</h2>
                <button onClick={() => setIsFormModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <Input 
                  label="Category Name" 
                  required 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  placeholder="e.g. Smart Home" 
                />
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <textarea 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                    placeholder="Short description of this category..."
                    className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    rows={3} 
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsFormModalOpen(false)}>Cancel</Button>
                  <Button type="submit">{editingCategory ? 'Save Changes' : 'Create Category'}</Button>
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
              <h2 className="text-lg font-semibold mb-2">Delete Category</h2>
              <p className="text-muted-foreground mb-6">
                Are you sure you want to delete <span className="font-medium text-foreground">{categoryToDelete?.name}</span>? All products in this category will become uncategorized.
              </p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={confirmDelete}>Yes, delete category</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}