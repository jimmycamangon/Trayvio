"use client";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/layout/Loading";
import { Home, Calendar, Utensils, DollarSign, Star, Users } from "lucide-react";
// import StatCard from "@/components/cater/StatCard";
// import RecentBookings from "@/components/cater/RecentBookings";

export default function CaterDashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading || !user) {
    return <Loading />;
  }

  // Sample data - replace with real API calls
  const stats = [
    { title: "Upcoming Events", value: "12", icon: <Calendar className="h-5 w-5" />, change: "+20%" },
    { title: "Monthly Revenue", value: "$3,850", icon: <DollarSign className="h-5 w-5" />, change: "+15%" },
    { title: "Menu Views", value: "324", icon: <Utensils className="h-5 w-5" />, change: "-5%" },
    { title: "Customer Rating", value: "4.8", icon: <Star className="h-5 w-5" />, suffix: "★" },
  ];

  const recentBookings = [
    { id: 1, eventName: "Corporate Lunch", date: "May 15, 2023", guests: 45, status: "Confirmed" },
    { id: 2, eventName: "Wedding Reception", date: "May 20, 2023", guests: 120, status: "Pending" },
    { id: 3, eventName: "Birthday Party", date: "May 22, 2023", guests: 30, status: "Completed" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold">
          Welcome back, <span className="text-purple-600">{ user.fullName}</span>
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your business today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            suffix={stat.suffix}
          />
        ))} */}
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings (2/3 width on desktop) */}
        <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Bookings</h2>
            <button className="text-sm text-purple-600 hover:text-purple-800">
              View All
            </button>
          </div>
          {/* <RecentBookings bookings={recentBookings} /> */}
        </div>

        {/* Quick Actions (1/3 width on desktop) */}
        <div className="space-y-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors">
                <Calendar className="h-5 w-5" />
                <span>Add Availability</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <Utensils className="h-5 w-5" />
                <span>Update Menu</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <Users className="h-5 w-5" />
                <span>View Customers</span>
              </button>
            </div>
          </div>

          {/* Calendar Widget */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <Calendar className="h-6 w-6 text-gray-400" />
              <span className="ml-2 text-gray-500">Calendar integration coming soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}