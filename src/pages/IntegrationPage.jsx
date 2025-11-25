import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cpu, UploadCloud, Settings, AlertTriangle } from 'lucide-react';

const IntegrationPage = () => {
    return (
        <div className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <Link to="/" className="inline-flex items-center text-primary font-semibold mb-8 hover:underline">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Home
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-text-dark">Project & Hardware Integration</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-text-light">Connect your hardware to the ReFlow.AI ecosystem or manage existing river data.</p>
                </div>

                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="bg-background-grey p-8 rounded-xl border border-border-color">
                        <Cpu className="h-10 w-10 text-primary mb-4" />
                        <h2 className="text-2xl font-bold text-text-dark mb-3">Connect Your Device</h2>
                        <p className="mb-6">Follow our documentation to connect your ESP32, Raspberry Pi, or other IoT devices to our platform via MQTT or our secure API.</p>
                        <a href="#" className="font-semibold text-primary hover:underline">Read API Docs &rarr;</a>
                    </div>
                    <div className="bg-background-grey p-8 rounded-xl border border-border-color">
                        <UploadCloud className="h-10 w-10 text-primary mb-4" />
                        <h2 className="text-2xl font-bold text-text-dark mb-3">Upload River Data</h2>
                        <p className="mb-6">Have existing datasets? Upload historical river data in CSV or JSON format to enrich our predictive models.</p>
                         <a href="#" className="font-semibold text-primary hover:underline">Upload Files &rarr;</a>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto mt-12 bg-yellow-50 border-l-4 border-warning p-6 rounded-r-lg">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <AlertTriangle className="h-6 w-6 text-warning" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-lg font-bold text-yellow-800">Hardware Management Coming Soon!</h3>
                            <div className="mt-2 text-sm text-yellow-700">
                                <p>We are currently building a dedicated portal for real-time device management, data configuration, and OTA updates. We apologize for the inconvenience. This feature will be available shortly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegrationPage;
