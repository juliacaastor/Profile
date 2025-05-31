document.addEventListener('DOMContentLoaded', function() {
    const inputTarefa = document.getElementById('novaTarefa');
    const btnAdicionar = document.getElementById('btnAdicionar');
    const listaTarefas = document.getElementById('listaTarefas');
    const totalTarefas = document.getElementById('totalTarefas');

    function adicionarTarefa() {
        const texto = inputTarefa.value.trim();

        if (texto === '') {
            alert('Por favor, digite uma tarefa!');
            return;
        }

        const tarefa = document.createElement('div');
        tarefa.className = 'tarefa';

        tarefa.innerHTML = `
           <span class="texto">${texto}</span>
           <button class="remover">×</button>
           `
        ;

        tarefa.querySelector('.remover').addEventListener('click', function() {
            tarefa.remove();
            atualizarContador();
        });

        listaTarefas.appendChild(tarefa);

        inputTarefa.value = '';
        atualizarContador();
    }

    function atualizarContador() {
        const total = listaTarefas.children.length;
        totalTarefas.textContent = total;
    }

    btnAdicionar.addEventListener('click', adicionarTarefa);

    inputTarefa.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            adicionarTarefa();
        }
    });
});