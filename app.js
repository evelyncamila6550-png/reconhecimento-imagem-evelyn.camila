// Inicialização do localStorage
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}
if (!localStorage.getItem('todos')) {
    localStorage.setItem('todos', JSON.stringify([]));
}

// Elementos de UI
const authContainer = document.getElementById('auth-container');
const loginCard = document.getElementById('login-card');
const registerCard = document.getElementById('register-card');
const appContainer = document.getElementById('app-container');

const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const showRegisterBtn = document.getElementById('show-register');

const registerForm = document.getElementById('register-form');
const registerName = document.getElementById('register-name');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');
const showLoginBtn = document.getElementById('show-login');

const userGreeting = document.getElementById('user-greeting');
const logoutBtn = document.getElementById('logout-btn');

// Funções Utilitárias
function showError(elementId, message) {
    const el = document.getElementById(elementId);
    el.textContent = message;
    el.classList.remove('hidden');
}

function hideAllErrors() {
    ['login-email-error', 'login-password-error', 'login-general-error', 
     'register-name-error', 'register-email-error', 'register-password-error', 'register-general-error']
    .forEach(id => {
        const el = document.getElementById(id);
        el.classList.add('hidden');
        el.textContent = '';
    });
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Navegação
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        showApp(currentUser);
    } else {
        showLogin();
    }
}

function showLogin() {
    authContainer.classList.remove('hidden');
    appContainer.classList.add('hidden');
    loginCard.classList.remove('hidden');
    registerCard.classList.add('hidden');
    hideAllErrors();
    loginForm.reset();
}

function showRegister() {
    loginCard.classList.add('hidden');
    registerCard.classList.remove('hidden');
    hideAllErrors();
    registerForm.reset();
}

function showApp(user) {
    authContainer.classList.add('hidden');
    appContainer.classList.remove('hidden');
    userGreeting.textContent = `Bem-vindo(a), ${user.name}`;
}

// Event Listeners
showRegisterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showRegister();
});

showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showLogin();
});

// Login Submit
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAllErrors();

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();
    let isValid = true;

    if (!email) {
        showError('login-email-error', 'O e-mail é obrigatório');
        isValid = false;
    }
    if (!password) {
        showError('login-password-error', 'A senha é obrigatória');
        isValid = false;
    }

    if (!isValid) return;

    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
        showError('login-general-error', 'E-mail não cadastrado');
        return;
    }

    if (user.password !== password) {
        showError('login-general-error', 'Senha incorreta');
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    showApp(user);
});

// Register Submit
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAllErrors();

    const name = registerName.value.trim();
    const email = registerEmail.value.trim();
    const password = registerPassword.value.trim();
    let isValid = true;

    if (!name) {
        showError('register-name-error', 'O nome é obrigatório');
        isValid = false;
    }
    if (!email) {
        showError('register-email-error', 'O e-mail é obrigatório');
        isValid = false;
    }
    if (!password) {
        showError('register-password-error', 'A senha é obrigatória');
        isValid = false;
    }

    if (!isValid) return;

    const users = getUsers();
    if (users.some(u => u.email === email)) {
        showError('register-general-error', 'Este e-mail já está em uso');
        return;
    }

    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password // Senha em texto plano apenas para simulação
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    showApp(newUser);
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    showLogin();
});

// Init
checkAuth();
