import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { departments, users as mockUsers, courses as mockCourses } from '../data/mockData';

const AdminDashboard = () => {
    const { user } = useAuth();
    
    // Logic extracted from your original DashboardOverview
    const department = departments.find(d => d.id === user?.departmentId);
    const facultyCount = mockUsers.filter(u => u.role === 'faculty' && u.departmentId === user?.departmentId).length;
    const courseCount = mockCourses.length;

    if (!user) return null;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{department?.name}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Faculty</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-gray-900 dark:text-white">{facultyCount}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Total Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-gray-900 dark:text-white">{courseCount}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;