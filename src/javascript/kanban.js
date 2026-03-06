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

    column.addEventListener('drop', e => { 
        e.currentTarget.classList.remove('cards-hover') 

        const dragCard = document.querySelector('.kanban-card.dragging');
        e.currentTarget.appendChild(dragCard);
    })
})
