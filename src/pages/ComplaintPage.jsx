import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Camera, MapPin, MessageSquare, Send } from 'lucide-react';

const ComplaintPage = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="py-20 bg-background-grey flex items-center justify-center min-h-[70vh]">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-lg mx-auto bg-white p-8 md:p-12 rounded-xl shadow-lg">
                        <Send className="mx-auto text-success h-12 w-12 mb-4" />
                        <h1 className="text-3xl font-bold text-text-dark">Complaint Submitted!</h1>
                        <p className="mt-4 text-lg">Thank you for your contribution. Our team will review your submission and take appropriate action.</p>
                        <Link to="/" className="mt-8 inline-block btn-primary">Back to Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12 bg-background-grey">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-lg">
                    <Link to="/" className="inline-flex items-center text-primary font-semibold mb-8 hover:underline">
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Home
                    </Link>
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-text-dark">Raise a Complaint</h1>
                        <p className="mt-2 text-lg">Spotted pollution? Help us by reporting it here.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-text-dark mb-1">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="text" id="location" placeholder="e.g., Near Ganga Barrage, Kanpur" required className="w-full pl-10 pr-4 py-2.5 border border-border-color rounded-lg focus:ring-primary focus:border-primary" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-text-dark mb-1">Upload Image</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border-color border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="mx-auto h-48 w-auto rounded-lg" />
                                    ) : (
                                        <>
                                            <Camera className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none">
                                                    <span>Upload a file</span>
                                                    <input id="image-upload" name="image-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-text-dark mb-1">Description</label>
                             <div className="relative">
                                <MessageSquare className="absolute left-3 top-4 text-gray-400" />
                                <textarea id="description" rows="4" placeholder="Describe the issue (e.g., large plastic pile, discolored water)" required className="w-full pl-10 pr-4 py-2.5 border border-border-color rounded-lg focus:ring-primary focus:border-primary"></textarea>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="w-full btn-primary flex items-center justify-center">
                                <Send className="mr-2" size={20} />
                                Submit Complaint
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ComplaintPage;
