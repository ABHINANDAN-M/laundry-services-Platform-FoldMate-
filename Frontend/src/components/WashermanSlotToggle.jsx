// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "tailwindcss/tailwind.css";

// const WashermanSlotToggle = () => {
//   const [slotTemplates, setSlotTemplates] = useState([]);
//   const [enabledSlots, setEnabledSlots] = useState({}); // { '2025-07-01': [range, range, ...] }

//   // ✅ Load admin slot templates
//   useEffect(() => {
//     const fetchAdminSlots = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await axios.get("http://localhost:5000/api/show/slot-templates", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setSlotTemplates(res.data);

//         // Load saved toggle data from localStorage
//         const saved = JSON.parse(localStorage.getItem("washermanEnabledSlots") || "{}");
//         setEnabledSlots(saved);
//       } catch (err) {
//         console.error("Failed to fetch admin slots", err);
//       }
//     };

//     fetchAdminSlots();
//   }, []);

//   // ✅ Toggle ON/OFF state
//   const handleToggle = (date, slot) => {
//     const current = enabledSlots[date] || [];

//     const updated = current.includes(slot.range)
//       ? current.filter((r) => r !== slot.range) // remove
//       : [...current, slot.range]; // add

//     const newState = {
//       ...enabledSlots,
//       [date]: updated,
//     };

//     setEnabledSlots(newState);
//     localStorage.setItem("washermanEnabledSlots", JSON.stringify(newState));
//   };

//   // ✅ Submit to backend
//   const saveSlotsToBackend = async (date) => {
//     const token = localStorage.getItem("token");

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/show/slots/washer",
//         {
//           date,
//           enabledSlots: (slotTemplates.find((d) => d.date === date)?.slots || [])
//             .filter((s) => enabledSlots[date]?.includes(s.range))
//             .map((s) => ({ label: s.label, range: s.range })),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Slots saved: " + response.data.message);
//     } catch (err) {
//       console.error("Failed to save slots", err);
//       alert("Failed to save slots");
//     }
//   };

//   return (
//     <div className="p-4 space-y-6">
//       <h2 className="text-2xl font-semibold">Washerman Slot Availability</h2>

//       {slotTemplates.map((template) => (
//         <div key={template.date} className="p-4 border rounded shadow">
//           <h3 className="text-lg font-medium mb-2">Date: {template.date}</h3>
//           <div className="grid grid-cols-2 gap-4">
//             {template.slots.map((slot) => {
//               const isEnabled = enabledSlots[template.date]?.includes(slot.range) || false;

//                 return (
//                 <div key={slot.range} className="flex items-center justify-between">
//                   <span>{slot.label} ({slot.range})</span>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={isEnabled}
//                     onChange={() => handleToggle(template.date, slot)}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 rounded-full transition-colors duration-200
//                     bg-gray-300 peer-checked:bg-green-500
//                     peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500
//                     dark:bg-gray-700
//                     peer-checked:after:translate-x-full peer-checked:after:border-white
//                     after:content-[''] after:absolute after:top-[2px] after:left-[2px]
//                     after:bg-white after:border-gray-300 after:border after:rounded-full
//                     after:h-5 after:w-5 after:transition-all"
//                   ></div>
//                   </label>
//                 </div>
//                 );
//             })}
//           </div>
//           <button
//             onClick={() => saveSlotsToBackend(template.date)}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Save for {template.date}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default WashermanSlotToggle;







// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { 
//   Calendar, 
//   Clock, 
//   Save, 
//   CheckCircle, 
//   AlertCircle, 
//   Loader2,
//   Settings,
//   Waves,
//   RefreshCw
// } from "lucide-react";

// const WashermanSlotToggle = () => {
//   const [slotTemplates, setSlotTemplates] = useState([]);
//   const [enabledSlots, setEnabledSlots] = useState({}); // { '2025-07-01': [range, range, ...] }
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [savingStates, setSavingStates] = useState({});
//   const [savedStates, setSavedStates] = useState({});

//   // ✅ Load admin slot templates
//   useEffect(() => {
//     const fetchAdminSlots = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const token = localStorage.getItem("token");

//         const res = await axios.get("http://localhost:5000/api/show/slot-templates", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setSlotTemplates(res.data);

//         // Load saved toggle data from localStorage
//         const saved = JSON.parse(localStorage.getItem("washermanEnabledSlots") || "{}");
//         setEnabledSlots(saved);
//       } catch (err) {
//         console.error("Failed to fetch admin slots", err);
//         setError("Failed to load slot templates. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdminSlots();
//   }, []);

