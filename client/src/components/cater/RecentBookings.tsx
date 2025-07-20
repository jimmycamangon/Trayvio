// "use client";
// import { Calendar, Users } from "lucide-react";

// export default function RecentBookings({ bookings }) {
//   return (
//     <div>
//       {/* Desktop Table (hidden on mobile) */}
//       <div className="hidden md:block">
//         <table className="w-full">
//           {/* Desktop table implementation */}
//         </table>
//       </div>

//       {/* Mobile Cards (hidden on desktop) */}
//       <div className="md:hidden space-y-3">
//         {bookings.map(booking => (
//           <div key={booking.id} className="bg-gray-50 p-3 rounded-lg">
//             <div className="flex justify-between">
//               <h3 className="font-medium">{booking.eventName}</h3>
//               <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
//                 {booking.status}
//               </span>
//             </div>
//             <div className="mt-2 flex items-center text-sm text-gray-500">
//               <Calendar className="h-4 w-4 mr-1" />
//               {booking.date}
//             </div>
//             <div className="mt-1 flex items-center text-sm text-gray-500">
//               <Users className="h-4 w-4 mr-1" />
//               {booking.guests} guests
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }