// import React from 'react';
// import { Order, OrderStatus } from '../types/order';
// import { calculateTotal, formatDate, getStatusColor } from './utills/orderUtills';
// import OrderItemComponent from './OrderItem';
// import { Package } from 'lucide-react';

// interface OrderCardProps {
//   order: Order;
// }

// const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
//   const { id, name, date, items, status, picture } = order;
//   const total = calculateTotal(items);
//   const formattedDate = formatDate(date);
  
//   return (
//     <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
//       <div className="flex flex-col md:flex-row">
//         {/* Order Image Section */}
//         <div className="w-full md:w-1/3 p-4 flex items-center justify-center bg-gray-50">
//           {picture ? (
//             <img
//               src={picture}
//               alt={`Order ${id}`}
//               className="w-full h-48 object-contain rounded-md"
//               onError={(e) => {
//                 const target = e.target as HTMLImageElement;
//                 target.src = 'https://images.pexels.com/photos/5217766/pexels-photo-5217766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
//               }}
//             />
//           ) : (
//             <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
//               <Package size={64} className="text-gray-400" />
//             </div>
//           )}
//         </div>
        
//         {/* Order Details Section */}
//         <div className="flex-1 p-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//             <div>
//               <h3 className="text-lg font-bold text-gray-800 mb-1">Order #{id}</h3>
//               {name && <p className="text-sm text-gray-600 mb-1">{name}</p>}
//               <p className="text-sm text-gray-500">{formattedDate}</p>
//             </div>
//             <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status as OrderStatus)} mt-2 sm:mt-0`}>
//               {status}
//             </div>
//           </div>
          
//           <div className="border-t border-gray-100 pt-4 mb-4">
//             <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Order Items</h4>
//             <div className="space-y-1">
//               {items.map((item: Order['items'][number], index: number) => (
//                 <OrderItemComponent key={index} item={item} />
//               ))}
//             </div>
//           </div>
          
//           <div className="flex justify-between items-center pt-4 border-t border-gray-200">
//             <span className="text-sm font-medium text-gray-600">Total Amount</span>
//             <span className="text-xl font-bold text-green-600">₹{total}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderCard;





// import React, { useEffect, useState } from 'react';
// import { Order, OrderStatus } from '../types/order';
// import { calculateTotal, formatDate, getStatusColor } from './utills/orderUtills';
// import OrderItemComponent from './OrderItem';
// import { Package } from 'lucide-react';

// interface OrderCardProps {
//   orderId: string;
// }

// const OrderCard: React.FC<OrderCardProps> = ({ orderId }) => {
//   const [order, setOrder] = useState<Order | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/order/${orderId}`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json',
//           },
//         });
//         const data = await res.json();
//         setOrder(data);
//       } catch (err) {
//         console.error('Error fetching order:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [orderId]);

//   if (loading) return <div>Loading order...</div>;
//   if (!order) return <div>Order not found.</div>;

//   const { id, name, date, items, status, picture } = order;
//   const total = calculateTotal(items);
//   const formattedDate = formatDate(date);

//   return (
//     <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
//       <div className="flex flex-col md:flex-row">
//         {/* Order Image Section */}
//         <div className="w-full md:w-1/3 p-4 flex items-center justify-center bg-gray-50">
//           {picture ? (
//             <img
//               src={picture}
//               alt={`Order ${id}`}
//               className="w-full h-48 object-contain rounded-md"
//               onError={(e) => {
//                 const target = e.target as HTMLImageElement;
//                 target.src = 'https://images.pexels.com/photos/5217766/pexels-photo-5217766.jpeg';
//               }}
//             />
//           ) : (
//             <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
//               <Package size={64} className="text-gray-400" />
//             </div>
//           )}
//         </div>

//         {/* Order Details Section */}
//         <div className="flex-1 p-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//             <div>
//               <h3 className="text-lg font-bold text-gray-800 mb-1">Order #{id}</h3>
//               {name && <p className="text-sm text-gray-600 mb-1">{name}</p>}
//               <p className="text-sm text-gray-500">{formattedDate}</p>
//             </div>
//             <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status as OrderStatus)} mt-2 sm:mt-0`}>
//               {status}
//             </div>
//           </div>

//           <div className="border-t border-gray-100 pt-4 mb-4">
//             <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Order Items</h4>
//             <div className="space-y-1">
//               {items.map((item: Order['items'][number], index: number) => (
//                 <OrderItemComponent key={index} item={item} />
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-between items-center pt-4 border-t border-gray-200">
//             <span className="text-sm font-medium text-gray-600">Total Amount</span>
//             <span className="text-xl font-bold text-green-600">₹{total}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderCard;




// OrderCard.tsx

// import React, { useEffect, useState } from 'react';
// import { Order, OrderStatus } from '../types/order';
// import { calculateTotal, formatDate, getStatusColor } from './utills/orderUtills';
// import OrderItemComponent from './OrderItem';
// import { Package } from 'lucide-react';

// interface OrderCardProps {
//   orderId: string;
// }

