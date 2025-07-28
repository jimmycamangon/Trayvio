"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Loading from "@/components/layout/Loading";
import { ReservationsTable } from "@/components/cater/ReservationsTable";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Calendar,
  Utensils,
  DollarSign,
  Star,
  MessageSquare,
  Edit,
} from "lucide-react";

export default function CaterDashboardPage() {
  const { user, isLoading } = useAuth();
  const [priorityPage, setPriorityPage] = useState(1);
  const itemsPerPage = 3;

  if (isLoading || !user) {
    return <Loading />;
  }

  // Sample data - replace with real API calls
  const stats = [
    {
      title: "Upcoming Reservations",
      value: "5",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Pending Requests",
      value: "3",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Avg. Rating",
      value: "4.8",
      icon: <Star className="h-5 w-5" />,
      suffix: "★",
    },
    {
      title: "Monthly Revenue",
      value: "$3,850",
      icon: <DollarSign className="h-5 w-5" />,
    },
  ];

  // In your page.tsx
  const recentReservations = [
    {
      id: 1,
      eventName: "Corporate Lunch",
      date: "2023-05-15",
      guests: 45,
      menu: "Premium Package",
      status: "confirmed" as const, // Explicitly type as const
    },
    {
      id: 2,
      eventName: "Wedding Reception",
      date: "2023-05-20",
      guests: 120,
      menu: "Vegan Buffet",
      status: "modification_requested" as const, // Explicitly type as const
    },
    {
      id: 3,
      eventName: "Wedding Reception",
      date: "2023-05-20",
      guests: 120,
      menu: "Vegan Buffet",
      status: "modification_requested" as const, // Explicitly type as const
    },
    {
      id: 4,
      eventName: "Wedding Reception",
      date: "2023-05-20",
      guests: 120,
      menu: "Vegan Buffet",
      status: "modification_requested" as const, // Explicitly type as const
    },
    {
      id: 5,
      eventName: "Wedding Reception",
      date: "2023-05-20",
      guests: 120,
      menu: "Vegan Buffet",
      status: "modification_requested" as const, // Explicitly type as const
    },
    {
      id: 6,
      eventName: "Wedding Reception",
      date: "2023-05-20",
      guests: 120,
      menu: "Vegan Buffet",
      status: "modification_requested" as const, // Explicitly type as const
    },
    {
      id: 7,
      eventName: "Wedding Reception",
      date: "2023-05-20",
      guests: 120,
      menu: "Vegan Buffet",
      status: "modification_requested" as const, // Explicitly type as const
    },
    {
      id: 8,
      eventName: "Wedding Reception",
      date: "2023-05-20",
      guests: 120,
      menu: "Vegan Buffet",
      status: "modification_requested" as const, // Explicitly type as const
    },
    {
      id: 9,
      eventName: "Wedding Reception",
      date: "2023-05-20",
      guests: 120,
      menu: "Vegan Buffet",
      status: "modification_requested" as const, // Explicitly type as const
    },
    {
      id: 10,
      eventName: "Wedding Reception",
      date: "2023-05-20",
      guests: 120,
      menu: "Vegan Buffet",
      status: "modification_requested" as const, // Explicitly type as const
    },
    {
      id: 11,
      eventName: "Wedding Reception",
      date: "2023-05-20",
      guests: 120,
      menu: "Vegan Buffet",
      status: "modification_requested" as const, // Explicitly type as const
    },
    {
      id: 12,
      eventName: "Wedding Reception",
      date: "2023-05-20",
      guests: 120,
      menu: "Vegan Buffet",
      status: "modification_requested" as const, // Explicitly type as const
    },
    {
      id: 13,
      eventName: "Corporate Lunch",
      date: "2023-05-15",
      guests: 45,
      menu: "Premium Package",
      status: "confirmed" as const, // Explicitly type as const
    },
    {
      id: 14,
      eventName: "Corporate Lunch",
      date: "2023-05-15",
      guests: 45,
      menu: "Premium Package",
      status: "confirmed" as const, // Explicitly type as const
    },
    {
      id: 15,
      eventName: "Corporate Lunch",
      date: "2023-05-15",
      guests: 45,
      menu: "Premium Package",
      status: "confirmed" as const, // Explicitly type as const
    },
    {
      id: 16,
      eventName: "Corporate Lunch",
      date: "2023-05-15",
      guests: 45,
      menu: "Premium Package",
      status: "confirmed" as const, // Explicitly type as const
    },
    {
      id: 17,
      eventName: "Corporate Lunch",
      date: "2023-05-15",
      guests: 45,
      menu: "Premium Package",
      status: "confirmed" as const, // Explicitly type as const
    },
    {
      id: 18,
      eventName: "Corporate Lunch",
      date: "2023-05-15",
      guests: 45,
      menu: "Premium Package",
      status: "confirmed" as const, // Explicitly type as const
    },
    {
      id: 19,
      eventName: "Corporate Lunch",
      date: "2023-05-15",
      guests: 45,
      menu: "Premium Package",
      status: "confirmed" as const, // Explicitly type as const
    },
    {
      id: 20,
      eventName: "Corporate Lunch",
      date: "2023-05-15",
      guests: 45,
      menu: "Premium Package",
      status: "confirmed" as const, // Explicitly type as const
    },
    {
      id: 21,
      eventName: "Corporate Lunch",
      date: "2023-05-15",
      guests: 45,
      menu: "Premium Package",
      status: "confirmed" as const, // Explicitly type as const
    },
    {
      id: 22,
      eventName: "Corporate Lunch",
      date: "2023-05-15",
      guests: 45,
      menu: "Premium Package",
      status: "confirmed" as const, // Explicitly type as const
    },
    {
      id: 23,
      eventName: "Corporate Lunch",
      date: "2023-05-15",
      guests: 45,
      menu: "Premium Package",
      status: "confirmed" as const, // Explicitly type as const
    },
    {
      id: 24,
      eventName: "Corporate Lunch",
      date: "2023-05-15",
      guests: 45,
      menu: "Premium Package",
      status: "confirmed" as const, // Explicitly type as const
    },
    {
      id: 25,
      eventName: "Corporate Lunch",
      date: "2023-05-15",
      guests: 45,
      menu: "Premium Package",
      status: "confirmed" as const, // Explicitly type as const
    },
    {
      id: 26,
      eventName: "Corporate Lunch",
      date: "2023-05-15",
      guests: 45,
      menu: "Premium Package",
      status: "confirmed" as const, // Explicitly type as const
    },
    {
      id: 27,
      eventName: "Corporate Lunch",
      date: "2023-05-15",
      guests: 45,
      menu: "Premium Package",
      status: "confirmed" as const, // Explicitly type as const
    },
  ];
  const priorityReservations = recentReservations.filter(
    (r) => r.status === "modification_requested"
  );

  const totalPriorityPages = Math.ceil(
    priorityReservations.length / itemsPerPage
  );
  const paginatedPriorityReservations = priorityReservations.slice(
    (priorityPage - 1) * itemsPerPage,
    priorityPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm border dark:border-gray-700">
        <h1 className="text-2xl font-display font-semibold text-gray-900 dark:text-white">
          Welcome back,{" "}
          <span className="text-primary dark:text-primary-foreground">
            {user.fullName}
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1 font-sans">
          {recentReservations.length > 0
            ? "Manage your upcoming reservations"
            : "Add your menu to get started!"}
        </p>
      </div>

      {/* Responsive Stats Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm border dark:border-gray-700"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="overflow-hidden">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                  {stat.title}
                </p>
                <p className="text-lg sm:text-xl font-display font-semibold text-gray-900 dark:text-white truncate">
                  {stat.value}
                  {stat.suffix}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Priority Section with Pagination */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm border dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold text-gray-900 dark:text-white">
            Priority Actions
          </h2>
          {priorityReservations.length > itemsPerPage && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPriorityPage((p) => Math.max(1, p - 1))}
                disabled={priorityPage === 1}
                className="p-1 rounded-md disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Page {priorityPage} of {totalPriorityPages}
              </span>
              <button
                onClick={() =>
                  setPriorityPage((p) => Math.min(totalPriorityPages, p + 1))
                }
                disabled={priorityPage === totalPriorityPages}
                className="p-1 rounded-md disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {paginatedPriorityReservations.length > 0 ? (
            paginatedPriorityReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="flex items-center justify-between p-3 border dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {reservation.eventName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {reservation.date} • {reservation.guests} guests
                  </p>
                </div>
                <button className="flex items-center gap-2 px-3 py-1 bg-primary/10 dark:bg-primary/10 text-primary dark:text-primary-foreground rounded-md hover:bg-primary/20 dark:hover:bg-primary/20">
                  <Edit className="h-4 w-4" />
                  <span>Review Changes</span>
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No priority actions required
            </p>
          )}
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reservations Table (2/3 width) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-gray-900 dark:text-white">
              Recent Reservations
            </h2>
            <button className="text-sm text-primary dark:text-primary-foreground hover:text-primary/60 dark:hover:text-primary-foreground/60 transition-colors">
              View All
            </button>
          </div>

          <ReservationsTable data={recentReservations} />
        </div>

        {/* Right Sidebar (1/3 width) */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm border dark:border-gray-700">
            <h2 className="text-lg font-display font-semibold mb-4 text-gray-900 dark:text-white">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-primary/10 dark:bg-primary/10 text-primary dark:text-primary-foreground hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors">
                <Utensils className="h-5 w-5" />
                <span>Update Menu</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300">
                <Calendar className="h-5 w-5" />
                <span>Set Availability</span>
              </button>
            </div>
          </div>

          {/* Mini Calendar */}
          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm border dark:border-gray-700">
            <h2 className="text-lg font-display font-semibold mb-4 text-gray-900 dark:text-white">
              Availability
            </h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
              <Calendar className="h-8 w-8 mx-auto text-gray-400 dark:text-gray-500" />
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Mark dates as unavailable
              </p>
              <button className="mt-3 text-sm text-primary dark:text-primary-foreground hover:text-primary/60 dark:hover:text-primary-foreground/60 transition-colors">
                Open Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
