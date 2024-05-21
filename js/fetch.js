let cardsArray;

fetch('../assets/cards.json')
.then( response => response.json() )
.then( data => {
	cardsArray = _.shuffle(data)
	player.initialize();
	oponent.initialize();
	} )
.catch( err => console.error( 'error al cargar las cartas' , err ));