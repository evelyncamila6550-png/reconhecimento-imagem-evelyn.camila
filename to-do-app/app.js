// ─────────────────────────────────────────────────────────────
//  DB helpers — simulates db.json via localStorage
// ─────────────────────────────────────────────────────────────
function dbGet(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function dbSet(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Init storage if first visit
if (!localStorage.getItem('users')) dbSet('users', []);
if (!localStorage.getItem('todos')) dbSet('todos', []);

// ─────────────────────────────────────────────────────────────
//  Selectors
// ─────────────────────────────────────────────────────────────
const authContainer      = document.getElementById('auth-container');
const dashboardContainer = document.getElementById('dashboard-container');

// — Login
const loginCard          = document.getElementById('login-card');
const loginForm          = document.getElementById('login-form');
const loginEmailInput    = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
const goToRegisterBtn    = document.getElementById('go-to-register');

// — Register
const registerCard          = document.getElementById('register-card');
const registerForm          = document.getElementById('register-form');
const registerNameInput     = document.getElementById('register-name');
const registerEmailInput    = document.getElementById('register-email');
const registerPasswordInput = document.getElementById('register-password');
const goToLoginBtn          = document.getElementById('go-to-login');

// — Dashboard
const headerGreeting = document.getElementById('header-greeting');
const logoutBtn      = document.getElementById('logout-btn');

// — Add task form
const addTaskForm        = document.getElementById('add-task-form');
const taskTitleInput     = document.getElementById('task-title');
const taskTypeSelect     = document.getElementById('task-type');
const taskDescTextarea   = document.getElementById('task-description');
const taskTitleError     = document.getElementById('task-title-error');

// — Tasks
const tasksList    = document.getElementById('tasks-list');
const tasksSummary = document.getElementById('tasks-summary');

// ─────────────────────────────────────────────────────────────
//  Error helpers
// ─────────────────────────────────────────────────────────────
function setError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.remove('hidden');
}

function clearError(id) {
  const el = document.getElementById(id);
  el.textContent = '';
  el.classList.add('hidden');
}

function clearAllErrors(ids) {
  ids.forEach(clearError);
}

// ─────────────────────────────────────────────────────────────
//  Auth routing
// ─────────────────────────────────────────────────────────────
function showLoginCard() {
  loginCard.classList.remove('hidden');
  loginCard.classList.add('slide-in');
  registerCard.classList.add('hidden');
  clearAllErrors(['login-email-error','login-password-error','login-general-error']);
  loginForm.reset();
}

function showRegisterCard() {
  registerCard.classList.remove('hidden');
  registerCard.classList.add('slide-in');
  loginCard.classList.add('hidden');
  clearAllErrors(['register-name-error','register-email-error','register-password-error','register-general-error']);
  registerForm.reset();
}

function showDashboard(user) {
  authContainer.classList.add('hidden');
  dashboardContainer.classList.remove('hidden');
  dashboardContainer.classList.add('fade-in');
  headerGreeting.textContent = `Olá, ${user.name} 👋`;
  renderTasks();
}

function showAuth() {
  dashboardContainer.classList.add('hidden');
  authContainer.classList.remove('hidden');
  showLoginCard();
}

// ─────────────────────────────────────────────────────────────
//  Session
// ─────────────────────────────────────────────────────────────
function currentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

function checkSession() {
  const user = currentUser();
  if (user) {
    showDashboard(user);
  } else {
    showAuth();
  }
}

// ─────────────────────────────────────────────────────────────
//  Login flow
// ─────────────────────────────────────────────────────────────
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  clearAllErrors(['login-email-error','login-password-error','login-general-error']);

  const email    = loginEmailInput.value.trim();
  const password = loginPasswordInput.value.trim();
  let valid      = true;

  if (!email) {
    setError('login-email-error', 'O e-mail é obrigatório');
    valid = false;
  }
  if (!password) {
    setError('login-password-error', 'A senha é obrigatória');
    valid = false;
  }
  if (!valid) return;

  const users = dbGet('users');
  const user  = users.find(u => u.email === email);

  if (!user) {
    setError('login-general-error', 'E-mail não encontrado. Crie uma conta primeiro.');
    return;
  }
  if (user.password !== password) {
    setError('login-general-error', 'Senha incorreta. Tente novamente.');
    return;
  }

  localStorage.setItem('currentUser', JSON.stringify(user));
  showDashboard(user);
});

// ─────────────────────────────────────────────────────────────
//  Register flow
// ─────────────────────────────────────────────────────────────
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  clearAllErrors(['register-name-error','register-email-error','register-password-error','register-general-error']);

  const name     = registerNameInput.value.trim();
  const email    = registerEmailInput.value.trim();
  const password = registerPasswordInput.value.trim();
  let valid      = true;

  if (!name) {
    setError('register-name-error', 'O nome é obrigatório');
    valid = false;
  }
  if (!email) {
    setError('register-email-error', 'O e-mail é obrigatório');
    valid = false;
  }
  if (!password) {
    setError('register-password-error', 'A senha é obrigatória');
    valid = false;
  }
  if (password && password.length < 6) {
    setError('register-password-error', 'A senha deve ter pelo menos 6 caracteres');
    valid = false;
  }
  if (!valid) return;

  const users = dbGet('users');
  if (users.some(u => u.email === email)) {
    setError('register-general-error', 'Este e-mail já está cadastrado');
    return;
  }

  const newUser = { id: Date.now().toString(), name, email, password };
  users.push(newUser);
  dbSet('users', users);

  localStorage.setItem('currentUser', JSON.stringify(newUser));
  showDashboard(newUser);
});

