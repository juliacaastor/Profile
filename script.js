
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const sobrenome = document.getElementById('sobrenome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('comment').value.trim();
    
    let valido = true;
    
    if (nome === '') {
        alert('Por favor, preencha o campo Nome');
        valido = false;
    }
    
    if (sobrenome === '') {
        alert('Por favor, preencha o campo Sobrenome');
        valido = false;
    }
    
    if (email === '') {
        alert('Por favor, preencha o campo Email');
        valido = false;
    } else if (!validarEmail(email)) {
        alert('Por favor, insira um email válido');
        valido = false;
    }
    
    if (valido) {
        alert('Formulário enviado com sucesso!');
        this.submit();
    }
});

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}