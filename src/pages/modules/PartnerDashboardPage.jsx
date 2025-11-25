import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LayoutDashboard, Map, BarChart, Trash2, TrendingUp, Users } from 'lucide-react';
import { faker } from '@faker-js/faker';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const kpiData = [
    { icon: Trash2, value: '1,284 kg', label: 'Total Waste Collected (Month)' },
    { icon: TrendingUp, value: '72%', label: 'Recycling Rate' },
    { icon: Users, value: '8', label: 'Active RiverBots' },
];

const recentCollections = Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    river: faker.helpers.arrayElement(['Ganga', 'Yamuna', 'Kaveri']),
    location: faker.location.city(),
    weight: faker.number.int({ min: 50, max: 200 }),
    date: faker.date.recent().toLocaleDateString(),
}));

const barChartData = {
    labels: ['Plastics', 'Glass', 'Metals', 'Organic', 'Other'],
    datasets: [{
        label: 'Waste Collected (kg)',
        data: [650, 150, 80, 250, 154],
        backgroundColor: '#3B82F6',
        borderRadius: 4,
    }],
};

const PartnerDashboardPage = () => {
    return (
        <div className="py-12 bg-background-grey">
            <div className="container mx-auto px-4">
                <Link to="/" className="inline-flex items-center text-primary font-semibold mb-8 hover:underline">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Home
                </Link>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-text-dark flex items-center"><LayoutDashboard className="mr-3"/>Partner Dashboard</h1>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {kpiData.map(kpi => (
                        <div key={kpi.label} className="bg-white p-6 rounded-xl shadow-md flex items-center">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <kpi.icon className="h-7 w-7 text-primary" />
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl font-bold text-text-dark">{kpi.value}</p>
                                <p className="text-sm text-secondary">{kpi.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Map */}
                    <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold text-text-dark mb-4 flex items-center"><Map className="mr-2"/>Live Hotspot Map</h2>
                        <div className="bg-gray-800 rounded-lg p-4">
                            <img src="https://i0.wp.com/vikalpsangam.org/wp-content/uploads/2024/01/Max-Martin-Interlinking-of-Rivers-Proposed-River-Linking-Map.jpeg?resize=640%2C424&ssl=1" alt="Hotspot Map" className="w-full h-auto rounded-md" />
                        </div>
                    </div>
                    {/* Chart */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold text-text-dark mb-4 flex items-center"><BarChart className="mr-2"/>Waste Composition</h2>
                        <Bar data={barChartData} options={{ responsive: true }} />
                    </div>
                </div>

                {/* Recent Collections */}
                <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold text-text-dark mb-4">Recent Collection Events</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-border-color bg-gray-50">
                                    <th className="p-4 font-semibold">River</th>
                                    <th className="p-4 font-semibold">Location</th>
                                    <th className="p-4 font-semibold">Weight (kg)</th>
                                    <th className="p-4 font-semibold">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentCollections.map(item => (
                                    <tr key={item.id} className="border-b border-border-color hover:bg-gray-50">
                                        <td className="p-4">{item.river}</td>
                                        <td className="p-4">{item.location}</td>
                                        <td className="p-4 font-medium">{item.weight}</td>
                                        <td className="p-4">{item.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerDashboardPage;
