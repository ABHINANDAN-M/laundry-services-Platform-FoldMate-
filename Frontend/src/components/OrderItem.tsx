// import React from 'react';
// import { OrderItem as OrderItemType } from '../types/order';

// interface OrderItemProps {
//   item: OrderItemType;
// }

// const OrderItemComponent: React.FC<OrderItemProps> = ({ item }) => {
//   const { type, quantity, pricePerItem } = item;
//   const subtotal = quantity * pricePerItem;
  
//   return (
//     <div className="flex justify-between py-3 border-b border-gray-100 last:border-0">
//       <div className="flex items-center">
//         <span className="font-medium text-gray-800">{type}</span>
//         <span className="ml-2 text-sm text-gray-500">×{quantity}</span>
//       </div>
//       <div className="text-right">
//         <div className="font-medium text-gray-800">₹{subtotal}</div>
//         <div className="text-xs text-gray-500">₹{pricePerItem} each</div>
//       </div>
//     </div>
//   );
// };

// export default OrderItemComponent;




import { OrderItem } from '../types/order';

interface Props {
  item: OrderItem;
}

export default function OrderItemComponent({ item }: Props) {
  return (
    <div className="flex justify-between text-sm text-gray-700">
      <span>{item.name} x{item.quantity}</span>
      <span>₹{item.price * item.quantity}</span>
    </div>
  );
}
