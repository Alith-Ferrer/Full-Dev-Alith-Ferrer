console.log('logic connected');

const users = [
    { username: 'user1', password: '1234' },
    { username: 'user2', password: '5678' },
    { username: 'user3', password: '9101' },
    { username: 'user4', password: '1121' },
    { username: 'user5', password: '3141' }
];

const failedAttempts = JSON.parse(localStorage.getItem('failedAttempts')) || {};
const blockedUsers = JSON.parse(localStorage.getItem('blockedUsers')) || {};

function start() {
    let user = document.getElementById('user').value.toLowerCase().trim();
    let pw = document.getElementById('pw').value.toLowerCase().trim();

    if (blockedUsers[user]) {
        alert('User blocked due to too many failed attempts.');
        return;
    }

    let foundUser = users.find(u => u.username === user && u.password === pw);

    if (foundUser) {
        window.open('Correct Entry.html');
        console.log('login successful');
        resetFailedAttempts(user);
    } else {
        registerFailedAttempt(user);
        alert('Incorrect username or password');
        document.getElementById('user').focus();
        document.getElementById('pw').value = '';
        document.getElementById('user').value = '';
    }
}

function registerFailedAttempt(user) {
    failedAttempts[user] = (failedAttempts[user] || 0) + 1;

    if (failedAttempts[user] >= 3) {
        blockedUsers[user] = true;
        localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
    }
    localStorage.setItem('failedAttempts', JSON.stringify(failedAttempts));
}

function resetFailedAttempts(user) {
    delete failedAttempts[user];
    delete blockedUsers[user];
    localStorage.setItem('failedAttempts', JSON.stringify(failedAttempts));
    localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
}