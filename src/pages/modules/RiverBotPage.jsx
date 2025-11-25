import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bot, Plus, Edit, Trash2, MapPin, Battery, Activity, AlertTriangle } from 'lucide-react';
import Modal from '../../components/Modal';
import ConfirmationModal from '../../components/ConfirmationModal';

const initialRiverBots = [
    { id: 'RB-001', river: 'Ganga', location: 'Varanasi', status: 'Active', battery: '88%' },
    { id: 'RB-002', river: 'Yamuna', location: 'Delhi', status: 'Charging', battery: '15%' },
    { id: 'RB-003', river: 'Ganga', location: 'Kanpur', status: 'Maintenance', battery: 'N/A' },
    { id: 'RB-004', river: 'Kaveri', location: 'Trichy', status: 'Active', battery: '95%' },
];

const RiverBotPage = () => {
    const [bots, setBots] = useState(initialRiverBots);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [editingBot, setEditingBot] = useState(null);
    const [deletingBotId, setDeletingBotId] = useState(null);

    const handleOpenFormModal = (bot = null) => {
        setEditingBot(bot);
        setIsFormModalOpen(true);
    };

    const handleCloseFormModal = () => {
        setIsFormModalOpen(false);
        setEditingBot(null);
    };

    const handleOpenConfirmModal = (botId) => {
        setDeletingBotId(botId);
        setIsConfirmModalOpen(true);
    };

    const handleCloseConfirmModal = () => {
        setDeletingBotId(null);
        setIsConfirmModalOpen(false);
    };

    const handleSave = (botData) => {
        if (editingBot) {
            setBots(bots.map(b => b.id === editingBot.id ? { ...b, ...botData } : b));
        } else {
            const newBot = { id: `RB-00${bots.length + 1}`, ...botData };
            setBots([...bots, newBot]);
        }
        handleCloseFormModal();
    };

    const confirmDelete = () => {
        setBots(bots.filter(b => b.id !== deletingBotId));
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
                    <h1 className="text-3xl font-bold text-text-dark flex items-center"><Bot className="mr-3"/>RiverBot Mini Management</h1>
                    <button onClick={() => handleOpenFormModal()} className="btn-primary flex items-center"><Plus size={20} className="mr-2"/>Add New Bot</button>
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
                    <p className="mb-6 text-text-light">Manage the fleet of autonomous RiverBots. Monitor their status, location, and performance across different rivers.</p>
                     <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-border-color bg-gray-50">
                                    <th className="p-4 font-semibold">Bot ID</th>
                                    <th className="p-4 font-semibold">River</th>
                                    <th className="p-4 font-semibold">Location</th>
                                    <th className="p-4 font-semibold">Status</th>
                                    <th className="p-4 font-semibold">Battery</th>
                                    <th className="p-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bots.map(bot => (
                                    <tr key={bot.id} className="border-b border-border-color hover:bg-gray-50">
                                        <td className="p-4 font-mono text-primary">{bot.id}</td>
                                        <td className="p-4">{bot.river}</td>
                                        <td className="p-4">{bot.location}</td>
                                        <td className="p-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${bot.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{bot.status}</span></td>
                                        <td className="p-4">{bot.battery}</td>
                                        <td className="p-4 flex space-x-2">
                                            <button onClick={() => handleOpenFormModal(bot)} className="text-secondary hover:text-primary"><Edit size={18}/></button>
                                            <button onClick={() => handleOpenConfirmModal(bot.id)} className="text-secondary hover:text-danger"><Trash2 size={18}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <BotFormModal isOpen={isFormModalOpen} onClose={handleCloseFormModal} onSave={handleSave} bot={editingBot} />
            <ConfirmationModal 
                isOpen={isConfirmModalOpen}
                onClose={handleCloseConfirmModal}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message={`Are you sure you want to delete RiverBot ${deletingBotId}? This action cannot be undone.`}
            />
        </div>
    );
};

const BotFormModal = ({ isOpen, onClose, onSave, bot }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData({
            river: bot?.river || '',
            location: bot?.location || '',
            status: bot?.status || 'Active',
            battery: bot?.battery || '100%',
        });
    }, [bot, isOpen]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={bot ? 'Edit RiverBot' : 'Add New RiverBot'}>
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
                    <label className="block text-sm font-medium text-text-dark mb-1">Status</label>
                     <div className="relative">
                        <Activity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full form-input pl-10">
                            <option>Active</option>
                            <option>Charging</option>
                            <option>Maintenance</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">Battery</label>
                    <div className="relative">
                        <Battery className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" name="battery" value={formData.battery} onChange={handleChange} required placeholder="e.g., 88%" className="w-full form-input pl-10" />
                    </div>
                </div>
                <div className="flex justify-end pt-4 space-x-4">
                    <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
                    <button type="submit" className="btn-primary">Save Bot</button>
                </div>
            </form>
        </Modal>
    );
};

// Add some base styles in a utility file or here for simplicity
const styles = `
.form-input {
    @apply w-full px-4 py-2.5 border border-border-color rounded-lg focus:ring-primary focus:border-primary;
}
.btn-secondary {
    @apply inline-block bg-gray-200 text-text-dark font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-300 transition-colors;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


export default RiverBotPage;
