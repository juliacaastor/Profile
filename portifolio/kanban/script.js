
document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    
   
    loadTasks();
    
   
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    function addTask() {
        const description = taskInput.value.trim();
        if (description === '') return;
        
        createTask(description, 'open');
        taskInput.value = '';
        
       
        saveTasks();
        updateTaskCounts();
    }
    
    function createTask(description, columnId) {
        const taskId = Date.now().toString();
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.id = taskId;
        taskCard.draggable = true;
        taskCard.setAttribute('data-column', columnId);
        
        taskCard.innerHTML = `
            ${description}
            <button class="delete-btn" onclick="deleteTask('${taskId}')">×</button>
        `;
        
       
        taskCard.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', e.target.id);
        });
        
        document.getElementById(`${columnId}-tasks`).appendChild(taskCard);
        updateTaskCounts();
    }
    
    function allowDrop(e) {
        e.preventDefault();
    }
    
    function drop(e) {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('text/plain');
        const task = document.getElementById(taskId);
        const columnId = e.target.closest('.column').id.replace('-column', '');
        
      
        task.setAttribute('data-column', columnId);
        
       
        e.target.appendChild(task);
        
      
        saveTasks();
        updateTaskCounts();
    }
    
    function deleteTask(taskId) {
        if (confirm('Tem certeza que deseja remover esta tarefa?')) {
            const task = document.getElementById(taskId);
            task.remove();
            
            saveTasks();
            updateTaskCounts();
        }
    }
    
    
    window.deleteTask = deleteTask;
    window.allowDrop = allowDrop;
    window.drop = drop;
    
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-card').forEach(task => {
            tasks.push({
                id: task.id,
                description: task.textContent.trim().replace('×', '').trim(),
                column: task.getAttribute('data-column')
            });
        });
        
        localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
    }
    
    function loadTasks() {
        const savedTasks = localStorage.getItem('kanbanTasks');
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            tasks.forEach(task => {
                createTask(task.description, task.column);
            });
        }
        updateTaskCounts();
    }
    
    function updateTaskCounts() {
        const columns = ['open', 'bid', 'progress', 'delivered'];
        
        columns.forEach(column => {
            const count = document.getElementById(`${column}-tasks`).children.length;
            document.getElementById(`${column}-count`).textContent = `${count} tarefa${count !== 1 ? 's' : ''}`;
        });
    }
});
