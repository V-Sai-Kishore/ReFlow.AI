import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HandHeart, User, Mail, Phone, Send } from 'lucide-react';

const JoinTeamPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="py-20 bg-background-grey flex items-center justify-center min-h-[70vh]">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-lg mx-auto bg-white p-8 md:p-12 rounded-xl shadow-lg">
                        <HandHeart className="mx-auto text-success h-12 w-12 mb-4" />
                        <h1 className="text-3xl font-bold text-text-dark">Welcome Aboard!</h1>
                        <p className="mt-4 text-lg">Thank you for joining the team. We're thrilled to have you. We will contact you shortly with details about upcoming campaigns.</p>
                        <Link to="/" className="mt-8 inline-block btn-primary">Back to Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12 bg-background-grey">
            <div className="container mx-auto px-4">
                <div className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-lg">
                    <Link to="/" className="inline-flex items-center text-primary font-semibold mb-8 hover:underline">
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Home
                    </Link>
                    <div className="text-center mb-8">
                        <HandHeart className="mx-auto text-primary h-12 w-12 mb-4" />
                        <h1 className="text-3xl font-bold text-text-dark">Join Our Team</h1>
                        <p className="mt-2 text-lg">Become a part of the solution. Sign up to volunteer for cleanup campaigns and community events.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="text" id="name" placeholder="John Doe" required className="w-full pl-10 pr-4 py-2.5 border border-border-color rounded-lg focus:ring-primary focus:border-primary" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="email" id="email" placeholder="you@example.com" required className="w-full pl-10 pr-4 py-2.5 border border-border-color rounded-lg focus:ring-primary focus:border-primary" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-text-dark mb-1">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="tel" id="phone" placeholder="(123) 456-7890" required className="w-full pl-10 pr-4 py-2.5 border border-border-color rounded-lg focus:ring-primary focus:border-primary" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="w-full btn-primary flex items-center justify-center">
                                <Send className="mr-2" size={20} />
                                Join the Campaign
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JoinTeamPage;
