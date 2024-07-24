const getLibrary = function() {
    fetch(                                                             //ottengo i dati con fetch
        'https://striveschool-api.herokuapp.com/books'
    )
    .then((response) =>{
       console.log(response)
       if(response.ok){                                          //se la risposta e positiva converti in formato JSON
        return response.json()                                   //se la risposta e negativa lancia il messaggio   
       }else{
        throw new Error('Qualcosa e andata storto con la chiamata in rete')
       }
    })
    .then((listLibrary) =>{
        console.log(listLibrary)

     const bookContainer = document.getElementById('book-container')
    listLibrary.slice(1).forEach((book) => {                               //con slice(1) salto il primo elemento dell array
      // creo la mia card con JS
        const col = document.createElement('div')
        col.classList.add('col')

        const card = document.createElement ('div')
        card.classList.add('card','h-100')

        const img = document.createElement('img')
        img.src = book.img
        img.classList.add('card-img-top')
        img.alt = book.title

        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')

        const cardBodyh5 = document.createElement('h5')
        cardBodyh5.classList.add('card-title')
        cardBodyh5.innerText = book.title

        const cardBookp = document.createElement('p')
        cardBookp.classList.add('card-text')
        cardBookp.innerText =  `Prezzo libbro: €${book.price}`
        //creo i miei bottoni
        const deleteButton = document.createElement('button')
        deleteButton.classList.add('btn','btn-danger', 'me-4')
        deleteButton.innerHTML = 'Scarta  <i class="bi bi-trash3"></i>'
        deleteButton.addEventListener('click',()=>{
            col.remove()
        })
        const addButton = document.createElement('button')
        addButton.classList.add('btn','btn-success')
        addButton.innerHTML = 'Compra  <i class="bi bi-cart3"></i>'
        addButton.addEventListener('click',()=>{
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
    .catch((err) =>{       //gestisco errori durante il fetch
        console.log('Errore', err)
    })
}
 //aggiundo un libro alla lista visibile nella pagina e salvo nel localStorage
const addBook = (book) =>{
    const bookList = document.getElementById('book-list')   //id della mia <ul>
    const bookItem = JSON.parse(localStorage.getItem('bookItem')) || []   //recupero la lista dal localStorage e la converto in un array, ma se nn essiste mi dara un array vuoto

    bookItem.push(book)   //agg il libro della funzione all array dei libri
    localStorage.setItem('bookItem', JSON.stringify(bookItem))  //salvo l'array nel localStorage

    //creo la mia lista
    const newLi = document.createElement('li')
    newLi.classList.add('list-group-item')   //classe bootstrap
    newLi.innerText= book.title

    bookList.appendChild(newLi)  //appendo il <li> all mia <ul>
}

//carico e visualizzo i libri salvati nel localStorage quando carico la pagina.
const loadingList = () =>{
    const bookList = document.getElementById('book-list')
    const bookItem = JSON.parse(localStorage.getItem('bookItem')) || []

    bookList.innerHTML = ''  //pulisco la lista

   bookItem.forEach((book) =>{                    // per ogni libbro nell array creo un elemento <li> e aggiungo il suo titolo 
    const newLi = document.createElement('li')
    newLi.classList.add('list-group-item')
    newLi.innerHTML= book.title
    bookList.appendChild(newLi)
   })
}
//DomContentLoaded- evento che verifica se HTML e stato completamente caricato.
document.addEventListener('DOMContentLoaded',() =>{    //eseuire la funzione loadingList() quando tutto l'HTML e carico. 
    loadingList()
})

getLibrary()