// const OrderCard: React.FC<OrderCardProps> = ({ orderId }) => {
//   const [order, setOrder] = useState<Order | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/order/${orderId}`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json',
//           },
//         });
//         const data = await res.json();
//         setOrder(data);
//       } catch (err) {
//         console.error('Error fetching order:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [orderId]);

//   if (loading) return <div>Loading order...</div>;
//   if (!order) return <div>Order not found.</div>;

//   const { id, name, date, items, status, picture } = order;
//   const total = calculateTotal(items);
//   const formattedDate = formatDate(date);

//   return (
//     <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
//       <div className="flex flex-col md:flex-row">
//         {/* Order Image Section */}
//         <div className="w-full md:w-1/3 p-4 flex items-center justify-center bg-gray-50">
//           {picture ? (
//             <img
//               src={picture}
//               alt={`Order ${id}`}
//               className="w-full h-48 object-contain rounded-md"
//               onError={(e) => {
//                 const target = e.target as HTMLImageElement;
//                 target.src = 'https://images.pexels.com/photos/5217766/pexels-photo-5217766.jpeg';
//               }}
//             />
//           ) : (
//             <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
//               <Package size={64} className="text-gray-400" />
//             </div>
//           )}
//         </div>

//         {/* Order Details Section */}
//         <div className="flex-1 p-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//             <div>
//               <h3 className="text-lg font-bold text-gray-800 mb-1">Order #{id}</h3>
//               {name && <p className="text-sm text-gray-600 mb-1">{name}</p>}
//               <p className="text-sm text-gray-500">{formattedDate}</p>
//             </div>
//             <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status as OrderStatus)} mt-2 sm:mt-0`}>
//               {status}
//             </div>
//           </div>

//           <div className="border-t border-gray-100 pt-4 mb-4">
//             <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Order Items</h4>
//             <div className="space-y-1">
//               {items.map((item: Order['items'][number], index: number) => (
//                 <OrderItemComponent key={index} item={item} />
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-between items-center pt-4 border-t border-gray-200">
//             <span className="text-sm font-medium text-gray-600">Total Amount</span>
//             <span className="text-xl font-bold text-green-600">₹{total}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderCard;



// import React from 'react';
// import { Order, OrderStatus } from '../types/order';
// import { calculateTotal, formatDate, getStatusColor } from './utills/orderUtills';
// import OrderItemComponent from './OrderItem';
// import { Package } from 'lucide-react';

// interface OrderCardProps {
//   order: Order;
// }

// const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
//   if (!order) return <div>Order not found.</div>;

//   const {
//     _id,
//     productId,
//     pickupDate,
//     pickupTimeSlot,
//     status,
//     totalAmount,
//     washerman,
//   } = order;
//   // const washermanId = washerman?._id || 'N/A';

//   const formattedDate = formatDate(pickupDate);
//   const total = totalAmount || 0;
//   const image = productId?.image || '';
//   const name = productId?.category || productId?.name || '';
//   const washermanName = washerman?.name || 'Unknown';

//   return (
//     <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
//       <div className="flex flex-col md:flex-row">
//         {/* Image */}
//         <div className="w-full md:w-1/3 p-4 flex items-center justify-center bg-gray-50">
//           {image ? (
//             <img
//               src={image}
//               alt={`Order ${_id}`}
//               className="w-full h-48 object-contain rounded-md"
//               onError={(e) => {
//                 const target = e.target as HTMLImageElement;
//                 target.src = 'https://images.pexels.com/photos/5217766/pexels-photo-5217766.jpeg';
//               }}
//             />
//           ) : (
//             <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
//               <Package size={64} className="text-gray-400" />
//             </div>
//           )}
//         </div>

//         {/* Details */}
//         <div className="flex-1 p-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//             <div>
//               <h3 className="text-lg font-bold text-gray-800 mb-1">Order #{_id}</h3>
//               <p className="text-sm text-gray-600 mb-1">{name}</p>
//               <p className="text-sm text-gray-500">
//                 {formattedDate} | Slot: {pickupTimeSlot || "N/A"}
//               </p>
//               <p className="text-sm text-gray-400">Washerman: {washermanName}</p>
//             </div>
//             <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status as OrderStatus)} mt-2 sm:mt-0`}>
//               {status}
//             </div>
//           </div>

//           {/* Items List - optional if available */}
//           {order.items && order.items.length > 0 && (
//             <div className="border-t border-gray-100 pt-4 mb-4">
//               <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Order Items</h4>
//               <div className="space-y-1">
//                 {order.items.map((item, index) => (
//                   <OrderItemComponent key={index} item={item} />
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="flex justify-between items-center pt-4 border-t border-gray-200">
//             <span className="text-sm font-medium text-gray-600">Total Amount</span>
//             <span className="text-xl font-bold text-green-600">₹{total}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderCard;


// import React from 'react';
// import { Order, OrderStatus } from '../types/order';
// import { calculateTotal, formatDate, getStatusColor } from './utills/orderUtills';
// import OrderItemComponent from './OrderItem';
// import { Package } from 'lucide-react';

