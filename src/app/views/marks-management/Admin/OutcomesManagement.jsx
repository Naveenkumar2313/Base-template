import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../shared/Card';
import { Icons } from '../shared/icons';
import { pos as mockPos, psos as mockPsos } from '../data/mockData';
import ConfirmationModal from '../shared/ConfirmationModal';

const OutcomesManagement = () => {
    const [pos, setPos] = useState(mockPos);
    const [psos, setPsos] = useState(mockPsos);
    const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, outcomeId: null, type: null });

    // ... (Use the same handler logic from your original file: handleAddPo, handleDescriptionChange, etc.)

    return (
        <div className="p-6 space-y-6">
            {deleteConfirmation.isOpen && <ConfirmationModal /* ... props */ />}
            
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Manage Program Outcomes (POs)</CardTitle>
                            <CardDescription>Define the POs for the department.</CardDescription>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium">
                           <Icons.PlusCircle className="h-4 w-4" /> Add PO
                        </button>
                    </div>
                </CardHeader>
                <CardContent>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase w-24">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Description</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase w-24">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {pos.map(po => (
                                <tr key={po.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{po.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        <input 
                                            type="text"
                                            value={po.description}
                                            onChange={(e) => handleDescriptionChange(po.id, e.target.value, 'po')}
                                            className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => requestDeleteOutcome(po.id, 'po')} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                                            <Icons.Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Manage Program Specific Outcomes (PSOs)</CardTitle>
                </CardHeader>
                <CardContent>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase w-24">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Description</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase w-24">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {psos.map(pso => (
                                <tr key={pso.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{pso.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                         <input 
                                            type="text"
                                            value={pso.description}
                                            onChange={(e) => handleDescriptionChange(pso.id, e.target.value, 'pso')}
                                            className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => requestDeleteOutcome(pso.id, 'pso')} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                                            <Icons.Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
};

export default OutcomesManagement;