



import React, { useState } from 'react';
import { Service, ServiceOption } from '../types';
import { Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onAddToCart: (service: Service, quantity: number, selectedOptions: string[]) => void;
}

export default function ServiceCard({ service, onAddToCart }: ServiceCardProps) {
  const [quantity, setQuantity] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(0, quantity + delta);
    setQuantity(newQuantity);
    
    if (newQuantity === 0) {
      setSelectedOptions([]);
    }
  };

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const calculateTotalPrice = () => {
    const optionsPrice = selectedOptions.reduce((total, optionId) => {
      const option = service.options?.find(opt => opt._id === optionId);
      return total + (option?.price || 0);
    }, 0);
    return optionsPrice * quantity;
  };

  const handleAddToCartClick = () => {
    if (quantity > 0 && selectedOptions.length > 0) {
      onAddToCart(service, quantity, selectedOptions);
      setQuantity(0);
      setSelectedOptions([]);
      setShowOptions(false);
    }
  };

  const canAddToCart = quantity > 0 && selectedOptions.length > 0;
  const hasServices = service.options && service.options.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="w-full h-48 overflow-hidden rounded-t-lg">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 md:p-6">
        <div className="mb-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
          <p className="text-xs md:text-sm text-gray-600">Washerman: {service.washerman?.name}</p>
          <p className="text-xs md:text-sm text-gray-600">WashermanId: {service.washerman?._id}</p>
        </div>

        {hasServices && (
          <div className="mb-4">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="flex items-center justify-between w-full p-2 md:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-xs md:text-sm font-medium text-gray-700">
                {showOptions ? 'Hide Services' : 'Select Services *'}
              </span>
              {showOptions ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {showOptions && (
              <div className="mt-3 space-y-2">
                {service.options.map((option: ServiceOption) => (
                  <label key={option._id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(option._id)}
                      onChange={() => handleOptionToggle(option._id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1 flex justify-between">
                      <span className="text-xs md:text-sm text-gray-700">{option.name}</span>
                      <span className="text-xs md:text-sm font-medium text-blue-600">₹{option.price}</span>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {quantity > 0 && selectedOptions.length === 0 && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs text-red-600">Please select at least one service to continue</p>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity === 0}
              className="p-1.5 md:p-2 rounded-full border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <Minus className="w-3 h-3 md:w-4 md:h-4" />
            </button>
            <span className="text-base md:text-lg font-semibold w-6 md:w-8 text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="p-1.5 md:p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </div>

          {quantity > 0 && calculateTotalPrice() > 0 && (
            <div className="text-right">
              <p className="text-xs md:text-sm text-gray-600">Total</p>
              <p className="text-base md:text-lg font-bold text-blue-600">₹{calculateTotalPrice()}</p>
            </div>
          )}
        </div>

        {quantity > 0 && (
          <button
            onClick={handleAddToCartClick}
            disabled={!canAddToCart}
            className={`w-full mt-4 py-2 px-4 rounded-lg font-medium text-sm md:text-base transition-colors ${
              canAddToCart
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {!canAddToCart && selectedOptions.length === 0
              ? 'Select Services to Add to Cart'
              : 'Add to Cart'}
          </button>
        )}
      </div>
    </div>
  );
}








// import React, { useState } from 'react';
// import { Service, ServiceOption } from '../types';
// import { Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';

// interface ServiceCardProps {
//   service: Service;
//   onAddToCart: (service: Service, quantity: number, selectedOptions: string[]) => void;
// }

// export default function ServiceCard({ service, onAddToCart }: ServiceCardProps) {
//   const [quantity, setQuantity] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
//   const [showOptions, setShowOptions] = useState(false);

//   const handleQuantityChange = (delta: number) => {
//     const newQuantity = Math.max(0, quantity + delta);
//     setQuantity(newQuantity);
    
//     if (newQuantity === 0) {
//       setSelectedOptions([]);
//     }
//   };

//   const handleOptionToggle = (optionId: string) => {
//     setSelectedOptions(prev => 
//       prev.includes(optionId) 
//         ? prev.filter(id => id !== optionId)
//         : [...prev, optionId]
//     );
//   };

//   const calculateTotalPrice = () => {
//     const optionsPrice = selectedOptions.reduce((total, optionId) => {
//       const option = service.options?.find(opt => opt._id === optionId);
//       return total + (option?.price || 0);
//     }, 0);
//     return optionsPrice * quantity;
//   };

//   const handleAddToCart = () => {
//     if (quantity > 0 && selectedOptions.length > 0) {
//       onAddToCart(service, quantity, selectedOptions);
//       // Reset the form after adding to cart
//       setQuantity(0);
//       setSelectedOptions([]);
//       setShowOptions(false);
//     }
//   };

//   // Check if we can add to cart (quantity > 0 AND at least one service selected)
//   const canAddToCart = quantity > 0 && selectedOptions.length > 0;
//   const hasServices = service.options && service.options.length > 0;

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//       <div className="aspect-w-16 aspect-h-9">
//         <img
//           src={service.image}
//           alt={service.name}
//           className="w-full h-39 md:h-42 object-cover"
//         />
//       </div>
      
//       <div className="p-4 md:p-6">
//         <div className="mb-4">
//           <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
//           <p className="text-xs md:text-sm text-gray-600">Washerman: {service.washerman?.name}</p>
//            <p className="text-xs md:text-sm text-gray-600">WashermanId: {service.washerman?._id}</p>
//         </div>

//         {hasServices && (
//           <div className="mb-4">
//             <button
//               onClick={() => setShowOptions(!showOptions)}
//               className="flex items-center justify-between w-full p-2 md:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               <span className="text-xs md:text-sm font-medium text-gray-700">
//                 {showOptions ? 'Hide Services' : 'Select Services *'}
//               </span>
//               {showOptions ? (
//                 <ChevronUp className="w-4 h-4 text-gray-500" />
//               ) : (
//                 <ChevronDown className="w-4 h-4 text-gray-500" />
//               )}
//             </button>
            
//             {showOptions && (
//               <div className="mt-3 space-y-2">
//                 {service.options.map((option: ServiceOption) => (
//                   <label key={option._id} className="flex items-center space-x-3">
//                     <input
//                       type="checkbox"
//                       checked={selectedOptions.includes(option._id)}
//                       onChange={() => handleOptionToggle(option._id)}
//                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                     />
//                     <div className="flex-1 flex justify-between">
//                       <span className="text-xs md:text-sm text-gray-700">{option.name}</span>
//                       <span className="text-xs md:text-sm font-medium text-blue-600">₹{option.price}</span>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             )}
            
//             {/* Show warning if no services selected but quantity > 0 */}
//             {quantity > 0 && selectedOptions.length === 0 && (
//               <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-xs text-red-600">Please select at least one service to continue</p>
//               </div>
//             )}
//           </div>
//         )}

//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2 md:space-x-3">
//             <button
//               onClick={() => handleQuantityChange(-1)}
//               disabled={quantity === 0}
//               className="p-1.5 md:p-2 rounded-full border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//             >
//               <Minus className="w-3 h-3 md:w-4 md:h-4" />
//             </button>
//             <span className="text-base md:text-lg font-semibold w-6 md:w-8 text-center">{quantity}</span>
//             <button
//               onClick={() => handleQuantityChange(1)}
//               className="p-1.5 md:p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
//             >
//               <Plus className="w-3 h-3 md:w-4 md:h-4" />
//             </button>
//           </div>
          
//           {quantity > 0 && calculateTotalPrice() > 0 && (
//             <div className="text-right">
//               <p className="text-xs md:text-sm text-gray-600">Total</p>
//               <p className="text-base md:text-lg font-bold text-blue-600">₹{calculateTotalPrice()}</p>
//             </div>
//           )}
//         </div>

//         {quantity > 0 && (
//           <button
//             onClick={handleAddToCart}
//             disabled={!canAddToCart}
//             className={`w-full mt-4 py-2 px-4 rounded-lg font-medium text-sm md:text-base transition-colors ${
//               canAddToCart
//                 ? 'bg-blue-600 text-white hover:bg-blue-700'
//                 : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//             }`}
//           >
//             {!canAddToCart && selectedOptions.length === 0 
//               ? 'Select Services to Add to Cart'
//               : 'Add to Cart'
//             }
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }




// import React, { useState } from 'react';
// import { Service, ServiceOption } from '../types';
// import { Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';

// interface ServiceCardProps {
//   service: Service;
//   onAddToCart: (service: Service, quantity: number, selectedOptions: string[]) => void;
// }

// export default function ServiceCard({ service, onAddToCart }: ServiceCardProps) {
//   const [quantity, setQuantity] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
//   const [showOptions, setShowOptions] = useState(false);

//   const handleQuantityChange = (delta: number) => {
//     const newQuantity = Math.max(0, quantity + delta);
//     setQuantity(newQuantity);
//     if (newQuantity === 0) {
//       setSelectedOptions([]);
//     }
//   };

//   const handleOptionToggle = (optionId: string) => {
//     setSelectedOptions(prev =>
//       prev.includes(optionId)
//         ? prev.filter(id => id !== optionId)
//         : [...prev, optionId]
//     );
//   };

//   const calculateTotalPrice = () => {
//     const optionsPrice = selectedOptions.reduce((total, optionId) => {
//       const option = service.options?.find(opt => opt._id === optionId);
//       return total + (option?.price || 0);
//     }, 0);
//     return optionsPrice * quantity;
//   };

//   const handleAddToCart = () => {
//     if (canAddToCart) {
//       onAddToCart(service, quantity, selectedOptions);
//       setQuantity(0);
//       setSelectedOptions([]);
//       setShowOptions(false);
//     }
//   };

//   const canAddToCart = quantity > 0 && selectedOptions.length > 0;
//   const hasOptions = service.options && service.options.length > 0;

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//       <div className="aspect-w-16 aspect-h-9">
//         <img
//           src={service.image}
//           alt={service.name}
//           className="w-full h-39 md:h-42 object-cover"
//         />
//       </div>

//       <div className="p-4 md:p-6">
//         <div className="mb-4">
//           <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
//           <p className="text-xs md:text-sm text-gray-600">Washerman: {service.washerman?.name}</p>
//           <p className="text-xs md:text-sm text-gray-600">Washerman ID: {service.washerman?._id}</p>
//         </div>

//         {hasOptions && (
//           <div className="mb-4">
//             <button
//               onClick={() => setShowOptions(!showOptions)}
//               className="flex items-center justify-between w-full p-2 md:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               <span className="text-xs md:text-sm font-medium text-gray-700">
//                 {showOptions ? 'Hide Services' : 'Select Services *'}
//               </span>
//               {showOptions ? (
//                 <ChevronUp className="w-4 h-4 text-gray-500" />
//               ) : (
//                 <ChevronDown className="w-4 h-4 text-gray-500" />
//               )}
//             </button>

//             {showOptions && (
//               <div className="mt-3 space-y-2">
//                 {service.options.map((option: ServiceOption) => (
//                   <label key={option.id} className="flex items-center space-x-3">
//                     <input
//                       type="checkbox"
//                       checked={selectedOptions.includes(option.id)}
//                       onChange={() => handleOptionToggle(option.id)}
//                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                     />
//                     <div className="flex-1 flex justify-between">
//                       <span className="text-xs md:text-sm text-gray-700">{option.name}</span>
//                       <span className="text-xs md:text-sm font-medium text-blue-600">₹{option.price}</span>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             )}

//             {quantity > 0 && selectedOptions.length === 0 && (
//               <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-xs text-red-600">Please select at least one service to continue</p>
//               </div>
//             )}
//           </div>
//         )}

//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2 md:space-x-3">
//             <button
//               onClick={() => handleQuantityChange(-1)}
//               disabled={quantity === 0}
//               className="p-1.5 md:p-2 rounded-full border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//             >
//               <Minus className="w-3 h-3 md:w-4 md:h-4" />
//             </button>
//             <span className="text-base md:text-lg font-semibold w-6 md:w-8 text-center">{quantity}</span>
//             <button
//               onClick={() => handleQuantityChange(1)}
//               className="p-1.5 md:p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
//             >
//               <Plus className="w-3 h-3 md:w-4 md:h-4" />
//             </button>
//           </div>

//           {quantity > 0 && calculateTotalPrice() > 0 && (
//             <div className="text-right">
//               <p className="text-xs md:text-sm text-gray-600">Total</p>
//               <p className="text-base md:text-lg font-bold text-blue-600">₹{calculateTotalPrice()}</p>
//             </div>
//           )}
//         </div>

//         {quantity > 0 && (
//           <button
//             onClick={handleAddToCart}
//             disabled={!canAddToCart}
//             className={`w-full mt-4 py-2 px-4 rounded-lg font-medium text-sm md:text-base transition-colors ${
//               canAddToCart
//                 ? 'bg-blue-600 text-white hover:bg-blue-700'
//                 : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//             }`}
//           >
//             {!canAddToCart && selectedOptions.length === 0
//               ? 'Select Services to Add to Cart'
//               : 'Add to Cart'}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }












































































































// import React, { useEffect, useState } from 'react';
// import ServiceCard from './ServiceCard'; // Adjust path if needed
// import { Service } from '../types'; // Make sure the Service type is correctly structured
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// export default function ServiceList() {
//   const [services, setServices] = useState<Service[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Fetch all products when component mounts
//   useEffect(() => {
//     const fetchServices = async () => {
//       const token = localStorage.getItem('token');

//       if (!token) {
//         Swal.fire('Unauthorized', 'Please log in to continue', 'warning');
//         return navigate('/signin');
//       }

//       try {
//         const response = await fetch('http://localhost:5000/api/product', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch products');
//         }

//         const data = await response.json();
//         setServices(data.products); // Adjust if backend returns differently
//       } catch (error) {
//         console.error('Error:', error);
//         Swal.fire('Error', 'Failed to load products.', 'error');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServices();
//   }, [navigate]);

//   const handleAddToCart = (service: Service, quantity: number, selectedOptions: string[]) => {
//     console.log('Added to cart:', { service, quantity, selectedOptions });
//     // TODO: Add to cart logic or context state if needed
//   };

//   return (
//     <div className="p-4">
//       {loading ? (
//         <p className="text-center text-gray-600">Loading services...</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {services?.length > 0 ? (
//             services.map((service) => (
//               <ServiceCard key={service._id} service={service} onAddToCart={handleAddToCart} />
//             ))
//           ) : (
//             <p className="text-center col-span-full text-gray-600">No services found.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
