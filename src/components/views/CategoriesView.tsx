import React, { useState } from 'react';
import { Category, Product } from '../../types';
import { 
  Tag, 
  Plus, 
  Trash2, 
  Edit3, 
  FolderPlus, 
  ArrowUpDown, 
  Check, 
  X, 
  ExternalLink,
  Layers,
  AlertCircle
} from 'lucide-react';

interface CategoriesViewProps {
  categories: Category[];
  products: Product[];
  onAddCategory: (category: Omit<Category, 'id' | 'productCount'>) => void;
  onUpdateCategory: (id: string, updates: Partial<Category>) => void;
  onDeleteCategory: (id: string) => void;
  onSelectCategoryFilter?: (slug: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categories,
  products,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onSelectCategoryFilter,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
  });

  const maxCategories = 10;
  const isAtLimit = categories.length >= maxCategories;

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: '', slug: '' });
    setModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingId(cat.id);
    setFormData({ name: cat.name, slug: cat.slug });
    setModalOpen(true);
  };

  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setFormData({ name, slug });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingId) {
      onUpdateCategory(editingId, {
        name: formData.name.trim(),
        slug: formData.slug.trim() || formData.name.toLowerCase().replace(/\s+/g, '-'),
      });
    } else {
      onAddCategory({
        name: formData.name.trim(),
        slug: formData.slug.trim() || formData.name.toLowerCase().replace(/\s+/g, '-'),
        order: categories.length + 1,
      });
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Product Categories</h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {categories.length} / {maxCategories} Allowed
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Organize physical, digital, and service offerings so your Instagram visitors find what they need fast.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          disabled={isAtLimit}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
            isAtLimit
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 active:scale-95'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </button>
      </div>

      {/* Limit Notice Banner */}
      <div className="bg-gradient-to-r from-indigo-50/70 via-purple-50/40 to-slate-50 border border-indigo-100 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-bold text-sm">
            {categories.length}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Creator Tier Limits: Up to 10 Categories & 100 Products
            </p>
            <p className="text-xs text-slate-500">
              Direct checkout link: <code className="text-indigo-600 font-mono">autodm.com/@ankit/c/[category-slug]</code>
            </p>
          </div>
        </div>
        <span className="text-xs font-medium text-slate-500 hidden sm:inline-block">
          {maxCategories - categories.length} slots remaining
        </span>
      </div>

      {/* Categories Grid / Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            Live Storefront Collections
          </h2>
          <span className="text-xs text-slate-400">Drag & drop order synced</span>
        </div>

        <div className="divide-y divide-slate-100">
          {categories.map((category, index) => {
            const assignedProducts = products.filter((p) => p.categoryId === category.id);
            const totalRevenue = assignedProducts.reduce((sum, p) => sum + (p.revenue || 0), 0);

            return (
              <div
                key={category.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 font-semibold text-xs flex items-center justify-center border border-slate-200">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-semibold text-slate-900">{category.name}</h3>
                      <span className="px-2 py-0.5 text-xs font-mono bg-slate-100 text-slate-600 rounded-md">
                        /{category.slug}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                      <span>{assignedProducts.length} Products</span>
                      <span>•</span>
                      <span>Total Revenue: ${totalRevenue.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleOpenEdit(category)}
                    className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Edit Category"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteCategory(category.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg">
                {editingId ? 'Edit Category' : 'Create New Category'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Masterclasses & Courses"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Storefront Slug URL
                </label>
                <div className="flex items-center rounded-xl border border-slate-300 overflow-hidden text-sm bg-slate-50">
                  <span className="px-3 text-slate-400 font-mono text-xs">/c/</span>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full py-2.5 pr-3.5 bg-transparent font-mono text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-200"
                >
                  {editingId ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
