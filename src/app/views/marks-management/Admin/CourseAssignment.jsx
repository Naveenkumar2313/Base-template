import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../shared/Card';
import { courses as mockCourses, users as mockUsers } from '../data/mockData';
import { useAuth } from '../../../contexts/AuthContext';

const CourseAssignment = () => {
    const { user } = useAuth();
    // In a real app, you would fetch these from an API
    const [courses, setCourses] = useState(mockCourses);
    const [assignments, setAssignments] = useState({});

    // Filter faculty based on the logged-in admin's department
    const faculty = mockUsers.filter(u => u.role === 'faculty' && u.departmentId === user?.departmentId);

    useEffect(() => {
        const initial = {};
        courses.forEach(c => {
            if (c.assignedFacultyId) {
                initial[c.id] = c.assignedFacultyId;
            }
        });
        setAssignments(initial);
    }, [courses]);

    const handleAssignmentChange = (courseId, facultyId) => {
        setAssignments(prev => ({ ...prev, [courseId]: facultyId }));
        // Update local state or make API call to save assignment
    };

    return (
     <div className="p-6">
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Assign Courses</CardTitle>
                        <CardDescription>Assign courses to faculty members for the upcoming semester.</CardDescription>
                    </div>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium">Save Changes</button>
                </div>
            </CardHeader>
            <CardContent>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Course Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Course Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Assigned Faculty</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {courses.map(course => (
                            <tr key={course.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700 dark:text-gray-300">{course.code}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{course.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                <select 
                                    value={assignments[course.id] || ''} 
                                    onChange={(e) => handleAssignmentChange(course.id, e.target.value)}
                                    className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                        <option value="">Unassigned</option>
                                        {faculty.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                                    </select>
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

export default CourseAssignment;