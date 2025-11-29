import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../shared/Card';
import { Icons } from '../shared/icons';
import { courses as mockCourses } from '../data/mockData';
import ConfirmationModal from '../shared/ConfirmationModal';

const CourseModal = ({ isOpen, onClose, onSave, course = null }) => {
    const [formData, setFormData] = useState({ code: '', name: '', semester: 1, credits: 4 });

    useEffect(() => {
        if (course) {
            setFormData({ code: course.code, name: course.name, semester: course.semester, credits: course.credits || 4 });
        } else {
            setFormData({ code: '', name: '', semester: 1, credits: 4 });
        }
    }, [course, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{course ? 'Edit Course' : 'Add New Course'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Form Fields... (Same as your original code) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course Code</label>
                        <input type="text" required value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="e.g., CS301" />
                    </div>
                    {/* ... Add other fields: Name, Semester, Credits ... */}
                    
                    <div className="flex justify-end space-x-3 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const CourseManagement = () => {
    const [courses, setCourses] = useState(mockCourses);
    const [modal, setModal] = useState({ isOpen: false, course: null });
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, courseId: null });

    const handleSave = (courseData) => {
        if (modal.course) {
            setCourses(courses.map(c => c.id === modal.course.id ? { ...c, ...courseData } : c));
        } else {
            const newCourse = { ...courseData, id: `C${Date.now()}`, cos: [], assignedFacultyId: null };
            setCourses([...courses, newCourse]);
        }
        setModal({isOpen: false, course: null});
    };

    const confirmDelete = () => {
        setCourses(courses.filter(c => c.id !== deleteModal.courseId));
        setDeleteModal({ isOpen: false, courseId: null });
    };

    return (
        <div className="p-6">
            <CourseModal isOpen={modal.isOpen} onClose={() => setModal({ isOpen: false, course: null })} onSave={handleSave} course={modal.course} />
            {deleteModal.isOpen && <ConfirmationModal onConfirm={confirmDelete} onCancel={() => setDeleteModal({ isOpen: false, courseId: null })} title="Delete Course" message="Are you sure you want to delete this course?" />}

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Manage Courses</CardTitle>
                            <CardDescription>Add, edit, and manage courses offered by the department.</CardDescription>
                        </div>
                        <button onClick={() => setModal({ isOpen: true, course: null })} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium flex items-center gap-2">
                            <Icons.PlusCircle className="h-4 w-4" /> Add Course
                        </button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Code</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Course Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Semester</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {courses.map(course => (
                                    <tr key={course.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700 dark:text-gray-300">{course.code}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{course.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{course.semester}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => setModal({ isOpen: true, course })} className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">Edit</button>
                                            <button onClick={() => setDeleteModal({ isOpen: true, courseId: course.id })} className="ml-4 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CourseManagement;