//BUGS PARA CORRIGIR E MEHORIAS: 

/*Ao criar uma nova coluna após colocar um card na ultima coluna criada, 
esta fica impossibilitada de receber cards, e o card é arrastado para 
a coluna que não foi criada ainda, fazendo com que ele seja perdido 
caso as alterações sejam canceladas */

/*A configuração para as colunas receberem cards foi copiada inteira 
para dentro da função de salvar nova coluna, dá pra melhorar 

--------------------------------*/


// APLICA A CLASSE "dragging" QUANDO UM CARD COMEÇA A SER ARRASTADO
// Isso permite identificar qual card está sendo movido durante o drag and drop
document.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('dragstart', e => {
        e.currentTarget.classList.add('dragging')
    })
})


// REMOVE A CLASSE "dragging" QUANDO O ARRASTE TERMINA
// Isso indica que o card não está mais sendo movimentado
document.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('dragend', e => {
        e.currentTarget.classList.remove('dragging')
    })
})


// CONFIGURA OS EVENTOS DAS COLUNAS PARA RECEBER OS CARDS ARRASTADOS
columnFunctions()

// BOTÃO "+" DE CADA COLUNA PARA CRIAR UMA NOVA TAREFA

document.addEventListener('click', function (e) {
    const button = e.target.closest('.add-card')
    if (!button) return
    // identifica em qual coluna o botão foi clicado
    const column = button.closest('.kanban-column').querySelector('.kanban-cards')

    // abre o modal de criação de tarefa
    modalNovaTarefa(column);

    // criação inicial do card (não utilizado diretamente aqui)
    const addCard = document.createElement('div');
    addCard.classList.add('kanban-card');
    addCard.setAttribute('draggable', 'true');

})



