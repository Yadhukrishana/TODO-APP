import React, { useState } from 'react';

const CreateProjectForm = ({ onCreateProject }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onCreateProject(title);
            setTitle('');
        }
    };

    return (
        <div className="mt-4">
            <h2>Create New Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="projectTitle" className="form-label">Project Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="projectTitle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Project</button>
            </form>
        </div>
    );
};

export default CreateProjectForm;
