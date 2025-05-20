import { ChevronDown, DollarSign, FileX, Package, ShoppingCart, Users } from 'lucide-react';
import React from 'react'

const DashboardPage = () => {
    return (
        <SampleContent />
    )
}

export const StatsCard = React.memo(({ title, value, icon, trend, color }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col">
        <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
            <div className={`p-2 rounded-full ${color ? color : 'bg-blue-100'}`}>
                {icon}
            </div>
        </div>
        <div className="flex items-end justify-between">
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
                <span className={`text-xs flex items-center ${trend.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {trend.positive ? '+' : '-'}{trend.value}%
                    <ChevronDown size={14} className={trend.positive ? 'transform rotate-180' : ''} />
                </span>
            )}
        </div>
    </div>
));


export const SampleContent = React.memo(() => (
    <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-heading font-bold">Dashboard Overview</h1>
            <div className="flex space-x-2">
                <button className="bg-white border border-gray-200 px-3 py-1.5 rounded text-sm hover:bg-light">
                    This Week
                </button>
                <button className="bg-accent text-white px-3 py-1.5 rounded text-sm hover:bg-opacity-90">
                    + New Report
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
                title="Total Sales"
                value="$24,780"
                icon={<DollarSign size={16} className="text-blue-500" />}
                trend={{ positive: true, value: 12.8 }}
                color="bg-blue-100"
            />
            <StatsCard
                title="Total Orders"
                value="1,429"
                icon={<ShoppingCart size={16} className="text-green-500" />}
                trend={{ positive: true, value: 8.3 }}
                color="bg-green-100"
            />
            <StatsCard
                title="Customers"
                value="924"
                icon={<Users size={16} className="text-purple-500" />}
                trend={{ positive: true, value: 4.6 }}
                color="bg-purple-100"
            />
            <StatsCard
                title="Refunds"
                value="$1,180"
                icon={<FileX size={16} className="text-red-500" />}
                trend={{ positive: false, value: 2.1 }}
                color="bg-red-100"
            />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">Sales Analytics</h3>
                    <div className="flex space-x-2">
                        <button className="text-xs px-2 py-1 rounded bg-light">Weekly</button>
                        <button className="text-xs px-2 py-1 rounded">Monthly</button>
                        <button className="text-xs px-2 py-1 rounded">Yearly</button>
                    </div>
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                    <p className="text-gray-400">Chart will appear here</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">Recent Orders</h3>
                    <button className="text-xs text-accent">View all</button>
                </div>
                <div className="space-y-3">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex justify-between items-center pb-2 border-b border-gray-100">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Package size={14} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Order #{10000 + item}</p>
                                    <p className="text-xs text-gray-500">2 minutes ago</p>
                                </div>
                            </div>
                            <span className="text-sm font-medium">${(Math.random() * 100).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
));


export default React.memo(DashboardPage);
