// import React, { useState } from 'react';
// import { Edit3, Trash2, Plus, Search, Camera, Save, X } from 'lucide-react';
// import { Service } from './Types/Servicee';

// interface ServiceListProps {
//   services: Service[];
//   onEdit: (id: string, updates: Partial<Service>) => void;
//   onDelete: (id: string) => void;
//   onAddNew: () => void;
// }

// const categories = [
//   { value: 'Shirt', label: 'Shirt', icon: '👔' },
//   { value: 'Pant', label: 'Pant', icon: '👖' },
//   { value: 'Bedsheet', label: 'Bedsheet', icon: '🛏️' },
//   { value: 'Curtain', label: 'Curtain', icon: '🪟' },
// ];

// const serviceTypes = [
//   { value: 'wash', label: 'wash', icon: '🧼' },
//   { value: 'dryclean', label: 'dry Clean', icon: '🧽' },
//   { value: 'iron', label: 'iron', icon: '🔥' },
// ];

// export default function ServiceList({ services, onEdit, onDelete, onAddNew }: ServiceListProps) {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editForm, setEditForm] = useState<Partial<Service>>({});
//   const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

//   const filteredServices = services.filter(service =>
//     (service.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (service.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (service.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (service.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (service.serviceType || '').toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleEdit = (service: Service) => {
//     setEditingId(service.id);
//     setEditForm(service);
//   };

//   const handleSave = () => {
//     if (
//       editingId &&
//       editForm.title &&
//       editForm.name &&
//       editForm.category &&
//       editForm.serviceType &&
//       editForm.price &&
//       editForm.description
//     ) {
//       onEdit(editingId, {
//         ...editForm,
//         updatedAt: new Date().toISOString()
//       });
//       setEditingId(null);
//       setEditForm({});
//     }
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     setEditForm({});
//   };

//   const handleDelete = (id: string) => {
//     onDelete(id);
//     setDeleteConfirm(null);
//   };

//   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setEditForm(prev => ({ ...prev, photo: reader.result as string }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const getCategoryLabel = (value: string) => {
//     const category = categories.find(cat => cat.value === value);
//     return category ? `${category.icon} ${category.label}` : value;
//   };

//   const getServiceTypeLabel = (value: string) => {
//     const type = serviceTypes.find(type => type.value === value);
//     return type ? `${type.icon} ${type.label}` : value;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Washerman Services</h1>
//             <p className="text-gray-600 mt-2">Manage your washing services</p>
//           </div>
//           <button
//             onClick={onAddNew}
//             className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 flex items-center gap-2 transform hover:scale-105"
//           >
//             <Plus className="w-5 h-5" />
//             Add New Service
//           </button>
//         </div>

//         {/* Search */}
//         <div className="mb-8">
//           <div className="relative max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search services..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//             />
//           </div>
//         </div>

