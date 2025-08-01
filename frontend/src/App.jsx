import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

function App() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
  });

  // getting all tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  // create task
  const handleAddTask = async () => {
    if (!newTask.title.trim()) return;

    try {
      await axios.post(`${API_BASE_URL}/tasks`, newTask);
      setNewTask({ title: '', description: '', status: 'To Do' });
      fetchTasks();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  // delete task
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  // update task
  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/tasks/${id}`, { status });
      fetchTasks();
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  // BONUS : filter & sort tasks
  const filteredTasks = tasks
    .filter((task) => (statusFilter ? task.status === statusFilter : true))
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    // Used Generative AI to help with the Tailwind CSS styling
    <div className="min-h-screen bg-dark text-white font-sans p-6">
      <h1 className="text-4xl font-bold mb-10 text-center">Task Manager</h1>

      <div className="flex flex-col lg:flex-row justify-between gap-10">
        {/* input */}
        <div className="w-full lg:w-1/2 space-y-4">
          <input
            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
          />
          <textarea
            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>

        {/* task list */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            {/* status filter */}
            <select
              className="bg-gray-700 text-white px-3 py-2 rounded"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            {/* sort by date */}
            <select
              className="bg-gray-700 text-white px-3 py-2 rounded"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-gray-800 rounded p-4 flex justify-between items-start"
            >
              <div>
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <p className="text-gray-400">{task.description}</p>
                <p className="text-gray-500 text-sm">
                  Created: {new Date(task.createdAt).toLocaleString()}
                </p>
                <select
                  className="bg-gray-700 text-white text-sm px-2 py-1 rounded mt-2"
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task._id, e.target.value)
                  }
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              <button
                className="text-red-400 hover:text-red-600"
                onClick={() => handleDeleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;