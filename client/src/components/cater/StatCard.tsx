// export default function StatCard({ title, value, icon, change, suffix }) {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-sm">
//       <div className="flex items-center justify-between">
//         <p className="text-sm text-gray-500">{title}</p>
//         <div className="text-gray-400">{icon}</div>
//       </div>
//       <div className="mt-2 flex items-end gap-2">
//         <span className="text-2xl font-bold">{value}</span>
//         {suffix && <span className="text-lg">{suffix}</span>}
//         {change && (
//           <span className={`ml-2 text-sm ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
//             {change}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }