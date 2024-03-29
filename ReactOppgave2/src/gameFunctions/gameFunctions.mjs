export const gameState = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
/**
 * Looper gjennom gameState og ser om det er kommet tre på rad.
 *
 * @param {number[][]} gameState Et todimensjonelt array som representerer boardStatet. hvert tall kan ha en state mellom 0 (ikke valgt), 1 (Dot/spiller1) og 2(Cross/spiller2)
 * @returns 1 hvis den finner en win, 0 hvis ikke.
 */
export const checkWin = (gameState) => {
  for (let i = 0; i < gameState.length; i++) {
    for (let j = 0; j < gameState[i].length; j++) {
      //Blar først gjennom 2d array vertikalt i j akse.
      if (gameState[i][j] !== 0) {
        if (
          j + 2 < gameState[i].length &&
          gameState[i][j] === gameState[i][j + 1] &&
          gameState[i][j] === gameState[i][j + 2]
        )
          return gameState[i][j];
      }
      //skjekker gjennom 2d array vertikal akse.
      if (
        i + 2 < gameState.length &&
        gameState[i][j] === gameState[i + 1][j] &&
        gameState[i][j] === gameState[i + 2][j]
      )
        return gameState[i][j];
      //Diagonalt venstre top, høyre bunn
      if (
        i + 2 < gameState.length &&
        j + 2 < gameState.length &&
        gameState[i][j] === gameState[i + 1][j + 1] &&
        gameState[i][j] === gameState[i + 2][j + 2]
      )
        return gameState[i][j];
      //Diagonalt høyre top venstre bunn.
      if (
        i + 2 < gameState.length &&
        /* Her passer jeg på at jeg starter skjekken på j>3, sånn at jeg vet forige steg vil være når j=2, og siste steg når j=1.
            så den skjekker høyre top først, før den looper bakover og ser etter midtverdi og venstre bunn.  */
        j - 2 >= 0 &&
        gameState[i][j] === gameState[i + 1][j - 1] &&
        gameState[i][j] === gameState[i + 2][j - 2]
      )
        return gameState[i][j];
    }
  }
  return 0;
};

/**
 * resetter alle values i gameState til 0
 * @param {number[][]} gameState
 * @returns gameState[i][j] = 0
 */
export const resetGameState = (gameState) => {
  for (let i = 0; i < gameState.length; i++) {
    for (let j = 0; j < gameState[i].length; j++) {
      gameState[i][j] = 0;
    }
  }
  return gameState;
};

/**
 * incrementer winCount[winner] med 1.
 * @param {number[]} winCount
 * @param {number} winner
 * @returns winCount med oppdaterte verdier.
 */
export const updateWinCount = (winCount, winner) => {
  winCount[winner] += 1;
  return winCount;
};

/**
 * Tar in gamestate, flater det ut, og ser om det er en "draw",
 * aka om det er en verdi i alle rutene. Returnerer 0 om det fremdeles er en ledig slot, returnerer 1 om alle er gjort.
 * @param {number[][]} gameState
 * @returns 0 eller 1
 */
export const drawCheck = (gameState) => {
  const flattenedGameState = gameState.flat();
  for (let i = 0; i < flattenedGameState.length; i++) {
    if (!flattenedGameState[i]) return 0;
  }
  return 1;
};
