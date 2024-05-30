const cardsArrayFetch = new Promise((resolve, reject) => {
	const cardsArray = JSON.parse(localStorage.getItem('cardsArray'));
	if (!cardsArray) {
		fetch('https://elgame3215.github.io/ProyectoFinal-Fumiere-JS/assets/cards.json')
			.then(response => response.json())
			.then(cards => {
				localStorage.setItem('cardsArray', JSON.stringify(cards));
				resolve(_.shuffle(cards));
			})
			.catch(err => console.error('error al cargar las cartas: ', err));
	} else resolve(_.shuffle(cardsArray));
})