//APLICAR CLASSE AO ARRASTAR CARD

document.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('dragstart', e => {
        e.currentTarget.classList.add('dragging')
    })
})

//REMOVER CLASSE AO ARRASTAR CARD

document.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('dragend', e => {
        e.currentTarget.classList.remove('dragging')
    })
})

//INSERIR HOVER NO CARD

document.querySelectorAll('.kanban-cards').forEach(column => {
    column.addEventListener('dragover', e => {
        e.preventDefault();
        e.currentTarget.classList.add('cards-hover')
    })

    //REMOVER HOVER DO CARD

    column.addEventListener('dragleave', e => {
        e.preventDefault();
        e.currentTarget.classList.remove('cards-hover')
    })

    //DROPAR O CARD NA COLUNA

    column.addEventListener('drop', e => {
        e.currentTarget.classList.remove('cards-hover')

        const dragCard = document.querySelector('.kanban-card.dragging');
        e.currentTarget.appendChild(dragCard);
    })
})

//FUNCAO PARA ADICIONAR CARDS

document.querySelectorAll('.add-card').forEach(button => button.addEventListener('click', function () {

    const column = this.closest('.kanban-column').querySelector('.kanban-cards');
    modalNovaTarefa(column);

    const addCard = document.createElement('div');
    addCard.classList.add('kanban-card');
    addCard.setAttribute('draggable', 'true');


    const dragCard = document.querySelector('.kanban-card.dragging');


}))

function modalNovaTarefa(colunaSelecionada) {
    const modal = document.createElement('div');
    modal.classList.add('modalNovaTarefa');

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('fecharBotaoDiv');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modalContent');

    const modalTexto = document.createElement('p');
    modalTexto.innerText = 'Criar nova tarefa';
    modalTexto.classList.add('texto-modal');

    const nomeTarefa = document.createElement('input');

    const selectBadge = document.createElement('select');

    //OPTIONS

    const optionHigh = document.createElement('option');
    optionHigh.value = 'high';
    optionHigh.textContent = 'Alta';

    const optionMedium = document.createElement('option');
    optionMedium.value = 'medium';
    optionMedium.textContent = 'Média';

    const optionLow = document.createElement('option');
    optionLow.value = 'low';
    optionLow.textContent = 'Baixa';

    selectBadge.append(optionHigh, optionMedium, optionLow);

    //

    const labelTarefa = document.createElement('label');
    labelTarefa.innerText = 'Nome da tarefa';

    const labelSelect = document.createElement('label');
    labelSelect.innerText = 'Prioridade';

    const fecharModal = document.createElement('button');
    fecharModal.classList.add('fecharBotao');

    const buttonDiv2 = document.createElement('div');
    buttonDiv2.classList.add('buttonDiv');

    //BOTAO SALVAR TAREFA

    function aplicarDrag(card) {

        card.addEventListener('dragstart', e => {
            card.classList.add('dragging')
        })

        card.addEventListener('dragend', e => {
            card.classList.remove('dragging')
        })

    }


    const saveTarefa = document.createElement('button');
    saveTarefa.innerText = 'Criar Tarefa'
    saveTarefa.classList.add('saveTarefa')

    saveTarefa.addEventListener('click', function () {

        const titulo = nomeTarefa.value

        const prioridadeClasse = selectBadge.value
        const prioridadeTexto = selectBadge.options[selectBadge.selectedIndex].text

        if (!titulo) {
            alert("Digite um nome para a tarefa")
            return
        }

        const card = document.createElement('div')
        card.classList.add('kanban-card')
        card.setAttribute('draggable', 'true')

        card.innerHTML = `
        <div class="badge ${prioridadeClasse}">
            <span>Prioridade ${prioridadeTexto}</span>
        </div>

        <p class="card-title">${titulo}</p>
    `

        aplicarDrag(card)

        colunaSelecionada.appendChild(card)

        modal.remove()
    })

    //


    //funcao de salvar tarefa a ser criada

    fecharModal.addEventListener('click', function () { modal.remove() })

    const fecharIcon = document.createElement('i');
    fecharIcon.className = "fa-solid fa-xmark";

    fecharModal.appendChild(fecharIcon);
    buttonDiv.appendChild(fecharModal);
    modalContent.appendChild(buttonDiv);
    modalContent.appendChild(modalTexto);

    modalContent.appendChild(labelTarefa);
    modalContent.appendChild(nomeTarefa);
    modalContent.appendChild(labelSelect);
    modalContent.appendChild(selectBadge);

    modalContent.append(buttonDiv2);
    buttonDiv2.append(saveTarefa);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

}