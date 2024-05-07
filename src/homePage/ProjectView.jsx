import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProjectView = () => {
    const { projectId } = useParams(); // Get projectId from URL params
    const [project, setProject] = useState(null);
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [exported, setExported] = useState(false); // State to track if export is done

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/projects/${projectId}`);
                setProject(response.data);
            } catch (error) {
                console.error('Error fetching project details:', error);
            }
        };

        const fetchTodos = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/projects/${projectId}/todos`);
                setTodos(response.data);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchProjectDetails();
        fetchTodos();
    }, [projectId]);

    const handleAddTodo = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/projects/${projectId}/todos`, { description: newTodo });
            setTodos([...todos, response.data]);
            setNewTodo('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const handleUpdateTodo = async (todoId, newDescription) => {
        try {
            await axios.put(`http://localhost:8080/api/todos/${todoId}`, { description: newDescription });
            const updatedTodos = todos.map((todo) => (todo.id === todoId ? { ...todo, description: newDescription } : todo));
            setTodos(updatedTodos);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleCompleteTodo = async (todoId) => {
        try {
            await axios.put(`http://localhost:8080/api/todos/${todoId}/complete`);
            const updatedTodos = todos.map((todo) => (todo.id === todoId ? { ...todo, completed: true } : todo));
            setTodos(updatedTodos);
        } catch (error) {
            console.error('Error marking todo as completed:', error);
        }
    };

    const handleRemoveTodo = async (todoId) => {
        try {
            await axios.delete(`http://localhost:8080/api/todos/${todoId}`);
            const updatedTodos = todos.filter((todo) => todo.id !== todoId);
            setTodos(updatedTodos);
        } catch (error) {
            console.error('Error removing todo:', error);
        }
    };

    const handleEditProjectTitle = async (newTitle) => {
        try {
            await axios.put(`http://localhost:8080/api/projects/${projectId}`, { title: newTitle });
            setProject({ ...project, title: newTitle });
        } catch (error) {
            console.error('Error updating project title:', error);
        }
    };

    const handleRemoveProject = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/projects/${projectId}`);
            // Redirect to homepage or another page after project removal
        } catch (error) {
            console.error('Error removing project:', error);
        }
    };

    const exportAsGist = async () => {
        try {
            // Generate markdown content here
            const markdownContent = `
# ${project ? project.title : 'Project Title'}

## Summary
${todos.filter(todo => todo.completed).length} / ${todos.length} completed.

## Section 1: Pending Todos
${todos.filter(todo => !todo.completed).map(todo => `- [ ] ${todo.description}`).join('\n')}

## Section 2: Completed Todos
${todos.filter(todo => todo.completed).map(todo => `- [x] ${todo.description}`).join('\n')}
`;

            // Save the markdown content locally
            const blob = new Blob([markdownContent], { type: 'text/markdown' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${project ? project.title : 'Project'}.md`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Update state to indicate export is done
            setExported(true);
        } catch (error) {
            console.error('Error exporting as gist:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>{project ? project.title : 'Loading...'}</h1>
            <div className="card">
                <div className="card-body">
                    {/* Render project details */}
                    {project && (
                        <div>
                            <h2>Project Details</h2>
                            <p>{project.description}</p>
                        </div>
                    )}

                    {/* Render todos */}
                    <h2>Todos</h2>
                    <ul className="list-group">
                        {todos.map((todo) => (
                            <li key={todo.id} className={`list-group-item ${todo.completed ? 'list-group-item-success' : ''}`}>
                                {todo.description}
                                {!todo.completed && (
                                    <>
                                        <button className="btn btn-sm btn-info mx-2" onClick={() => handleUpdateTodo(todo.id, prompt('Enter new description:', todo.description))}>Edit</button>
                                        <button className="btn btn-sm btn-success mx-2" onClick={() => handleCompleteTodo(todo.id)}>Complete</button>
                                    </>
                                )}
                                <button className="btn btn-sm btn-danger mx-2" onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>

                    {/* Add todo form */}
                    <form onSubmit={(e) => { e.preventDefault(); handleAddTodo(); }} className="mt-3">
                        <div className="input-group">
                            <input type="text" className="form-control" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} required />
                            <button type="submit" className="btn btn-primary">Add Todo</button>
                        </div>
                    </form>

                    {/* Edit project title */}
                    <button className="btn btn-primary mt-3" onClick={() => handleEditProjectTitle(prompt('Enter new project title:', project ? project.title : ''))}>Edit Project Title</button>

                    {/* Remove project */}
                    <button className="btn btn-danger mt-3" onClick={handleRemoveProject}>Remove Project</button>

                    {/* Export as Gist */}
                    {!exported && (
                        <button className="btn btn-primary mt-3" onClick={exportAsGist}>Export as Gist</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectView;
