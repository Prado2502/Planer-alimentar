// Executa ao carregar a página
window.onload = function () {
    const currentPage = window.location.href;
    const user = localStorage.getItem('loggedUser');

    if (currentPage.includes('plano_alimentar.html')) {
        if (user) {
            document.getElementById('add-item-form').style.display = 'block';
            document.getElementById('logout-btn').style.display = 'block';
        }
        loadItems();
    }
};

// Login do usuário
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (users[username] && users[username] === password) {
        localStorage.setItem('loggedUser', username);
        window.location.href = 'plano_alimentar.html';
    } else {
        errorMessage.textContent = 'Usuário ou senha incorretos!';
    }
}

// Registro de novo usuário
function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (!username || !password) {
        errorMessage.textContent = 'Preencha nome e senha.';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (users[username]) {
        errorMessage.textContent = 'Usuário já existe!';
    } else {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedUser', username);
        window.location.href = 'plano_alimentar.html';
    }
}

// Logout
function logout() {
    localStorage.removeItem('loggedUser');
    window.location.href = 'index.html'; // ou página de login
}

// Alternar exibição dos dias
function showDay(dayId) {
    const days = document.querySelectorAll('.day');
    days.forEach(day => day.classList.remove('active'));

    const buttons = document.querySelectorAll('.menu button');
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(dayId).classList.add('active');

    const button = document.querySelector(`.menu button[onclick="showDay('${dayId}')"]`);
    if (button) button.classList.add('active');
}

// Adicionar item personalizado ao plano
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
    mealDiv.setAttribute('data-added', 'true');
    mealDiv.innerHTML = `<h3>${title} (${time})</h3><label><input type="checkbox" /> ${content}</label>`;

    document.getElementById(day).appendChild(mealDiv);

    const savedItems = JSON.parse(localStorage.getItem('addedItems') || '{}');
    if (!savedItems[day]) savedItems[day] = [];
    savedItems[day].push({ title, time, content });
    localStorage.setItem('addedItems', JSON.stringify(savedItems));

    document.getElementById('item-title').value = '';
    document.getElementById('item-time').value = '';
    document.getElementById('item-content').value = '';
    alert('Item adicionado!');
}

// Carregar itens salvos
function loadItems() {
    const savedItems = JSON.parse(localStorage.getItem('addedItems') || '{}');

    for (const day in savedItems) {
        const dayDiv = document.getElementById(day);

        // Remove itens adicionados anteriormente para evitar duplicação
        const added = dayDiv.querySelectorAll('.meal[data-added="true"]');
        added.forEach(el => el.remove());

        savedItems[day].forEach(item => {
            const mealDiv = document.createElement('div');
            mealDiv.className = 'meal';
            mealDiv.setAttribute('data-added', 'true');
            mealDiv.innerHTML = `<h3>${item.title} (${item.time})</h3><label><input type="checkbox" /> ${item.content}</label>`;
            dayDiv.appendChild(mealDiv);
        });
    }
}
