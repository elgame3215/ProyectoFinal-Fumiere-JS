let cardsArray;

fetch('https://elgame3215.github.io/ProyectoFinal-Fumiere-JS/assets/cards.json')
.then( response => response.json() )
.then( data => {
	cardsArray = _.shuffle(data)
	player.initialize();
	oponent.initialize();
	} )
.catch( err => console.error( 'error al cargar las cartas' , err ));