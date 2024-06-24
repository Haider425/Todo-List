document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('#toggleDark');
    const icon = toggle.querySelector('i');

    // Function to update the icon based on the theme
    const updateIcon = (theme) => {
        if (theme === 'dark') {
            icon.classList.remove('bi-brightness-high-fill');
            icon.classList.add('bi-moon');
        } else {
            icon.classList.remove('bi-moon');
            icon.classList.add('bi-brightness-high-fill');
        }
    };

    // Check the saved theme in localStorage and apply it
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme === 'dark' ? 'dark-theme' : 'light-theme');
        updateIcon(savedTheme);
    } else {
        // Default to light theme if no saved theme
        updateIcon('light');
    }

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        updateIcon(theme);
    });

    // Task List
    const input = document.querySelector("#task");
    const list = document.querySelector("#task-list");

    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.querySelector("#add").click();
        }
    });

    document.querySelector("#add").addEventListener("click", function() {
        const task = input.value;
        if (task) {
            addTask(task);
            input.value = "";
            saveTasks();
        }
    });

    // Function to add a task to the list
    function addTask(taskText, completed = false) {
        const li = document.createElement("li");
        li.innerHTML = taskText + "<span class='close'>&times;</span>";
        if (completed) {
            li.classList.add("completed");
        }
        list.appendChild(li);

        // Event listener for marking a task as completed
        li.addEventListener("click", function(event) {
            if (!event.target.classList.contains('close')) {
                li.classList.toggle("completed");
                saveTasks();
            }
        });

        // Event listener for removing a task
        li.querySelector('.close').addEventListener('click', function() {
            li.remove();
            saveTasks();
        });
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        list.querySelectorAll("li").forEach(function(li) {
            tasks.push({
                text: li.childNodes[0].textContent,
                completed: li.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(function(task) {
            addTask(task.text, task.completed);
        });
    }

    // Load tasks when the page loads
    loadTasks();
});
