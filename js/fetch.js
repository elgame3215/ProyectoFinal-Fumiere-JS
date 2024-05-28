let cardsArray = JSON.parse(localStorage.getItem('cardsArray'));
if (!cardsArray) {
	fetch('https://elgame3215.github.io/ProyectoFinal-Fumiere-JS/assets/cards.json')
		.then(response => response.json())
		.then(data => {
			localStorage.setItem('cardsArray', JSON.stringify(data));
			cardsArray = _.shuffle(data);
		})
		.catch(err => console.error('error al cargar las cartas', err));
} else {
	cardsArray = _.shuffle(cardsArray);
}