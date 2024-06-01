function initializePlayers() {
	player.initialize();
	oponent.initialize();
}

function renderizeLastCardFor(player) {
	const { cards, rol } = player,
		newCardElement = document.createElement('img');
	newCardElement.src = cards[cards.length - 1].img;
	newCardElement.alt = cards[cards.length - 1].id;
	newCardElement.classList.add('card');
	rol == 'main player' ? mainPlayerCardsContainer.appendChild(newCardElement) : oponentCardsContainer.appendChild(newCardElement);
}

function renderizeUpdatedScoreFor({ rol, score }) {
	rol == 'main player' ? mainPlayerScoreElement.innerText = `Puntaje: ${score}` : oponentScoreElement.innerText = `Puntaje: ${score}`;
}

function saveRoundScores() {
	const roundScores = {
		playerScore: player.score,
		oponentScore: oponent.score,
	}
	const JSONScoresRecord = localStorage.getItem('scoresRecord');
	if (JSONScoresRecord) {
		const scoresRecord = JSON.parse(JSONScoresRecord);
		scoresRecord.push(roundScores);
		localStorage.setItem('scoresRecord', JSON.stringify(scoresRecord));
	} else {
		localStorage.setItem('scoresRecord', JSON.stringify([roundScores]));
	}
}

function renderizeEndGameInterface() {
	askCardButton.remove();
	standButton.remove();
	showWinner();
	renderizePlayAgainButton();
}

function showWinner() {
	const playerWins = player.score <= 21 && (oponent.score < player.score || 21 < oponent.score);
	Toastify({
		text: playerWins ? 'Felicitaciones, has ganado!' : 'Lo siento, has perdido.',
		duration: 3000,
		gravity: 'top',
		backgroundColor: playerWins ? '#166805' : '#bb0000',
		stopOnFocus: true,
	}).showToast();
}

function renderizePlayAgainButton() {
	const playAgainButton = document.createElement('button');
	playAgainButton.classList.add('border')
	playAgainButton.innerText = 'Volver a jugar';
	buttonsContainer.appendChild(playAgainButton);
	playAgainButton.addEventListener('click', () => {
		window.location.reload();
	});
}

function renderizeScoresRecord() {
	const JSONScoresRecord = localStorage.getItem('scoresRecord');
	if (JSONScoresRecord) {
		const scoresRecord = JSON.parse(JSONScoresRecord)

		for (let i = 0; i < scoresRecord.length; i++) {
			const roundScores = scoresRecord[i];
			appendRoundScoresToTable(roundScores, i + 1);
		}

		function appendRoundScoresToTable(round, i) {
			const scoresRow = document.createElement('tr'),
				roundCountTd = document.createElement('td'),
				playerScoreTd = document.createElement('td'),
				oponentScoreTd = document.createElement('td');

			scoresRow.classList.add('table-row', 'border');

			roundCountTd.innerText = i;
			scoresRow.appendChild(roundCountTd);

			playerScoreTd.innerText = round.playerScore;
			scoresRow.appendChild(playerScoreTd);

			oponentScoreTd.innerText = round.oponentScore;
			scoresRow.appendChild(oponentScoreTd);

			scoresTable.appendChild(scoresRow);
		}
	} else {
		while (scoresTable.firstChild) {
			scoresTable.removeChild(scoresTable.firstChild);
		}
	}
}

function clearRecord() {
	localStorage.clear();
	renderizeScoresRecord();
}