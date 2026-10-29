// import { OrderItem, OrderStatus } from '../../types/order';

// export const calculateTotal = (items: OrderItem[]): number => {
//   return items.reduce((total, item) => total + item.quantity * item.pricePerItem, 0);
// };

// export const formatDate = (dateString: string): string => {
//   const options: Intl.DateTimeFormatOptions = { 
//     year: 'numeric', 
//     month: 'long', 
//     day: 'numeric' 
//   };
//   return new Date(dateString).toLocaleDateString(undefined, options);
// };

// export const getStatusColor = (status: OrderStatus): string => {
//   switch (status) {
//     case 'Delivered':
//       return 'bg-green-100 text-green-800';
//     case 'In Progress':
//       return 'bg-blue-100 text-blue-800';
//     case 'Cancelled':
//       return 'bg-red-100 text-red-800';
//     default:
//       return 'bg-gray-100 text-gray-800';
//   }
// };




import { OrderItem, OrderStatus } from '../../types/order';

export function calculateTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function getStatusColor(status: OrderStatus): string {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-700';
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-700';
    case 'Pending':
      return 'bg-blue-100 text-blue-700';
    case 'Cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}
