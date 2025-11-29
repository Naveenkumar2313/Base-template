import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { departments, users, courses } from '../data/mockData';

const SuperAdminDashboard = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Super Admin Dashboard</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Overview of all departments</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Departments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-gray-900 dark:text-white">{departments.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Faculty</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-gray-900 dark:text-white">
                            {users.filter(u => u.role === 'faculty').length}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-gray-900 dark:text-white">{courses.length}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;