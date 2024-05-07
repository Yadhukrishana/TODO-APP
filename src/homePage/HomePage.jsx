import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import CreateProjectForm from './CreateProjectForm.jsx';

const HomePage = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/projects/list');
                setProjects(response.data);
            } catch (error) {
                setError('Error fetching projects. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Home Page</h1>
            <CreateProjectForm />
            {isLoading ? (
                <p>Loading projects...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <h2 className="mt-4">Existing Projects:</h2>
                    <ul className="list-group">
                        {projects.map((project) => (
                            <li key={project.id} className="list-group-item">
                                {project.title}{' '}
                                <Link to={`/projects/${project.id}`} className="btn btn-primary">View</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HomePage;
