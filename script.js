//fetch per ottenere i dati
const getLibrary = function () {
    fetch(
        'https://striveschool-api.herokuapp.com/books'
    )
        .then((response) => {
            console.log(response)
            //se la risposta e positiva converti in formato JSON
            if (response.ok) {
                return response.json()
                //se la risposta e negativa lancia il messaggio                                
            } else {
                throw new Error('Qualcosa e andata storto con la chiamata in rete')
            }
        })
        .then((listLibrary) => {
            console.log(listLibrary)
            //per ogni libro nell'array creo la mia card
            const bookContainer = document.getElementById('book-container')
            listLibrary.forEach((book) => {

                //il div col
                const col = document.createElement('div')
                col.classList.add('col')

                //div card con altezza fissa di h-100
                const card = document.createElement('div')
                card.classList.add('card', 'h-100')

                //img ddella card
                const img = document.createElement('img')
                img.src = book.img
                img.classList.add('card-img-top')
                img.alt = book.title

                //div body-card
                const cardBody = document.createElement('div')
                cardBody.classList.add('card-body')

                //h5 title-card e aggiungo un eventListener per espandere il titolo (in seguito faccio delle modifiche in CSS)
                const cardBodyh5 = document.createElement('h5')
                cardBodyh5.classList.add('card-title', 'title-overflow')
                cardBodyh5.innerText = book.title
                cardBodyh5.addEventListener('click', () => {
                    cardBodyh5.classList.toggle('expanded-text')
                })

                //p con il prezzo del libro
                const cardBookp = document.createElement('p')
                cardBookp.classList.add('card-text')
                cardBookp.innerText = `Prezzo libbro: €${book.price}`

                //bottone per rimuovere card
                const deleteButton = document.createElement('button')
                deleteButton.classList.add('btn', 'btn-danger', 'me-4')
                deleteButton.innerHTML = 'Scarta  <i class="bi bi-trash3"></i>'
                deleteButton.addEventListener('click', () => {
                    col.remove()
                })

                //bottone per aggiungere card alla lista
                const addButton = document.createElement('button')
                addButton.classList.add('btn', 'btn-success')
                addButton.innerHTML = 'Compra  <i class="bi bi-cart3"></i>'
                addButton.addEventListener('click', () => {
                    addBook(book)
                })
                // appendo ogni elemento della mia card
                cardBody.appendChild(cardBodyh5)
                cardBody.appendChild(cardBookp)
                cardBody.appendChild(deleteButton)
                cardBody.appendChild(addButton)

                card.appendChild(img)
                card.appendChild(cardBody)

                col.appendChild(card)
                bookContainer.appendChild(col)

            })
        })
        //gestisco errori durante la fetch e li visualizzo in console
        .catch((err) => {
            console.log('Errore', err)
        })
}


//aggiundo un libro alla lista visibile nella pagina e salvo nel localStorage
const addBook = (book) => {
    //id della mia <ul>
    const bookList = document.getElementById('book-list')
    //recupero la lista dal localStorage e la converto in un array, ma se nn essiste mi da un array vuoto
    const bookItem = JSON.parse(localStorage.getItem('bookItem')) || []
    //agg il libro della funzione all array dei libri
    bookItem.push(book)
    //salvo l'array nel localStorage 
    localStorage.setItem('bookItem', JSON.stringify(bookItem))

    //creo la mia lista
    const newLi = document.createElement('li')
    //classe bootstrap
    newLi.classList.add('list-group-item', 'd-flex', 'justify-content-between')
    //titolo <li>
    newLi.innerText = book.title



    //button per rimuovere elemento dalla lista
    const removeButton = document.createElement('button')
    removeButton.classList.add('btn', 'btn-danger', 'ms-3')
    removeButton.innerHTML = '<i class="bi bi-cart3"></i>'
    removeButton.addEventListener('click', () => {
        removeBook(book)
    })
    newLi.appendChild(removeButton)
    bookList.appendChild(newLi)  //appendo il <li> all mia <ul>
}

//funzione per rimuovere il libro dalla lista
const removeBook = (book) => {
    const bookList = document.getElementById('book-list')

    //recupero la lista dal localStorage o creo un array vuoto
    let bookItem = JSON.parse(localStorage.getItem('bookItem')) || []
    //filtro l'array per rimuovere il libro con asin specifico
    bookItem = bookItem.filter((item) => item.asin !== book.asin)
    //salvo l'array aggiornata in localStorage
    localStorage.setItem('bookItem', JSON.stringify(bookItem))
    //chiamo la funzione per la lista aggiornata
    loadingList()
}

//carico e visualizzo i libri salvati nel localStorage quando carico la pagina.
const loadingList = () => {
    const bookList = document.getElementById('book-list')
    const bookItem = JSON.parse(localStorage.getItem('bookItem')) || []
    //pulisco la lista
    bookList.innerHTML = ''
    // per ogni libbro nell array creo un elemento <li> e aggiungo il suo titolo 
    bookItem.forEach((book) => {
        const newLi = document.createElement('li')
        newLi.classList.add('list-group-item', 'd-flex', 'justify-content-between')
        newLi.innerHTML = book.title

        const removeButton = document.createElement('button')
        removeButton.classList.add('btn', 'btn-danger', 'ms-3')
        removeButton.innerHTML = '<i class="bi bi-cart3"></i>'
        removeButton.addEventListener('click', () => {
            removeBook(book)
        })
        newLi.appendChild(removeButton)

        bookList.appendChild(newLi)
    })
}
//DomContentLoaded- evento che verifica se HTML e stato completamente caricato.
//eseuire la funzione loadingList() quando tutto l'HTML e carico. 
document.addEventListener('DOMContentLoaded', () => {
    loadingList()
})

getLibrary()