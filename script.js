window.onload = function() {
    if (window.location.href.includes('plano_alimentar.html')) {
        const user = localStorage.getItem('loggedUser');
        if (user === 'Julia') {
            document.getElementById('add-item-form').style.display = 'block';
        }
        loadItems();
    }
};

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    if (username === 'Julia' && password === '252023') {
        localStorage.setItem('loggedUser', 'Julia');
        window.location.href = 'plano_alimentar.html';
    } else {
        errorMessage.textContent = 'Usuário ou senha incorretos!';
    }
}

function showDay(dayId) {
    const days = document.querySelectorAll('.day');
    days.forEach(day => day.classList.remove('active'));
    const buttons = document.querySelectorAll('.menu button');
    buttons.forEach(button => button.classList.remove('active'));
    document.getElementById(dayId).classList.add('active');
    const button = Array.from(buttons).find(b => b.textContent.toLowerCase().includes(dayId));
    if (button) button.classList.add('active');
}

function addItem() {
    const day = document.getElementById('item-day').value;
    const title = document.getElementById('item-title').value;
    const time = document.getElementById('item-time').value;
    const content = document.getElementById('item-content').value;
    if (!title || !time || !content) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    const mealDiv = document.createElement('div');
    mealDiv.className = 'meal';
    mealDiv.innerHTML = `<h3>${title} (${time})</h3><label><input type="checkbox" /> ${content}</label>`;
    document.getElementById(day).appendChild(mealDiv);
    const savedItems = JSON.parse(localStorage.getItem('addedItems') || '{}');
    if (!savedItems[day]) savedItems[day] = [];
    savedItems[day].push({title, time, content});
    localStorage.setItem('addedItems', JSON.stringify(savedItems));
    document.getElementById('item-title').value = '';
    document.getElementById('item-time').value = '';
    document.getElementById('item-content').value = '';
    alert('Item adicionado!');
}

function loadItems() {
    const savedItems = JSON.parse(localStorage.getItem('addedItems') || '{}');
    for (const day in savedItems) {
        savedItems[day].forEach(item => {
            const mealDiv = document.createElement('div');
            mealDiv.className = 'meal';
            mealDiv.innerHTML = `<h3>${item.title} (${item.time})</h3><label><input type="checkbox" /> ${item.content}</label>`;
            document.getElementById(day).appendChild(mealDiv);
        });
    }
}