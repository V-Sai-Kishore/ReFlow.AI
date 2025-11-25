import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Maximize, X, BarChart2, PieChart, Thermometer, Waves, Trash2 } from 'lucide-react';
import { riversData } from '../data/rivers-data';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const RiverPage = () => {
    const { riverId } = useParams();
    const river = riversData[riverId];
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [riverId]);

    if (!river) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-3xl font-bold text-danger">River Not Found</h1>
                <p className="mt-4">The requested river data could not be found.</p>
                <Link to="/" className="mt-8 inline-block bg-primary text-white font-semibold px-6 py-2.5 rounded-lg">Back to Home</Link>
            </div>
        );
    }

    const lineChartData = {
        labels: river.charts.pollutionTrend.labels,
        datasets: [{
            label: 'Average BOD (mg/L)',
            data: river.charts.pollutionTrend.data,
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4,
        }],
    };

    const pieChartData = {
        labels: river.charts.wasteComposition.labels,
        datasets: [{
            data: river.charts.wasteComposition.data,
            backgroundColor: ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'],
        }],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        },
    };
    
    const statusColor = {
        'Good': 'text-green-500 bg-green-100',
        'Moderate': 'text-yellow-500 bg-yellow-100',
        'Concern': 'text-orange-500 bg-orange-100',
        'Critical': 'text-red-500 bg-red-100',
        'Severe': 'text-red-700 bg-red-200',
    };

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-12">
                <Link to="/" className="inline-flex items-center text-primary font-semibold mb-8 hover:underline">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Home
                </Link>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-text-dark">{river.name} River</h1>
                    <p className="text-lg max-w-3xl mx-auto mt-4 text-text-light">{river.description}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
                    <StatCard icon={Waves} label="Length" value={river.stats.length} />
                    <StatCard icon={Thermometer} label="Avg. BOD" value={river.stats.avg_bod} />
                    <StatCard icon={Trash2} label="Major Pollutants" value={river.stats.major_pollutants} />
                     <div className="bg-background-grey p-6 rounded-xl flex items-center">
                        <div className="ml-4">
                            <p className="text-sm font-medium text-secondary">Status</p>
                            <p className={`text-lg font-bold px-3 py-1 rounded-full inline-block ${statusColor[river.stats.status]}`}>{river.stats.status}</p>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    <ChartCard title="Pollution Trend (BOD Levels)" icon={BarChart2}>
                        <Line options={chartOptions} data={lineChartData} />
                    </ChartCard>
                    <ChartCard title="Waste Composition" icon={PieChart}>
                         <div className="w-full max-w-sm mx-auto">
                            <Pie options={chartOptions} data={pieChartData} />
                        </div>
                    </ChartCard>
                </div>

                {/* Gallery */}
                <div>
                    <h2 className="text-3xl font-bold text-text-dark text-center mb-8">Image Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {river.images.map((img, index) => (
                            <div key={index} className="relative group overflow-hidden rounded-lg cursor-pointer" onClick={() => setSelectedImage(img)}>
                                <img src={img} alt={`${river.name} river image ${index + 1}`} className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Maximize className="text-white" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
                    <button className="absolute top-4 right-4 text-white z-50" onClick={() => setSelectedImage(null)}>
                        <X size={32} />
                    </button>
                    <img src={selectedImage} alt="Enlarged view" className="max-w-full max-h-full object-contain rounded-lg" />
                </div>
            )}
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value }) => (
    <div className="bg-background-grey p-6 rounded-xl flex items-center">
        <Icon className="w-8 h-8 text-primary" />
        <div className="ml-4">
            <p className="text-sm font-medium text-secondary">{label}</p>
            <p className="text-lg font-bold text-text-dark">{value}</p>
        </div>
    </div>
);

const ChartCard = ({ title, icon: Icon, children }) => (
    <div className="bg-background-grey p-6 rounded-xl">
        <h3 className="flex items-center text-xl font-bold text-text-dark mb-4">
            <Icon className="mr-3 text-primary" />
            {title}
        </h3>
        {children}
    </div>
);

export default RiverPage;
