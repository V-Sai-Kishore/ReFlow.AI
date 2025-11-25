import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, Map } from 'lucide-react';

const riskIndexData = [
    { segment: 'Yamuna - Delhi Urban', riskScore: 9.2, trend: 'Increasing' },
    { segment: 'Ganga - Kanpur Industrial', riskScore: 8.5, trend: 'Stable' },
    { segment: 'Tungabhadra - Mining Area', riskScore: 8.1, trend: 'Increasing' },
    { segment: 'Kaveri - Erode Tanneries', riskScore: 7.4, trend: 'Decreasing' },
    { segment: 'Narmada - Jabalpur', riskScore: 3.1, trend: 'Stable' },
];

const AiIndexPage = () => {
    return (
        <div className="py-12 bg-background-grey">
            <div className="container mx-auto px-4">
                <Link to="/" className="inline-flex items-center text-primary font-semibold mb-8 hover:underline">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Home
                </Link>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-text-dark flex items-center"><BarChart3 className="mr-3"/>River AI Index</h1>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3 bg-white p-8 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold text-text-dark mb-4 flex items-center"><Map className="mr-2"/>Predicted Hotspot Map</h2>
                        <p className="mb-4 text-text-light">This map visualizes the predictive risk scores for various river segments. Darker shades indicate a higher probability of waste accumulation.</p>
                        <div className="bg-gray-800 rounded-lg p-4">
                            <img src="https://www.mdpi.com/remotesensing/remotesensing-16-01272/article_deploy/html/images/remotesensing-16-01272-g004.png" alt="Predicted Hotspot Map" className="w-full h-auto rounded-md" />
                        </div>
                    </div>
                    <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold text-text-dark mb-4">High-Risk Segments</h2>
                         <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-border-color">
                                        <th className="py-2 font-semibold">Segment</th>
                                        <th className="py-2 font-semibold">Risk Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {riskIndexData.map(item => (
                                        <tr key={item.segment} className="border-b border-border-color">
                                            <td className="py-3">{item.segment}</td>
                                            <td className={`py-3 font-bold ${item.riskScore > 7 ? 'text-danger' : 'text-warning'}`}>{item.riskScore}/10</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiIndexPage;