// interface OrderCardProps {
//   order: Order;
// }

// const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
//   if (!order) return <div>Order not found.</div>;

//   const {
//     _id,
//     productId,
//     pickupDate,
//     pickupTimeSlot,
//     status,
//     totalAmount,
//     washerman,
//   } = order;

//   const formattedDate = formatDate(pickupDate);
//   const total = totalAmount || 0;
//   const image = productId?.image || '';
//   const name = productId?.category || productId?.name || '';
//   const washermanName = washerman?.name || 'Unknown';
//   const washermanId = washerman?._id || 'N/A';

//   return (
//     <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
//       <div className="flex flex-col md:flex-row">
//         {/* Image */}
//         <div className="w-full md:w-1/3 p-4 flex items-center justify-center bg-gray-50">
//           {image ? (
//             <img
//               src={image}
//               alt={`Order ${_id}`}
//               className="w-full h-48 object-contain rounded-md"
//               onError={(e) => {
//                 const target = e.target as HTMLImageElement;
//                 target.src = 'https://images.pexels.com/photos/5217766/pexels-photo-5217766.jpeg';
//               }}
//             />
//           ) : (
//             <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
//               <Package size={64} className="text-gray-400" />
//             </div>
//           )}
//         </div>

//         {/* Details */}
//         <div className="flex-1 p-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//             <div>
//               <h3 className="text-lg font-bold text-gray-800 mb-1">Order #{_id}</h3>
//               <p className="text-sm text-gray-600 mb-1">{name}</p>
//               <p className="text-sm text-gray-500">
//                 {formattedDate} | Slot: {pickupTimeSlot || "N/A"}
//               </p>
//               <p className="text-sm text-gray-400">Washerman: {washermanName}</p>
//               <p className="text-sm text-gray-400">Washerman ID: {washermanId}</p>
//             </div>
//             <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status as OrderStatus)} mt-2 sm:mt-0`}>
//               {status}
//             </div>
//           </div>

//           {/* Items List */}
//           {order.items && order.items.length > 0 && (
//             <div className="border-t border-gray-100 pt-4 mb-4">
//               <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Order Items</h4>
//               <div className="space-y-1">
//                 {order.items.map((item, index) => (
//                   <OrderItemComponent key={index} item={item} />
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="flex justify-between items-center pt-4 border-t border-gray-200">
//             <span className="text-sm font-medium text-gray-600">Total Amount</span>
//             <span className="text-xl font-bold text-green-600">₹{total}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderCard;














import React from 'react';
import { Order, OrderStatus } from '../types/order';
import { calculateTotal, formatDate, getStatusColor } from './utills/orderUtills';
import OrderItemComponent from './OrderItem';
import { Package } from 'lucide-react';

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  if (!order) return <div>Order not found.</div>;

  const {
    _id,
    productId,
    date,
    slot,
    quantity,
    totalAmount,
    status,
    paymentStatus,
    paymentMethod,
    washerman,
    guest,
    createdAt,
  } = order;

  const formattedDate = formatDate(date);
  const total = totalAmount || 0;
  const image = productId?.image || '';
  const name = productId?.category || productId?.name || 'Service';
  const washermanName = washerman?.name || 'Unknown';
  const washermanId = washerman?._id || 'N/A';
  const guestId = guest || 'N/A';

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="w-full md:w-1/3 p-4 flex items-center justify-center bg-gray-50">
          {image ? (
            <img
              src={image}
              alt={`Order ${_id}`}
              className="w-full h-48 object-contain rounded-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.pexels.com/photos/5217766/pexels-photo-5217766.jpeg';
              }}
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
              <Package size={64} className="text-gray-400" />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Order #{_id}</h3>
              <p className="text-sm text-gray-600 mb-1">{name}</p>
              <p className="text-sm text-gray-500 mb-1">
                {formattedDate || 'Invalid Date'} | Slot: {slot?.range || 'N/A'}
              </p>
              <p className="text-sm text-gray-500 mb-1">Quantity: {quantity}</p>
              <p className="text-sm text-gray-500 mb-1">Payment: ₹{total} via {paymentMethod || 'N/A'}</p>
              <p className="text-sm text-gray-500 mb-1">Payment Status: {paymentStatus}</p>
              <p className="text-sm text-gray-400">Washerman: {washermanName}</p>
              {/* <p className="text-sm text-gray-400">Washerman ID: {washermanId}</p> */}
              {/* <p className="text-sm text-gray-400">Customer ID: {guestId}</p> */}
              <p className="text-sm text-gray-400">Created At: {new Date(createdAt).toLocaleString()}</p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                status as OrderStatus
              )} mt-2 sm:mt-0`}
            >
              {status}
            </div>
          </div>

          {/* Order Items, if present */}
          {order.items && order.items.length > 0 && (
            <div className="border-t border-gray-100 pt-4 mb-4">
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Order Items</h4>
              <div className="space-y-1">
                {order.items.map((item, index) => (
                  <OrderItemComponent key={index} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-600">Total Amount</span>
            <span className="text-xl font-bold text-green-600">₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