//   // ✅ Toggle ON/OFF state
//   const handleToggle = (date, slot) => {
//     const current = enabledSlots[date] || [];

//     const updated = current.includes(slot.range)
//       ? current.filter((r) => r !== slot.range) // remove
//       : [...current, slot.range]; // add

//     const newState = {
//       ...enabledSlots,
//       [date]: updated,
//     };

//     setEnabledSlots(newState);
//     localStorage.setItem("washermanEnabledSlots", JSON.stringify(newState));
    
//     // Clear saved state when changes are made
//     setSavedStates(prev => ({ ...prev, [date]: false }));
//   };

//   // ✅ Submit to backend
//   const saveSlotsToBackend = async (date) => {
//     setSavingStates(prev => ({ ...prev, [date]: true }));
    
//     const token = localStorage.getItem("token");

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/show/slots/washer",
//         {
//           date,
//           enabledSlots: (slotTemplates.find((d) => d.date === date)?.slots || [])
//             .filter((s) => enabledSlots[date]?.includes(s.range))
//             .map((s) => ({ label: s.label, range: s.range })),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setSavedStates(prev => ({ ...prev, [date]: true }));
//       setTimeout(() => {
//         setSavedStates(prev => ({ ...prev, [date]: false }));
//       }, 3000);
//     } catch (err) {
//       console.error("Failed to save slots", err);
//       setError("Failed to save slots. Please try again.");
//     } finally {
//       setSavingStates(prev => ({ ...prev, [date]: false }));
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const getEnabledCount = (date) => {
//     return enabledSlots[date]?.length || 0;
//   };

//   const getTotalSlots = (date) => {
//     return slotTemplates.find(t => t.date === date)?.slots.length || 0;
//   };

//   const refreshData = () => {
//     window.location.reload();
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
//           <p className="text-gray-600 text-lg">Loading slot templates...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
//         <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-red-200">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
//           <p className="text-red-600 mb-4">{error}</p>
//           <button 
//             onClick={refreshData}
//             className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 mx-auto"
//           >
//             <RefreshCw className="w-4 h-4" />
//             <span>Try Again</span>
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-blue-100 rounded-xl">
//                 <Waves className="w-8 h-8 text-blue-600" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Washerman Slot Management</h1>
//                 <p className="text-gray-600 mt-1">Configure available time slots for washing services</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2 text-sm text-gray-500">
//               <Settings className="w-4 h-4" />
//               <span>Admin Panel</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid gap-8 lg:grid-cols-1 xl:grid-cols-2">
//           {slotTemplates.map((template) => {
//             const enabledCount = getEnabledCount(template.date);
//             const totalSlots = getTotalSlots(template.date);
//             const isSaving = savingStates[template.date];
//             const isSaved = savedStates[template.date];
            
//             return (
//               <div key={template.date} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
//                 {/* Card Header */}
//                 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <Calendar className="w-6 h-6" />
//                       <div>
//                         <h3 className="text-xl font-semibold">{formatDate(template.date)}</h3>
//                         <p className="text-blue-100 text-sm">{template.date}</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-2xl font-bold">{enabledCount}/{totalSlots}</div>
//                       <div className="text-blue-100 text-sm">Active Slots</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Progress Bar */}
//                 <div className="px-6 py-2 bg-gray-50">
//                   <div className="flex items-center space-x-3">
//                     <div className="flex-1 bg-gray-200 rounded-full h-2">
//                       <div 
//                         className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
//                         style={{ width: `${totalSlots > 0 ? (enabledCount / totalSlots) * 100 : 0}%` }}
//                       ></div>
//                     </div>
//                     <span className="text-sm font-medium text-gray-600">
//                       {totalSlots > 0 ? Math.round((enabledCount / totalSlots) * 100) : 0}%
//                     </span>
//                   </div>
//                 </div>

//                 {/* Slots Grid */}
//                 <div className="p-6">
//                   <div className="grid gap-4 sm:grid-cols-2">
//                     {template.slots.map((slot) => {
//                       const isEnabled = enabledSlots[template.date]?.includes(slot.range) || false;
                      
//                       return (
//                         <div key={slot.range} className="group">
//                           <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
//                             isEnabled 
//                               ? 'border-green-200 bg-green-50 shadow-sm' 
//                               : 'border-gray-200 bg-gray-50 hover:border-gray-300'
//                           }`}>
//                             <div className="flex items-center justify-between">
//                               <div className="flex-1">
//                                 <h4 className={`font-semibold ${isEnabled ? 'text-green-900' : 'text-gray-900'}`}>
//                                   {slot.label}
//                                 </h4>
//                                 <div className="flex items-center mt-1 space-x-1">
//                                   <Clock className={`w-4 h-4 ${isEnabled ? 'text-green-600' : 'text-gray-500'}`} />
//                                   <span className={`text-sm ${isEnabled ? 'text-green-700' : 'text-gray-600'}`}>
//                                     {slot.range}
//                                   </span>
//                                 </div>
//                               </div>
                              
//                               {/* Your Original Toggle Switch */}
//                               <label className="relative inline-flex items-center cursor-pointer">
//                                 <input
//                                   type="checkbox"
//                                   checked={isEnabled}
//                                   onChange={() => handleToggle(template.date, slot)}
//                                   className="sr-only peer"
//                                 />
//                                 <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-400 peer-checked:to-green-600 shadow-lg"></div>
//                               </label>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Card Footer */}
//                 <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
//                   <button
//                     onClick={() => saveSlotsToBackend(template.date)}
//                     disabled={isSaving}
//                     className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
//                       isSaved
//                         ? 'bg-green-600 text-white shadow-lg'
//                         : isSaving
//                         ? 'bg-gray-400 text-white cursor-not-allowed'
//                         : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
//                     }`}
//                   >
//                     {isSaving ? (
//                       <>
//                         <Loader2 className="w-5 h-5 animate-spin" />
//                         <span>Saving...</span>
//                       </>
//                     ) : isSaved ? (
//                       <>
//                         <CheckCircle className="w-5 h-5" />
//                         <span>Saved Successfully!</span>
//                       </>
//                     ) : (
//                       <>
//                         <Save className="w-5 h-5" />
//                         <span>Save for {new Date(template.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Summary Card */}
//         <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div className="text-center p-4 bg-blue-50 rounded-xl">
//               <div className="text-2xl font-bold text-blue-600">
//                 {slotTemplates.length}
//               </div>
//               <div className="text-sm text-blue-700">Total Days</div>
//             </div>
//             <div className="text-center p-4 bg-green-50 rounded-xl">
//               <div className="text-2xl font-bold text-green-600">
//                 {Object.values(enabledSlots).flat().length}
//               </div>
//               <div className="text-sm text-green-700">Active Slots</div>
//             </div>
//             <div className="text-center p-4 bg-purple-50 rounded-xl">
//               <div className="text-2xl font-bold text-purple-600">
//                 {slotTemplates.reduce((acc, template) => acc + template.slots.length, 0)}
//               </div>
//               <div className="text-sm text-purple-700">Total Slots</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WashermanSlotToggle;










// // WashermanSlotToggle.tsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Calendar, Clock, Save, CheckCircle, AlertCircle, Loader2, Settings, Waves, RefreshCw } from "lucide-react";

// const WashermanSlotToggle = () => {
//   const [slotTemplates, setSlotTemplates] = useState([]);
//   const [enabledSlots, setEnabledSlots] = useState({});
//   const [maxBookingInputs, setMaxBookingInputs] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [savingStates, setSavingStates] = useState({});
//   const [savedStates, setSavedStates] = useState({});

//   useEffect(() => {
//     const fetchAdminSlots = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api/show/slot-templates", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSlotTemplates(res.data);
//         const saved = JSON.parse(localStorage.getItem("washermanEnabledSlots") || "{}");
//         setEnabledSlots(saved);
//       } catch (err) {
//         setError("Failed to load slot templates. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAdminSlots();
//   }, []);

//   const handleToggle = (date, slot) => {
//     const current = enabledSlots[date] || [];
//     const updated = current.includes(slot.range)
//       ? current.filter((r) => r !== slot.range)
//       : [...current, slot.range];
//     setEnabledSlots({ ...enabledSlots, [date]: updated });
//     localStorage.setItem("washermanEnabledSlots", JSON.stringify({ ...enabledSlots, [date]: updated }));
//     setSavedStates(prev => ({ ...prev, [date]: false }));
//   };

//   const handleMaxBookingChange = (date, range, value) => {
//     setMaxBookingInputs(prev => ({
//       ...prev,
//       [date]: {
//         ...prev[date],
//         [range]: parseInt(value)
//       }
//     }));
//   };

//   const saveSlotsToBackend = async (date) => {
//     setSavingStates(prev => ({ ...prev, [date]: true }));
//     const token = localStorage.getItem("token");
//     try {
//       const payload = {
//         date,
//         enabledSlots: (slotTemplates.find((d) => d.date === date)?.slots || [])
//           .filter((s) => enabledSlots[date]?.includes(s.range))
//           .map((s) => ({
//             label: s.label,
//             range: s.range,
//             maxBookings: maxBookingInputs[date]?.[s.range] || 1
//           }))
//       };
//       await axios.post("http://localhost:5000/api/show/slots/washer", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSavedStates(prev => ({ ...prev, [date]: true }));
//       setTimeout(() => setSavedStates(prev => ({ ...prev, [date]: false })), 3000);
//     } catch (err) {
//       setError("Failed to save slots. Please try again.");
//     } finally {
//       setSavingStates(prev => ({ ...prev, [date]: false }));
//     }
//   };

//   const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
//     weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
//   });

//   const getEnabledCount = (date) => enabledSlots[date]?.length || 0;
//   const getTotalSlots = (date) => slotTemplates.find(t => t.date === date)?.slots.length || 0;
//   const refreshData = () => window.location.reload();

//   if (loading) return <div className="text-center p-10"><Loader2 className="animate-spin w-6 h-6 mx-auto" /> Loading...</div>;
//   if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       {slotTemplates.map(template => {
//         const isSaving = savingStates[template.date];
//         const isSaved = savedStates[template.date];
//         return (
//           <div key={template.date} className="bg-white shadow rounded-lg mb-6 border">
//             <div className="bg-blue-100 px-4 py-2 border-b">
//               <h2 className="font-bold text-blue-800">{formatDate(template.date)} ({template.date})</h2>
//               <p className="text-sm text-blue-600">{getEnabledCount(template.date)} / {getTotalSlots(template.date)} Active Slots</p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
//               {template.slots.map(slot => {
//                 const isEnabled = enabledSlots[template.date]?.includes(slot.range);
//                 return (
//                   <div key={slot.range} className={`p-4 rounded border ${isEnabled ? 'bg-green-50 border-green-300' : 'bg-gray-50'}`}>
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <h3 className="font-semibold text-gray-800">{slot.label}</h3>
//                         <p className="text-sm text-gray-600 flex items-center"><Clock className="w-4 h-4 mr-1" /> {slot.range}</p>
//                       </div>
//                       <label className="inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={isEnabled}
//                           onChange={() => handleToggle(template.date, slot)}
//                           className="sr-only peer"
//                         />
//                         <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative">
//                           <div className="w-5 h-5 bg-white rounded-full shadow absolute top-0.5 left-0.5 transition peer-checked:translate-x-full" />
//                         </div>
//                       </label>
//                     </div>
//                     {isEnabled && (
//                       <div className="mt-2">
//                         <label className="text-sm text-gray-700">Max Bookings</label>
//                         <input
//                           type="number"
//                           min="1"
//                           value={maxBookingInputs[template.date]?.[slot.range] || ''}
//                           onChange={(e) => handleMaxBookingChange(template.date, slot.range, e.target.value)}
//                           className="w-full border rounded px-3 py-1 mt-1 text-sm"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="p-4 border-t">
//               <button
//                 onClick={() => saveSlotsToBackend(template.date)}
//                 disabled={isSaving}
//                 className={`w-full px-4 py-2 rounded text-white font-semibold transition-all ${isSaved ? 'bg-green-600' : isSaving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
//               >
//                 {isSaving ? 'Saving...' : isSaved ? 'Saved!' : `Save for ${template.date}`}
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default WashermanSlotToggle;







// WashermanSlotToggle.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Clock,
  Save,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";

const WashermanSlotToggle = () => {
  const [slotTemplates, setSlotTemplates] = useState([]);
  const [enabledSlots, setEnabledSlots] = useState({});
  const [maxBookingInputs, setMaxBookingInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingStates, setSavingStates] = useState({});
  const [savedStates, setSavedStates] = useState({});

  useEffect(() => {
    const fetchAdminSlots = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/show/slot-templates", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSlotTemplates(res.data);
        const saved = JSON.parse(localStorage.getItem("washermanEnabledSlots") || "{}");
        setEnabledSlots(saved);
      } catch (err) {
        setError("Failed to load slot templates. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAdminSlots();
  }, []);

  const handleToggle = (date, slot) => {
    const current = new Set(enabledSlots[date] || []);
    if (current.has(slot.range)) {
      current.delete(slot.range);
    } else {
      current.add(slot.range);
    }
    const updated = [...current];
    setEnabledSlots({ ...enabledSlots, [date]: updated });
    localStorage.setItem("washermanEnabledSlots", JSON.stringify({ ...enabledSlots, [date]: updated }));
    setSavedStates((prev) => ({ ...prev, [date]: false }));
  };

  const handleMaxBookingChange = (date, range, value) => {
    setMaxBookingInputs((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        [range]: parseInt(value),
      },
    }));
  };

  const saveSlotsToBackend = async (date) => {
    setSavingStates((prev) => ({ ...prev, [date]: true }));
    const token = localStorage.getItem("token");
    try {
      const payload = {
        date,
        enabledSlots: (slotTemplates.find((d) => d.date === date)?.slots || [])
          .filter((s) => enabledSlots[date]?.includes(s.range))
          .map((s) => ({
            label: s.label,
            range: s.range,
            maxBookings: maxBookingInputs[date]?.[s.range] || 1,
          })),
      };
      await axios.post("http://localhost:5000/api/show/slots/washer", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedStates((prev) => ({ ...prev, [date]: true }));
      setTimeout(() => setSavedStates((prev) => ({ ...prev, [date]: false })), 3000);
    } catch (err) {
      setError("Failed to save slots. Please try again.");
    } finally {
      setSavingStates((prev) => ({ ...prev, [date]: false }));
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getEnabledCount = (date) => {
    const enabled = enabledSlots[date] || [];
    return new Set(enabled).size;
  };

  const getTotalSlots = (date) => {
    const slots = slotTemplates.find((t) => t.date === date)?.slots || [];
    const uniqueRanges = new Set(slots.map((slot) => slot.range));
    return uniqueRanges.size;
  };

  const refreshData = () => window.location.reload();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <p className="text-red-600 mt-2">{error}</p>
          <button
            onClick={refreshData}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            <RefreshCw className="inline-block w-4 h-4 mr-1" />
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {slotTemplates.map((template) => {
        const date = template.date;
        const total = getTotalSlots(date);
        const active = getEnabledCount(date);
        const saving = savingStates[date];
        const saved = savedStates[date];

        return (
          <div key={date} className="bg-white shadow rounded-lg mb-6 border">
            <div className="flex justify-between items-center bg-blue-100 px-4 py-2 border-b">
              <div>
                <h2 className="font-bold text-blue-800">
                  {formatDate(date)}
                </h2>
                <p className="text-sm text-gray-600">{date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">
                  {active}/{total} Active Slots
                </p>
                <div className="w-full bg-gray-200 h-2 rounded mt-1">
                  <div
                    className="h-2 bg-green-500 rounded"
                    style={{ width: `${(active / total) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              {template.slots.map((slot) => {
                const isEnabled = enabledSlots[date]?.includes(slot.range);
                return (
                  <div
                    key={slot.range + slot.label}
                    className={`p-4 rounded border ${
                      isEnabled ? "bg-green-50 border-green-300" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-medium text-gray-800">{slot.label}</h4>
                        <div className="flex items-center text-sm text-gray-600 space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{slot.range}</span>
                        </div>
                        {isEnabled && (
                          <div className="mt-2">
                            <label className="text-xs text-gray-600">Max Bookings</label>
                            <input
                              type="number"
                              min="1"
                              value={maxBookingInputs[date]?.[slot.range] || ""}
                              onChange={(e) =>
                                handleMaxBookingChange(date, slot.range, e.target.value)
                              }
                              className="mt-1 w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          </div>
                        )}
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer mt-1">
                        <input
                          type="checkbox"
                          checked={isEnabled}
                          onChange={() => handleToggle(date, slot)}
                          className="sr-only peer"
                        />
                        <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 relative"></div>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => saveSlotsToBackend(date)}
              disabled={saving}
              className={`w-full mt-4 py-2 rounded-lg font-semibold transition ${
                saving
                  ? "bg-gray-400 text-white"
                  : saved
                  ? "bg-green-600 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {saving ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" /> Saving...
                </span>
              ) : saved ? (
                <span className="flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 mr-2" /> Saved!
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Save className="w-5 h-5 mr-2" />
                  Save for {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default WashermanSlotToggle;
