import React, { useState, useContext } from 'react';
import moment from 'moment';
import "./task.css";
import TaskContext from '../../context/TaskContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateIcon from '@mui/icons-material/Update';

function Task({ task, id }) {
    const { dispatch } = useContext(TaskContext);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(task.title);
    const [updatedDescription, setUpdatedDescription] = useState(task.description);

    const handleRemove = () => {
        dispatch({
            type: "REMOVE_TASK",
            id
        });
    }

    const handleMarkDone = () => {
        dispatch({
            type: "MARK_DONE",
            id
        });
    }

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        // Dispatch action to update task
        dispatch({
            type: "UPDATE_TASK",
            id,
            title: updatedTitle,
            description: updatedDescription,
        });
        // Close editing mode
        setIsEditing(false);
    }

    return (
        <div className='bg-slate-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3'>
            <div className="mark-done">
                <input type="checkbox" className="checkbox" onChange={handleMarkDone} checked={task.completed} />
            </div>
            {isEditing ? (
                <div className="task-info text-slate-900 text-sm w-10/12">
                    <form onSubmit={handleUpdate}>
                        <input
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            className="edit-input"
                            required
                        />
                        <input
                            type="text"
                            value={updatedDescription}
                            onChange={(e) => setUpdatedDescription(e.target.value)}
                            className="edit-input"
                            required
                        />
                        <button type="submit" className="update-btn">
                            <UpdateIcon />
                        </button>
                    </form>
                </div>
            ) : (
                <div className="task-info text-slate-900 text-sm w-10/12">
                    <h4 className="task-title text-lg capitalize">{task.title}</h4>
                    <p className="task-description">{task.description}</p>
                    <div className=' italic opacity-60'>
                        {task?.createdAt ? (
                            <p>{moment(task.createdAt).fromNow()}</p>
                        ) : (
                            <p>just now</p>
                        )}
                    </div>
                </div>
            )}
            <div className="task-actions">
                <EditIcon
                    style={{ fontSize: 20, cursor: "pointer" }}
                    onClick={handleEditToggle}
                />
                <DeleteIcon
                    style={{ fontSize: 20, cursor: "pointer" }}
                    onClick={handleRemove}
                />
            </div>
        </div>
    );
}

export default Task;
