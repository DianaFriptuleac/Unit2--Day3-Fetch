const getLibrary = function() {
    fetch(
        'https://striveschool-api.herokuapp.com/books'
    )
    .then((response) =>{
       console.log(response)
       if(response.ok){
        return response.json()
       }else{
        throw new Error('Qualcosa e andata storto con la chiamata in rete')
       }
    })
    .then((listLibrary) =>{
        console.log(listLibrary)

     const bookContainer = document.getElementById('book-container')
    listLibrary.slice(1).forEach((book) => {

        const col = document.createElement('div')
        col.classList.add('col')

        const card = document.createElement ('div')
        card.classList.add('card','h-100')

        const img = document.createElement('img')
        img.src = book.img
        img.classList.add('card-img-top','card-img')
        img.alt = book.title

        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')

        const cardBodyh5 = document.createElement('h5')
        cardBodyh5.classList.add('card-title')
        cardBodyh5.innerText = book.title

        const cardBookp = document.createElement('p')
        cardBookp.classList.add('card-text')
        cardBookp.innerText =  `Prezzo libbro: €${book.price}`

        cardBody.appendChild(cardBodyh5)
        cardBody.appendChild(cardBookp)
        
        card.appendChild(img)
        card.appendChild(cardBody)

        col.appendChild(card)
        bookContainer.appendChild(col)
      
    })
})
    .catch((err) =>{
        console.log('Errore', err)
    })
}
getLibrary()