// ─────────────────────────────────────────────────────────────
//  Navigation toggles
// ─────────────────────────────────────────────────────────────
goToRegisterBtn.addEventListener('click', () => showRegisterCard());
goToLoginBtn.addEventListener('click',    () => showLoginCard());

// ─────────────────────────────────────────────────────────────
//  Logout
// ─────────────────────────────────────────────────────────────
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  showAuth();
});

// ─────────────────────────────────────────────────────────────
//  Tasks — CRUD
// ─────────────────────────────────────────────────────────────
addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  clearError('task-title-error');

  const title = taskTitleInput.value.trim();
  if (!title) {
    setError('task-title-error', 'O título da tarefa é obrigatório');
    return;
  }

  const user = currentUser();
  const todos = dbGet('todos');

  const newTodo = {
    id:          Date.now().toString(),
    userId:      user.email,
    title,
    type:        taskTypeSelect.value,
    description: taskDescTextarea.value.trim(),
    done:        false,
    createdAt:   new Date().toISOString()
  };

  todos.push(newTodo);
  dbSet('todos', todos);

  addTaskForm.reset();
  taskTypeSelect.value = 'Trabalho';
  renderTasks();
});

function toggleDone(todoId) {
  const todos = dbGet('todos');
  const idx   = todos.findIndex(t => t.id === todoId);
  if (idx === -1) return;

  todos[idx].done = !todos[idx].done;
  dbSet('todos', todos);
  renderTasks();
}

// ─────────────────────────────────────────────────────────────
//  Tasks — Render
// ─────────────────────────────────────────────────────────────
function badgeClass(type) {
  const map = {
    'Trabalho': 'badge-trabalho',
    'Pessoal':  'badge-pessoal',
    'Estudos':  'badge-estudos'
  };
  return map[type] || 'badge-trabalho';
}

function badgeIcon(type) {
  const map = { 'Trabalho': '💼', 'Pessoal': '🏠', 'Estudos': '📚' };
  return map[type] || '📋';
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function renderTasks() {
  const user  = currentUser();
  const todos = dbGet('todos').filter(t => t.userId === user.email);

  // Sort: pending first, done at the end
  const pending = todos.filter(t => !t.done);
  const done    = todos.filter(t =>  t.done);
  const sorted  = [...pending, ...done];

  // Summary badge
  if (sorted.length > 0) {
    tasksSummary.textContent = `${pending.length} pendente${pending.length !== 1 ? 's' : ''} · ${done.length} concluída${done.length !== 1 ? 's' : ''}`;
    tasksSummary.classList.remove('hidden');
  } else {
    tasksSummary.classList.add('hidden');
  }

  // Empty state
  if (sorted.length === 0) {
    tasksList.innerHTML = `
      <div class="glass rounded-3xl p-12 text-center fade-in">
        <div class="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
        </div>
        <p class="text-slate-400 font-medium">Nenhuma tarefa cadastrada ainda.</p>
        <p class="text-slate-500 text-sm mt-1">Adicione sua primeira tarefa acima!</p>
      </div>`;
    return;
  }

  tasksList.innerHTML = sorted.map(todo => `
    <div class="task-card glass rounded-2xl p-5 ${todo.done ? 'done' : ''} fade-in" id="task-${todo.id}">
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-2 mb-1">
            <h3 class="task-title text-white font-semibold text-sm leading-tight">${escapeHtml(todo.title)}</h3>
            <span class="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeClass(todo.type)}">
              ${badgeIcon(todo.type)} ${todo.type}
            </span>
            ${todo.done ? `<span class="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Concluída
            </span>` : ''}
          </div>
          ${todo.description ? `<p class="text-slate-400 text-xs mt-1 leading-relaxed">${escapeHtml(todo.description)}</p>` : ''}
          <p class="text-slate-600 text-xs mt-2">${formatDate(todo.createdAt)}</p>
        </div>

        <button
          onclick="toggleDone('${todo.id}')"
          class="shrink-0 flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-xl transition-all duration-200
            ${todo.done
              ? 'bg-slate-700/40 text-slate-400 hover:bg-slate-700/60 border border-slate-700/50'
              : 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/25'
            }"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${todo.done ? 'M4 4l16 16M4 20L20 4' : 'M5 13l4 4L19 7'}"/>
          </svg>
          ${todo.done ? 'Reabrir' : 'Concluir'}
        </button>
      </div>
    </div>
  `).join('');
}

// ─────────────────────────────────────────────────────────────
//  XSS guard
// ─────────────────────────────────────────────────────────────
function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ─────────────────────────────────────────────────────────────
//  Boot
// ─────────────────────────────────────────────────────────────
checkSession();
