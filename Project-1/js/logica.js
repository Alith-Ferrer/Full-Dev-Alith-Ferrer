
console.log('logica conectada');

const usuarios = [{ usuario: 'usuario1', clave: '1234' }, { usuario: 'usuario2', clave: '5678' }, { usuario: 'usuario3', clave: '9101' }, { usuario: 'usuario4', clave: '1121' }, { usuario: 'usuario5', clave: '3141' }];

const intentosFallidos = JSON.parse(localStorage.getItem('intentos Fallidos')) || {}

const usuariosBloqueados = JSON.parse(localStorage.getItem('usuariosBloqueados')) || {};

function inicio() {

    let user = document.getElementById('user').value.toLocaleLowerCase()
    let pw = document.getElementById('pw').value.toLocaleLowerCase()
    user = user.trim()
    pw = pw.trim()

    if (usuariosBloqueados[user]) {
        alert('Usuario bloqueado por demasiados intentos fallidos.');
        return;
    }
    let usuarioEncontrado = usuarios.find(u => u.usuario === user && u.clave === pw);

    if (usuarioEncontrado) {
        window.open('Ingreso-correcto.html')
        console.log('ingreso correcto');
        resetIntentosFallidos(user);

    } else {
        registrarIntentoFallido(user)
        alert('usuario o contraseña incorrecta');
        document.getElementById('user').focus()
        document.getElementById('pw').value = ''
        document.getElementById('user').value = ''

    }
}

function registrarIntentoFallido(user) {
    intentosFallidos[user] = (intentosFallidos[user] || 0) + 1;

    if (intentosFallidos[user] >= 3) {
        usuariosBloqueados[user] = true;
        localStorage.setItem('usuariosBloqueados', JSON.stringify(usuariosBloqueados));
    }
    localStorage.setItem('intentosFallidos', JSON.stringify(intentosFallidos));
}


function resetIntentosFallidos(user) {
    delete intentosFallidos[user];
    delete usuariosBloqueados[user];
    localStorage.setItem('intentosFallidos', JSON.stringify(intentosFallidos));
    localStorage.setItem('usuariosBloqueados', JSON.stringify(usuariosBloqueados));
}