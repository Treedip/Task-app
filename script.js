$(document).ready(async function () {
    let tasks = await handleGetAllTask();

    function renderTasks() {
        const taskList = $('#tasks');
        taskList.empty();
        tasks.map((task, index) => {
            taskList.append(`
                <li class="list-group-item">
                    <div class="task-item">
                        <span>${task.title}</span>
                        <button class="btn btn-info btn-sm float-right" onclick="viewTask(${index})">View</button>
                    </div>
                </li>
            `);
        });
    }
    renderTasks();

    $('#addTaskForm').on('submit', async function (event) {
        event.preventDefault();
        const title = $('#taskTitle').val();
        const description = $('#taskDescription').val();
        const dueDate = $('#taskDueDate').val();

        const newTask = await addTask({ title, description, dueDate });
        tasks.push(newTask);
        renderTasks();

        $('#addTaskForm')[0].reset();
    });

    window.viewTask = function (index) {
        const task = tasks[index];
        $('#editTaskTitle').val(task.title);
        $('#editTaskDescription').val(task.description);
        $('#editTaskDueDate').val(task.dueDate);
        let dueDate = task.dueDate.split('T');
        $('#dueDate').val(dueDate[0]);
        $('#taskModal').modal('show');

        $('#editTaskForm').off('submit').on('submit', async function (event) {
            event.preventDefault();
            task.title = $('#editTaskTitle').val();
            task.description = $('#editTaskDescription').val();
            task.dueDate = $('#editTaskDueDate').val();
            const newTaskData = {
                data: {
                    title: task.title,
                    description: task.description,
                    dueDate: task.dueDate
                }
            }
            await editTask(task.id, newTaskData);
            renderTasks();
            $('#taskModal').modal('hide');
        });

        $('#deleteTaskBtn').off('click').on('click', async function () {
            await deleteTask(task.id);
            renderTasks();
            $('#taskModal').modal('hide');
        });
    }
});
