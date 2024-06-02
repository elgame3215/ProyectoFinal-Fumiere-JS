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
	askCard = async () => {
		const cardsArray = await cardsArrayFetch,
			newCard = cardsArray.pop();
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
			askCardButton.remove();
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
			const { cards: oponentCards, score: oponentScore } = oponent,
				oponentIsLosing = oponent.score < player.score,
				playerStillInGame = player.score <= 21,
				oponentCanStand = 16 < oponentScore,
				oponentCanAskCard = oponentCards.length < MAX_CARDS_PER_PLAYER;
			return (oponentIsLosing && playerStillInGame && oponentCanAskCard) || !oponentCanStand && oponentCanAskCard;
		}
	}
}