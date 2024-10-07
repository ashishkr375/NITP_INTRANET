// CourseTable.js
import React, { useEffect, useState } from 'react';

const CourseTable = ({ email }) => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [courseCodeFilter, setCourseCodeFilter] = useState('');
    const [semesterFilter, setSemesterFilter] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`https://admin.nitp.ac.in/api/course/byEmail?email=${email}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setCourses(data);
                    setFilteredCourses(data);
                } else {
                    console.error('Fetched data is not an array:', data);
                    setCourses([]);
                    setFilteredCourses([]);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
                setCourses([]);
                setFilteredCourses([]);
            }
        };

        fetchCourses();
    }, [email]);

    const handleFilter = () => {
        setFilteredCourses(
            courses.filter(course => {
                const matchesCourseCode = courseCodeFilter === '' || course.course_code.includes(courseCodeFilter);
                const matchesSemester = semesterFilter === '' || course.semester.toString() === semesterFilter;
                return matchesCourseCode && matchesSemester;
            })
        );
    };

    useEffect(() => {
        handleFilter();
    }, [courseCodeFilter, semesterFilter, courses]);

    return (
        <div className="p-5 text-[0.60rem] md:text-base">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Filter by Course Code"
                    className="border rounded-lg p-2 mr-2"
                    value={courseCodeFilter}
                    onChange={(e) => setCourseCodeFilter(e.target.value)}
                />
                <select
                    className="border rounded-lg p-2"
                    value={semesterFilter}
                    onChange={(e) => setSemesterFilter(e.target.value)}
                >
                    <option value="">All Semesters</option>
                    {[...Array(12).keys()].map(i => (
                        <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                    ))}
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b">Course Code</th>
                            <th className="py-2 px-4 border-b">Title</th>
                            <th className="py-2 px-4 border-b">Remark</th>
                            <th className="py-2 px-4 border-b">Drive Link</th>
                            <th className="py-2 px-4 border-b">Semester</th>
                            <th className="py-2 px-4 border-b">Upload Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map(course => (
                                <tr key={course.id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b">{course.course_code}</td>
                                    <td className="py-2 px-4 border-b">{course.title}</td>
                                    <td className="py-2 px-4 border-b">{course.remark}</td>
                                    <td className="py-2 px-4 border-b">
                                        <a href={course.drive_link} target="_blank" rel="noopener noreferrer" className="text-blue-500">View</a>
                                    </td>
                                    <td className="py-2 px-4 border-b">{course.semester}</td>
                                    <td className="py-2 px-4 border-b">{new Date(course.timestamp).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-2">No courses found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CourseTable;
