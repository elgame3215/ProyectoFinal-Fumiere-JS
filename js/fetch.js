let cardsArray;

fetch('../assets/cards.json')
.then( response => response.json() )
.then( data => cardsArray = data )
.catch( err => console.error( 'error al cargar las cartas' , err ));