//         {/* Services Grid */}
//         {filteredServices.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Camera className="w-12 h-12 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               {services.length === 0 ? 'No Services Yet' : 'No Services Found'}
//             </h3>
//             <p className="text-gray-600 mb-6">
//               {services.length === 0 
//                 ? 'Start by adding your first washing service' 
//                 : 'Try adjusting your search terms'
//               }
//             </p>
//             {services.length === 0 && (
//               <button
//                 onClick={onAddNew}
//                 className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 flex items-center gap-2 mx-auto transform hover:scale-105"
//               >
//                 <Plus className="w-5 h-5" />
//                 Add Your First Service
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredServices.map((service) => (
//               <div
//                 key={service.id}
//                 className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
//               >
//                 {editingId === service.id ? (
//                   // Edit Mode
//                   <div className="p-6 space-y-4">
//                     <div className="relative">
//                       <input
//                         type="file"
//                         id={`photo-${service.id}`}
//                         accept="image/*"
//                         onChange={handlePhotoChange}
//                         className="hidden"
//                       />
//                       <label
//                         htmlFor={`photo-${service.id}`}
//                         className="block cursor-pointer"
//                       >
//                         {editForm.photo ? (
//                           <div className="relative h-48 w-full">
//                             <img
//                               src={editForm.photo}
//                               alt="Service"
//                               className="w-full h-48 object-cover rounded-xl"
//                             />
//                             <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-200">
//                               <Camera className="w-8 h-8 text-white" />
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="h-48 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors duration-200">
//                             <Camera className="w-8 h-8 text-gray-400" />
//                           </div>
//                         )}
//                       </label>
//                     </div>
                    
//                     <input
//                       type="text"
//                       value={editForm.title || ''}
//                       onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold"
//                       placeholder="Service title"
//                     />
                    
//                     <input
//                       type="text"
//                       value={editForm.name || ''}
//                       onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Service name"
//                     />

//                     <div className="grid grid-cols-2 gap-2">
//                       <select
//                         value={editForm.category || ''}
//                         onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                       >
//                         <option value="">Category</option>
//                         {categories.map((category) => (
//                           <option key={category.value} value={category.value}>
//                             {category.icon} {category.label}
//                           </option>
//                         ))}
//                       </select>

//                       <select
//                         value={editForm.serviceType || ''}
//                         onChange={(e) => setEditForm(prev => ({ ...prev, serviceType: e.target.value }))}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                       >
//                         <option value="">Service Type</option>
//                         {serviceTypes.map((type) => (
//                           <option key={type.value} value={type.value}>
//                             {type.icon} {type.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <input
//                       type="number"
//                       value={editForm.price || ''}
//                       onChange={(e) => setEditForm(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Price (₹)"
//                       min="0"
//                       step="0.01"
//                     />
                    
//                     <textarea
//                       value={editForm.description || ''}
//                       onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
//                       rows={3}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                       placeholder="Service description"
//                     />
                    
//                     <div className="flex gap-2">
//                       <button
//                         onClick={handleSave}
//                         className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
//                       >
//                         <Save className="w-4 h-4" />
//                         Save
//                       </button>
//                       <button
//                         onClick={handleCancel}
//                         className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center gap-2"
//                       >
//                         <X className="w-4 h-4" />
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   // View Mode
//                   <>
//                     {service.photo && (
//                       <div className="h-48 overflow-hidden">
//                         <img
//                           src={service.photo}
//                           alt={service.title}
//                           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                         />
//                       </div>
//                     )}
//                     <div className="p-6">
//                       <div className="flex items-start justify-between mb-2">
//                         <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
//                         <span className="bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded-full">
//                           ₹{service.price}
//                         </span>
//                       </div>
                      
//                       <p className="text-gray-700 font-medium mb-2">{service.name}</p>
                      
//                       <div className="flex gap-2 mb-3">
//                         <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
//                           {getCategoryLabel(service.category)}
//                         </span>
//                         <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
//                           {getServiceTypeLabel(service.serviceType)}
//                         </span>
//                       </div>
                      
//                       <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                      
//                       <div className="text-xs text-gray-400 mb-4">
//                         <p>Created: {new Date(service.createdAt).toLocaleDateString()}</p>
//                         {service.updatedAt !== service.createdAt && (
//                           <p>Updated: {new Date(service.updatedAt).toLocaleDateString()}</p>
//                         )}
//                       </div>
                      
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleEdit(service)}
//                           className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
//                         >
//                           <Edit3 className="w-4 h-4" />
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => setDeleteConfirm(service.id)}
//                           className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Delete Confirmation Modal */}
//         {deleteConfirm && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 transform scale-100 transition-transform duration-200">
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Trash2 className="w-8 h-8 text-red-600" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Service</h3>
//                 <p className="text-gray-600 mb-6">
//                   Are you sure you want to delete this service? This action cannot be undone.
//                 </p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setDeleteConfirm(null)}
//                     className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-xl hover:bg-gray-700 transition-colors duration-200"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => handleDelete(deleteConfirm)}
//                     className="flex-1 bg-red-600 text-white py-3 px-4 rounded-xl hover:bg-red-700 transition-colors duration-200"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }








import React, { useState,useEffect } from 'react';
import { Edit3, Trash2, Plus, Search, Camera, Save, X } from 'lucide-react';
import { Service } from './Types/Servicee';

