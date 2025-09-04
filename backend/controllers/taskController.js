const Task = require("../models/Task");

// @desc    Get all tasks (Admin: all, User: only assigned tasks)
// @route   GET /api/tasks/
// @access  Private
const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    let tasks;

    if (req.user.role === "admin") {
      // Admin can access all tasks with populated fields
      tasks = await Task.find(filter).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
    } else {
      // Non-admin users can access only tasks assigned to them
      tasks = await Task.find({ ...filter, assignedTo: req.user._id }).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
    }

    //Add completed todo checklist count to each task
    task = await Promise.all(
        tasks.map(async(task) => {
            const completedCount = task.todoChecklist.filter(
                (item) => item.completed
            ).length;
            return { ...task._doc, completedTodoCount: completedCount};
        })
    );

    // Status summary counts 
    const allTasks = await Task.countDocuments(
        req.user.role === "admin" ? {} : { assignedTo: req.user._id }
    );

    const pendingTasks = await Task.countDocuments({
        ...filter,
        status: "Pending",
        ...(req.user.role !== "admin" && { assignedTo: req.user._id })
    });

    const inProgressTasks = await Task.countDocuments({
        ...filter,
        status: "In Progress",
        ...(req.user.role !== "admin" && { assignedTo: req.user._id })
    });

    const completedTasks = await Task.countDocuments({
        ...filter,
        status: "Completed",
        ...(req.user.role !== "admin" && { assignedTo: req.user._id })
    });

    res.json({
        tasks,
        statusSummary: {
            all: allTasks,
            pendingTasks,
            inProgressTasks, 
            completedTasks
        },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Get task by ID
 * @route   GET /api/tasks/:id
 * @access  Private
 */
const getTaskById = async (req, res) => {
  try {
    // Logic to retrieve task by ID
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create a new task (Admin only)
// @route   POST /api/tasks/
// @access  Private
const createTask = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      priority,   
      dueDate, 
      assignedTo, 
      attachments, 
      todoChecklist 
    } = req.body;

    // Validate if 'assignedTo' is an array
    if (!Array.isArray(assignedTo)) {
      return res.status(400).json({ message: "assignedTo must be an array of user IDs" });
    }
    const task = await Task.create({
        title,
        description,
        priority,
        dueDate,
        assignedTo,
        createdBy: req.user._id,
        todoChecklist,
        attachments,
    });

    // Respond with success
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Update task details
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
const updateTask = async (req, res) => {
  try {
    // Logic to update task details
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Delete a task (Admin only)
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
const deleteTask = async (req, res) => {
  try {
    // Logic to delete task
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Update task status
 * @route   PUT /api/tasks/:id/status
 * @access  Private
 */
const updateTaskStatus = async (req, res) => {
  try {
    // Logic to update task status
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Update task checklist
 * @route   PUT /api/tasks/:id/todo
 * @access  Private
 */
const updateTaskChecklist = async (req, res) => {
  try {
    // Logic to update task checklist
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Dashboard Data (Admin only)
 * @route   GET /api/tasks/dashboard-data
 * @access  Private
 */
const getDashboardData = async (req, res) => {
  try {
    // Logic to fetch dashboard data for admin
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Dashboard Data (User-specific)
 * @route   GET /api/tasks/user-dashboard-data
 * @access  Private
 */
const getUserDashboardData = async (req, res) => {
  try {
    // Logic to fetch user-specific dashboard data
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist, getDashboardData, getUserDashboardData };