// FUNÇÃO RESPONSÁVEL POR CRIAR O MODAL DE NOVA TAREFA
function modalNovaTarefa(colunaSelecionada) {

    // cria o fundo escuro do modal
    const modal = document.createElement('div');
    modal.classList.add('modalNovaTarefa');

    // container do botão de fechar
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('fecharBotaoDiv');

    // container principal do conteúdo do modal
    const modalContent = document.createElement('div');
    modalContent.classList.add('modalContent');

    // título do modal
    const modalTexto = document.createElement('p');
    modalTexto.innerText = 'Criar nova tarefa';
    modalTexto.classList.add('texto-modal');

    // campo de input para o nome da tarefa
    const nomeTarefa = document.createElement('input');

    // select para escolher prioridade
    const selectBadge = document.createElement('select');


    // CRIAÇÃO DAS OPÇÕES DE PRIORIDADE

    const optionHigh = document.createElement('option');
    optionHigh.value = 'high';
    optionHigh.textContent = 'Alta';

    const optionMedium = document.createElement('option');
    optionMedium.value = 'medium';
    optionMedium.textContent = 'Média';

    const optionLow = document.createElement('option');
    optionLow.value = 'low';
    optionLow.textContent = 'Baixa';

    // adiciona as opções no select
    selectBadge.append(optionHigh, optionMedium, optionLow);


    // labels para os campos
    const labelTarefa = document.createElement('label');
    labelTarefa.innerText = 'Nome da tarefa';

    const labelSelect = document.createElement('label');
    labelSelect.innerText = 'Prioridade';


    // botão para fechar o modal
    const fecharModal = document.createElement('button');
    fecharModal.classList.add('fecharBotao');

    const buttonDiv2 = document.createElement('div');
    buttonDiv2.classList.add('buttonDiv');


    // FUNÇÃO QUE APLICA OS EVENTOS DE DRAG NO CARD CRIADO DINAMICAMENTE
    function aplicarDrag(card) {

        card.addEventListener('dragstart', e => {
            card.classList.add('dragging')
        })

        card.addEventListener('dragend', e => {
            card.classList.remove('dragging')
        })
    }


    // BOTÃO QUE CRIA A TAREFA
    const saveTarefa = document.createElement('button');
    saveTarefa.innerText = 'Criar Tarefa'
    saveTarefa.classList.add('saveTarefa')


    // EVENTO DE CLICK PARA SALVAR A NOVA TAREFA
    saveTarefa.addEventListener('click', function () {

        // pega o título digitado
        const titulo = nomeTarefa.value

        // pega a prioridade selecionada
        const prioridadeClasse = selectBadge.value
        const prioridadeTexto = selectBadge.options[selectBadge.selectedIndex].text

        // impede criação de tarefa sem nome
        if (!titulo) {
            alert("Digite um nome para a tarefa")
            return
        }

        // cria o elemento card
        const card = document.createElement('div')
        card.classList.add('kanban-card')
        card.setAttribute('draggable', 'true')

        // estrutura interna do card
        card.innerHTML = `
        <div class="cabecalho-card">
            <div class="badge ${prioridadeClasse}">
                <span>Prioridade ${prioridadeTexto}</span>
            </div>
        <button class="options">
            <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
            
        </div>
        <p class="card-title">${titulo}</p>
    `

        // aplica funcionalidade de drag ao novo card
        aplicarDrag(card)

        // adiciona o card na coluna selecionada
        colunaSelecionada.appendChild(card)

        // fecha o modal
        modal.remove()
    })


    // BOTÃO PARA FECHAR O MODAL
    fecharModal.addEventListener('click', function () { modal.remove() })


    // ícone do botão de fechar
    const fecharIcon = document.createElement('i');
    fecharIcon.className = "fa-solid fa-xmark";


    // montagem da estrutura do modal
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


// FUNÇÃO QUE CRIA O MENU DE OPÇÕES DO CARD
function criarMenu(card, botao) {

    // cria o container do menu
    const menu = document.createElement('div')
    menu.classList.add('card-menu')

    // opções do menu
    menu.innerHTML = `
        
        <button class="li-option" id="li-delete"><i class="fa-solid fa-trash"></i>Excluir</button>
    `

    // adiciona o menu dentro do card
    card.appendChild(menu)

    // fecha o menu caso o usuário clique fora dele
    document.addEventListener('click', function fechar(e) {
        if (!menu.contains(e.target) && e.target !== botao) {
            menu.remove()
            document.removeEventListener('click', fechar)
        }
    })
}


// CONTROLE DO BOTÃO DE OPÇÕES (3 PONTOS)
document.addEventListener('click', function (e) {

    // verifica se o clique foi no botão de opções
    const botao = e.target.closest('.options')

    if (!botao) return

    // impede que o clique se propague para outros eventos
    e.stopPropagation()

    // identifica o card correspondente
    const card = botao.closest('.kanban-card')

    // verifica se o menu já existe
    const menuExistente = card.querySelector('.card-menu')

    // se existir, remove
    if (menuExistente) {
        menuExistente.remove()
        return
    }

    // se não existir, cria o menu
    criarMenu(card, botao)

})


// FUNÇÃO PARA EXCLUIR UM CARD
document.addEventListener('click', function (e) {

    // verifica se o botão clicado foi o de excluir
    const botaoExcluir = e.target.closest('#li-delete')

    if (!botaoExcluir) return

    // encontra o card correspondente
    const card = botaoExcluir.closest('.kanban-card')

    // remove o card da interface
    card.remove()

})


//FUNÇÃO DE ADICIONAR COLUNA

let buttonDiv = document.querySelector('.add_column_div');
let saveButton = document.createElement('button');
let cancelButton = document.createElement('button');
let insertName = document.createElement('input');


function criarColuna() {

    let newColumn = document.createElement('div');
    let newColumnCards = document.createElement('div');
    let newColumnTitle = document.createElement('div');
    let insertName = document.createElement('input');

    newColumn.classList.add('kanban-column');
    newColumnTitle.classList.add('kanban-title');
    newColumnCards.classList.add('kanban-cards');
    saveButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
    cancelButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

    const colunasExistentes = document.querySelectorAll('.kanban-column');

    let maxId = 0;

    // Obter o maior id
    colunasExistentes.forEach(el => {
        // dataset.id acessa o atributo data-id
        const currentId = parseInt(el.dataset.id);
        if (currentId > maxId) {
            maxId = currentId;
        }
    })

    // Somar 1 ao maior id encontrado

    const novoId = maxId + 1;

    //Atribuir novo data-id

    newColumn.dataset.id = novoId;

    //Criar elemento

    document.getElementById('add-column-button').disabled = true;
    document.querySelector('.kanban').insertBefore(newColumn, buttonDiv)
    newColumn.appendChild(newColumnTitle);
    newColumn.appendChild(newColumnCards);

    newColumnTitle.style.gap = "6px";

    newColumnTitle.appendChild(insertName);
    newColumnTitle.appendChild(saveButton);
    newColumnTitle.appendChild(cancelButton)
}

//CONFIRMAR NOVA COLUNA

saveButton.addEventListener('click', function () {

    let nomeColuna = document.createElement('h2');
    let botaoPlus = document.createElement('button');
    let botaoEdit = document.createElement('button');
    let botaoDiv = document.createElement('div');
    botaoPlus.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    botaoEdit.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

    //LOCALIZAR INPUT

    const column = this.closest('.kanban-column');
    const input = column.querySelector('input');
    const columnTitle = column.querySelector('.kanban-title');

    if (input.value == '') {
        alert('Sem nome')

        return
    } else {

        nomeColuna.innerText = input.value;
        columnTitle.appendChild(nomeColuna);


        //DESATIVAR BOTOES E INPUT

        input.remove();
        saveButton.remove();
        cancelButton.remove();

        //HABILITAR ADIÇÃO DE CARDS

        columnTitle.appendChild(botaoDiv);
        botaoDiv.appendChild(botaoEdit);
        botaoDiv.appendChild(botaoPlus);

        botaoDiv.classList.add('column-buttons');
        botaoEdit.classList.add('edit-column');
        botaoPlus.classList.add('add-card');


        //REABILITAR BOTAO DE CRIAR COLUNA

        document.getElementById('add-column-button').disabled = false;

        //ADICIONAR FUNCOES DE DRAG AND DROP NA COLUNA

        columnFunctions()
    }

})

function columnFunctions() {
    // CONFIGURA OS EVENTOS DAS COLUNAS PARA RECEBER OS CARDS ARRASTADOS
    document.querySelectorAll('.kanban-cards').forEach(column => {

        // EVENTO DISPARADO ENQUANTO UM CARD ESTÁ SOBRE A COLUNA
        // preventDefault é necessário para permitir o drop
        column.addEventListener('dragover', e => {
            e.preventDefault();
            e.currentTarget.classList.add('cards-hover')
        })

        // REMOVE O EFEITO VISUAL DE HOVER QUANDO O CARD SAI DA COLUNA
        column.addEventListener('dragleave', e => {
            e.preventDefault();
            e.currentTarget.classList.remove('cards-hover')
        })

        // EVENTO QUE OCORRE QUANDO O CARD É SOLTO NA COLUNA
        column.addEventListener('drop', e => {

            // remove o destaque visual
            e.currentTarget.classList.remove('cards-hover')

            // seleciona o card que está sendo arrastado
            const dragCard = document.querySelector('.kanban-card.dragging');

            // adiciona o card na nova coluna
            e.currentTarget.appendChild(dragCard);
        })
    })
} columnFunctions()


//CANCELAR NOVA COLUNA

cancelButton.addEventListener('click', function () {

    //OBTER ULTIMA COLUNA

    let elementos = Array.from(document.querySelectorAll('.kanban-column'));
    let ultimaColuna = elementos.pop();

    //REMOVER COLUNA

    ultimaColuna.remove()

    document.getElementById('add-column-button').disabled = false;
})

// ÁREA RESERVADA PARA IMPLEMENTAR EDIÇÃO DE CARD
// a lógica de editar pode reutilizar o mesmo modal de criação de tarefa
