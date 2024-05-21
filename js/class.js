class Player {
	constructor( rol ) {
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
		this.cards.push( newCard );
		this.score += parseInt(newCard.value);
		if (newCard.value == 1) {
			this.ases++;
			this.score += 10;
		};

		renderizeLastCardFor( this )

		// si el jugador se pasa de 21, verifico que tenga un as que pueda pasar a valer 1
		if ( this.ases && this.score > 21 ) {
			this.ases--;
			this.score -= 10;
		}
		renderizeUpdatedScoreFor( this );

		if ( this.rol == 'main player' ) {
			const	{cards: playerCards , score: playerScore} = this,
					playerMustStand = playerCards.length > 3 || playerScore > 21;
			playerMustStand && askCardButton.remove();
		}
	}
	stand = () => {
		if ( this.rol == 'main player' ) {
			this.playOponentsTurn()
		} else {
			saveRoundScores()
			renderizeEndGameInterface();
		}
	}
	playOponentsTurn() {
		while ( oponentShouldPlay() ) {
			oponent.askCard();
		}
		oponent.stand()
		function oponentShouldPlay() {
			const {cards: oponentCards} = oponent;
			return oponent.score < player.score && player.score <= 21 && oponentCards.length < 4;
		}
	}
}