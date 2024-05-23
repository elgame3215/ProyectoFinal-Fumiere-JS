class Player {
	constructor(rol) {
		this.rol = rol;
	}
	cards = [];
	score = 0;
	ases = 0;

	initialize() {
		// cada jugador inicia la ronda con 2 cartas
		this.askCard();
		this.askCard();
		return this
	}
	askCard = () => {
		const newCard = cardsArray.pop();
		this.cards.push(newCard);
		this.score += parseInt(newCard.value);
		if (newCard.value == 1) {
			this.ases++;
			this.score += 10;
		};

		renderizeLastCardFor(this);

		// si el jugador se pasa de 21, verifico que tenga un as que pueda pasar a valer 1
		if (this.ases && this.score > 21) {
			this.ases--;
			this.score -= 10;
		}
		renderizeUpdatedScoreFor(this);

		if (this.rol == 'main player') {
			const { cards: playerCards, score: playerScore } = this,
				playerMustStand = playerCards.length >= MAX_CARDS_PER_PLAYER || playerScore > 20;
			playerMustStand && askCardButton.remove();
		}
	}
	stand = () => {
		if (this.rol == 'main player') {
			standButton.remove();
			this.playOponentsTurn();
		} else {
			saveRoundScores();
			renderizeEndGameInterface();
		}
	}
	async playOponentsTurn() {
		while (oponentShouldPlay()) {
			// el oponente pide cartas hasta ganar, pasarse o tener cuatro cartas.
			await new Promise((resolve, reject) => {
				setTimeout(() => {
					// pide carta tras un corto intervalo para una mejor apreciacion visual.
					resolve(oponent.askCard());
				}, 700);
			})
		}
		oponent.stand();
		function oponentShouldPlay() {
			const { cards: oponentCards } = oponent;
			return oponent.score < player.score && player.score <= 21 && oponentCards.length < MAX_CARDS_PER_PLAYER;
		}
	}
}