import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wifi, Plus, Edit, Trash2, MapPin, Activity, Thermometer, Waves, AlertTriangle } from 'lucide-react';
import Modal from '../../components/Modal';
import ConfirmationModal from '../../components/ConfirmationModal';

const initialEcoBuoys = [
    { id: 'EB-G01', river: 'Ganga', location: 'Haridwar', turbidity: '12 NTU', bod: '3.1 mg/L', status: 'Online' },
    { id: 'EB-Y01', river: 'Yamuna', location: 'Agra', turbidity: '45 NTU', bod: '18.5 mg/L', status: 'Online' },
    { id: 'EB-Y02', river: 'Yamuna', location: 'Delhi', turbidity: '88 NTU', bod: '29.0 mg/L', status: 'Offline' },
    { id: 'EB-K01', river: 'Kaveri', location: 'Srirangam', turbidity: '8 NTU', bod: '2.8 mg/L', status: 'Online' },
];

const EcoBuoyPage = () => {
    const [buoys, setBuoys] = useState(initialEcoBuoys);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [editingBuoy, setEditingBuoy] = useState(null);
    const [deletingBuoyId, setDeletingBuoyId] = useState(null);

    const handleOpenFormModal = (buoy = null) => {
        setEditingBuoy(buoy);
        setIsFormModalOpen(true);
    };

    const handleCloseFormModal = () => {
        setIsFormModalOpen(false);
        setEditingBuoy(null);
    };
    
    const handleOpenConfirmModal = (buoyId) => {
        setDeletingBuoyId(buoyId);
        setIsConfirmModalOpen(true);
    };

    const handleCloseConfirmModal = () => {
        setDeletingBuoyId(null);
        setIsConfirmModalOpen(false);
    };

    const handleSave = (buoyData) => {
        if (editingBuoy) {
            setBuoys(buoys.map(b => b.id === editingBuoy.id ? { ...b, ...buoyData } : b));
        } else {
            const newBuoy = { id: `EB-00${buoys.length + 1}`, ...buoyData };
            setBuoys([...buoys, newBuoy]);
        }
        handleCloseFormModal();
    };

    const confirmDelete = () => {
        setBuoys(buoys.filter(b => b.id !== deletingBuoyId));
        handleCloseConfirmModal();
    };

    return (
        <div className="py-12 bg-background-grey">
            <div className="container mx-auto px-4">
                <Link to="/" className="inline-flex items-center text-primary font-semibold mb-8 hover:underline">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Home
                </Link>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-text-dark flex items-center"><Wifi className="mr-3"/>EcoBuoy Sensor Management</h1>
                    <button onClick={() => handleOpenFormModal()} className="btn-primary flex items-center"><Plus size={20} className="mr-2"/>Add New Buoy</button>
                </div>
                
                <div className="mb-8 bg-blue-50 border-l-4 border-primary p-4 rounded-r-lg">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <AlertTriangle className="h-5 w-5 text-primary" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-blue-700">
                                Real-time hardware data is a future feature, currently in development.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md">
                    <p className="mb-6 text-text-light">Monitor and manage the network of EcoBuoy sensors. View real-time water quality data from various deployment points.</p>
                     <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-border-color bg-gray-50">
                                    <th className="p-4 font-semibold">Buoy ID</th>
                                    <th className="p-4 font-semibold">River</th>
                                    <th className="p-4 font-semibold">Location</th>
                                    <th className="p-4 font-semibold">Turbidity</th>
                                    <th className="p-4 font-semibold">BOD</th>
                                    <th className="p-4 font-semibold">Status</th>
                                    <th className="p-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {buoys.map(buoy => (
                                    <tr key={buoy.id} className="border-b border-border-color hover:bg-gray-50">
                                        <td className="p-4 font-mono text-primary">{buoy.id}</td>
                                        <td className="p-4">{buoy.river}</td>
                                        <td className="p-4">{buoy.location}</td>
                                        <td className="p-4">{buoy.turbidity}</td>
                                        <td className="p-4">{buoy.bod}</td>
                                        <td className="p-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${buoy.status === 'Online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{buoy.status}</span></td>
                                        <td className="p-4 flex space-x-2">
                                            <button onClick={() => handleOpenFormModal(buoy)} className="text-secondary hover:text-primary"><Edit size={18}/></button>
                                            <button onClick={() => handleOpenConfirmModal(buoy.id)} className="text-secondary hover:text-danger"><Trash2 size={18}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <BuoyFormModal isOpen={isFormModalOpen} onClose={handleCloseFormModal} onSave={handleSave} buoy={editingBuoy} />
            <ConfirmationModal 
                isOpen={isConfirmModalOpen}
                onClose={handleCloseConfirmModal}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message={`Are you sure you want to delete EcoBuoy ${deletingBuoyId}? This action cannot be undone.`}
            />
        </div>
    );
};

const BuoyFormModal = ({ isOpen, onClose, onSave, buoy }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData({
            river: buoy?.river || '',
            location: buoy?.location || '',
            turbidity: buoy?.turbidity || '',
            bod: buoy?.bod || '',
            status: buoy?.status || 'Online',
        });
    }, [buoy, isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={buoy ? 'Edit EcoBuoy' : 'Add New EcoBuoy'}>
            <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">River</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" name="river" value={formData.river} onChange={handleChange} required className="w-full form-input pl-10" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">Location</label>
                     <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full form-input pl-10" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">Turbidity</label>
                    <div className="relative">
                        <Waves className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" name="turbidity" value={formData.turbidity} onChange={handleChange} required placeholder="e.g., 12 NTU" className="w-full form-input pl-10" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">BOD</label>
                    <div className="relative">
                        <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" name="bod" value={formData.bod} onChange={handleChange} required placeholder="e.g., 3.1 mg/L" className="w-full form-input pl-10" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">Status</label>
                    <div className="relative">
                        <Activity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full form-input pl-10">
                            <option>Online</option>
                            <option>Offline</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end pt-4 space-x-4">
                    <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
                    <button type="submit" className="btn-primary">Save Buoy</button>
                </div>
            </form>
        </Modal>
    );
};

export default EcoBuoyPage;