interface ServiceListProps {
  services: Service[];
  onEdit: (_id: string, updates: Partial<Service>) => void;
  onDelete: (_id: string) => void;
  onAddNew: () => void;
}

const categories = [
  { value: 'Shirt', label: 'Shirt', icon: '👔' },
  { value: 'Pant', label: 'Pant', icon: '👖' },
  { value: 'Bedsheet', label: 'Bedsheet', icon: '🛏️' },
  { value: 'Curtain', label: 'Curtain', icon: '🪟' },
];

const serviceTypes = [
  { value: 'wash', label: 'wash', icon: '🧼' },
  { value: 'dry clean', label: 'dry Clean', icon: '🧽' },
  { value: 'iron', label: 'iron', icon: '🔥' },
];

export default function ServiceList({ services: initialServices, onEdit, onDelete, onAddNew }: ServiceListProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Service>>({});
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filteredServices = services.filter(service =>
    (service.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (service.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (service.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (service.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (service.serviceType || '').toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
  const fetchWashermanServices = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/product/my-products', {
        
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const role = localStorage.getItem('role');

if (role === 'washerman') {
  // show only washerman's services (already filtered)
} else if (role === 'customer') {
  // show all services (use /api/product)
}




      const data = await response.json();
      if (response.ok) {
        setServices(data); // or whatever state you're using
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  fetchWashermanServices();
}, []);


  const handleEdit = (service: Service) => {
    setEditingId(service._id);
    setEditForm({ ...service });
    setError(null);
  };

  const handleSave = async () => {
    try {
      if (!editingId) throw new Error('No service selected for editing');
      
      const requiredFields = ['title', 'name', 'category', 'serviceType', 'price', 'description'];
      const missingFields = requiredFields.filter(field => !editForm[field as keyof Service]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found');

      const response = await fetch(`/api/product/${editingId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update service');
      }

      const updatedService = await response.json();
      onEdit(editingId, updatedService);
      setEditingId(null);
      setEditForm({});
      setError(null);
    } catch (err) {
      console.error('Update error:', err);
      setError(err instanceof Error ? err.message : 'Failed to update service');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
    setError(null);
  };
const handleDelete = async (id: string) => {
  try {
    const password = prompt('Please confirm your password to delete the service');
    if (!password) return;

    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication token not found');

    const response = await fetch(`/api/product/${id}`, {
      method: 'DELETE', // Using POST instead of DELETE
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete service');
    }

    setDeleteConfirm(null);
    onDelete(id);
    setError(null);
  } catch (err) {
    console.error('Delete error:', err);
    setError(err instanceof Error ? err.message : 'Failed to delete service');
    setDeleteConfirm(null);
  }
};


  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getCategoryLabel = (value: string) => {
    const category = categories.find(cat => cat.value === value);
    return category ? `${category.icon} ${category.label}` : value;
  };

  const getServiceTypeLabel = (value: string) => {
    const type = serviceTypes.find(type => type.value === value);
    return type ? `${type.icon} ${type.label}` : value;
  };

  const resolveImageSrc = (image?: string) => {
    if (!image) return '';
    return image.startsWith('http') ? image : `http://localhost:5000/${image}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Washerman Services</h1>
            <p className="text-gray-600 mt-2">Manage your washing services</p>
          </div>
          <button
            onClick={onAddNew}
            className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 flex items-center gap-2 transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Add New Service
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {services.length === 0 ? 'No Services Yet' : 'No Services Found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {services.length === 0 
                ? 'Start by adding your first washing service' 
                : 'Try adjusting your search terms'
              }
            </p>
            {services.length === 0 && (
              <button
                onClick={onAddNew}
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 flex items-center gap-2 mx-auto transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                Add Your First Service
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                {editingId === service._id ? (
                  // Edit Mode
                  <div className="p-6 space-y-4">
                    <div className="relative">
                      <input
                        type="file"
                        id={`photo-${service._id}`}
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                      <label
                        htmlFor={`image-${service._id}`}
                        className="block cursor-pointer"
                      >
                        {editForm.image ? (
                          <div className="relative h-48 w-full">
                            <img
                              src={resolveImageSrc(editForm.image)}
                              alt="Service"
                              className="w-full h-48 object-cover rounded-xl"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-200">
                              <Camera className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="h-48 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors duration-200">
                            <Camera className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </label>
                    </div>
                    
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold"
                      placeholder="Service title"
                    />
                    
                    <input
                      type="text"
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Service name"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={editForm.category || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="">Category</option>
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.icon} {category.label}
                          </option>
                        ))}
                      </select>

                      <select
                        value={editForm.serviceType || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, serviceType: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="">Service Type</option>
                        {serviceTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.icon} {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="number"
                      value={editForm.price || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Price (₹)"
                      min="0"
                      step="0.01"
                    />
                    
                    <textarea
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Service description"
                    />
                    
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    {(service.image) && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={resolveImageSrc(service.image)}
                          alt={service.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                        <span className="bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded-full">
                          ₹{service.price}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 font-medium mb-2">{service.name}</p>
                      
                      <div className="flex gap-2 mb-3">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                          {getCategoryLabel(service.category)}
                        </span>
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                          {getServiceTypeLabel(service.serviceType)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                      
                      <div className="text-xs text-gray-400 mb-4">
                        <p>Created: {new Date(service.createdAt).toLocaleDateString()}</p>
                        {service.updatedAt !== service.createdAt && (
                          <p>Updated: {new Date(service.updatedAt).toLocaleDateString()}</p>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(service._id)}
                          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 transform scale-100 transition-transform duration-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Service</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this service? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-xl hover:bg-gray-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm!)}
                    className="flex-1 bg-red-600 text-white py-3 px-4 rounded-xl hover:bg-red-700 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}







// import React, { useState } from 'react';
// import { Camera, Plus, ArrowLeft, Tag, Shirt } from 'lucide-react';
// import { Service } from './Types/Servicee';

// interface ServiceFormProps {
//   onSubmit: (service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => void;
//   onBack: () => void;
// }

// const categories = [
//   { value: 'Shirt', label: 'Shirt', icon: '👔' },
//   { value: 'Pant', label: 'Pant', icon: '👖' },
//   { value: 'Bedsheet', label: 'Bedsheet', icon: '🛏️' },
//   { value: 'Curtain', label: 'Curtain', icon: '🪟' },
// ];

// const serviceTypes = [
//   { value: 'wash', label: 'wash', icon: '🧼' },
//   { value: 'dryclean', label: 'dry Clean', icon: '🧽' },
//   { value: 'iron', label: 'iron', icon: '🔥' },
// ];

// export default function ServiceForm({ onSubmit, onBack }: ServiceFormProps) {
//   const [formData, setFormData] = useState({
//     title: '',
//     name: '',
//     category: '',
//     serviceType: '',
//     price: '',
//     description: '',
//   });

//   const [photo, setPhoto] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setPhoto(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (
//       !formData.title.trim() ||
//       !formData.name.trim() ||
//       !formData.category ||
//       !formData.serviceType ||
//       !formData.price ||
//       !formData.description.trim() ||
//       !photo
//     )
//       return alert('Please fill all required fields and upload a photo.');

//     try {
//       setIsSubmitting(true);

//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('User not logged in. Token missing.');
//       }

//       const data = new FormData();
//       Object.entries(formData).forEach(([key, value]) => data.append(key, value));
//       data.append('image', photo);

//       const res = await fetch('http://localhost:5000/api/product/create', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: data,
//       });

//       if (!res.ok) {
//         let msg = 'Upload failed';
//         try {
//           const error = await res.json();
//           msg = error.message || msg;
//         } catch {
//           const fallback = await res.text();
//           msg = fallback || msg;
//         }
//         throw new Error(msg);
//       }

//       alert('Service created successfully!');
//       setFormData({
//         title: '',
//         name: '',
//         category: '',
//         serviceType: '',
//         price: '',
//         description: '',
//       });
//       setPhoto(null);
//       setPreview(null);
      
//       // ✅ Removed invalid `photo: ''`
//       onSubmit({
//         ...formData,
//         price: parseFloat(formData.price),
//       });
//     } catch (err: any) {
//       console.error('Upload error:', err);
//       alert(err.message || 'Upload failed');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const isFormValid =
//     formData.title.trim() &&
//     formData.name.trim() &&
//     formData.category &&
//     formData.serviceType &&
//     formData.price &&
//     formData.description.trim() &&
//     photo;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-3xl mx-auto">
//           <div className="flex items-center gap-4 mb-8">
//             <button
//               onClick={onBack}
//               className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 group"
//             >
//               <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
//               Back to Services
//             </button>
//           </div>

//           <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//             <div className="bg-gradient-to-r from-blue-600 to-teal-600 px-8 py-6">
//               <h1 className="text-2xl font-bold text-white flex items-center gap-3">
//                 <Plus className="w-6 h-6" />
//                 Add New Service
//               </h1>
//               <p className="text-blue-100 mt-2">Fill in the details to add a new washing service</p>
//             </div>

//             <form onSubmit={handleSubmit} className="p-8 space-y-6">
//               {/* Title */}
//               <div className="space-y-2">
//                 <label htmlFor="title" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
//                   <Tag className="w-4 h-4" />
//                   Service Title *
//                 </label>
//                 <input
//                   type="text"
//                   id="title"
//                   value={formData.title}
//                   onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
//                   placeholder="e.g., Premium Shirt Washing Service"
//                   required
//                 />
//               </div>

//               {/* Name */}
//               <div className="space-y-2">
//                 <label htmlFor="name" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
//                   <Shirt className="w-4 h-4" />
//                   Service Name *
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   value={formData.name}
//                   onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
//                   placeholder="e.g., Express Wash & Fold"
//                   required
//                 />
//               </div>

//               {/* Category and Service Type */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label htmlFor="category" className="block text-sm font-semibold text-gray-700">Category *</label>
//                   <select
//                     id="category"
//                     value={formData.category}
//                     onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl"
//                     required
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((category) => (
//                       <option key={category.value} value={category.value}>
//                         {category.icon} {category.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700">Service Type *</label>
//                   <select
//                     id="serviceType"
//                     value={formData.serviceType}
//                     onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl"
//                     required
//                   >
//                     <option value="">Select Service Type</option>
//                     {serviceTypes.map((type) => (
//                       <option key={type.value} value={type.value}>
//                         {type.icon} {type.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Price */}
//               <div className="space-y-2">
//                 <label htmlFor="price" className="block text-sm font-semibold text-gray-700">Price (₹) *</label>
//                 <input
//                   type="number"
//                   id="price"
//                   value={formData.price}
//                   onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl"
//                   placeholder="Amount"
//                   required
//                 />
//               </div>

//               {/* Photo Upload */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
//                   <Camera className="w-4 h-4" /> Service Photo *
//                 </label>
//                 <div className="relative">
//                   <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} className="hidden" />
//                   <label
//                     htmlFor="photo"
//                     className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-colors duration-200 bg-gray-50 hover:bg-blue-50"
//                   >
//                     {preview ? (
//                       <div className="relative w-full h-full">
//                         <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
//                         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-200">
//                           <Camera className="w-8 h-8 text-white" />
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="text-center py-8">
//                         <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                         <p className="text-gray-600 font-medium">Click to upload a photo</p>
//                         <p className="text-gray-400 text-sm mt-1">PNG, JPG up to 10MB</p>
//                       </div>
//                     )}
//                   </label>
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="space-y-2">
//                 <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Service Description *</label>
//                 <textarea
//                   id="description"
//                   value={formData.description}
//                   onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//                   rows={4}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl"
//                   placeholder="Describe your service in detail..."
//                   required
//                 />
//               </div>

//               {/* Submit Button */}
//               <div className="pt-4">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting || !isFormValid}
//                   className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-teal-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
//                 >
//                   {isSubmitting ? (
//                     <div className="flex items-center justify-center gap-3">
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Adding Service...
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-center gap-3">
//                       <Plus className="w-5 h-5" />
//                       Add Service
//                     </div>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
