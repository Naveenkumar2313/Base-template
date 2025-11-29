import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../shared/Card';
import { departments, courses, articulationMatrix, pos, psos } from '../data/mockData';

const DepartmentAttainmentPage = () => {
    const [selectedDepartment, setSelectedDepartment] = useState(departments[0].id);
    const allOutcomes = [...pos, ...psos];

    const calculateDepartmentAverages = (deptId) => {
        const deptCourses = courses.filter(c => c.departmentId === deptId);
        const averages = {};
        
        allOutcomes.forEach(outcome => {
            let sum = 0;
            let count = 0;
            deptCourses.forEach(course => {
                const courseMatrix = articulationMatrix[course.id];
                if (courseMatrix) {
                    course.cos.forEach(co => {
                        const value = courseMatrix[co.id]?.[outcome.id];
                        if (value) {
                            sum += value;
                            count++;
                        }
                    });
                }
            });
            if (count > 0) {
                averages[outcome.id] = sum / count;
            }
        });
        return averages;
    };

    const averages = calculateDepartmentAverages(selectedDepartment);

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Department Attainment</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        View consolidated attainment levels across different departments.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="block w-full sm:w-56 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        {departments.map(dept => (
                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Outcome Attainment Levels</CardTitle>
                    <CardDescription>Average attainment for all courses in {departments.find(d => d.id === selectedDepartment)?.name}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Outcome</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Average Level</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {allOutcomes.map(outcome => {
                                    const avg = averages[outcome.id] || 0;
                                    return (
                                        <tr key={outcome.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{outcome.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                <div className="flex items-center">
                                                    <span className="mr-2">{avg.toFixed(2)}</span>
                                                    <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                                        <div 
                                                            className={`h-2 rounded-full ${avg >= 2.5 ? 'bg-green-500' : avg >= 1.5 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                            style={{ width: `${(avg / 3) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    avg >= 2.5 
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
                                                        : avg >= 1.5 
                                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' 
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                                                }`}>
                                                    {avg >= 2.5 ? 'Target Met' : 'In Progress'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DepartmentAttainmentPage;