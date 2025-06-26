import './WinOrLoseCard.css'

const LOSE_IMAGE = 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png'
const WON_IMAGE = 'https://assets.ccbp.in/frontend/react-js/won-game-img.png'

const WinOrLoseCard = props => {
  const {isWon, onClickPlayAgain, score} = props
  const imageUrl = isWon ? WON_IMAGE : LOSE_IMAGE
  const gameStatus = isWon ? 'You Won' : 'You Lose'
  const altvalue = isWon ? 'won' : 'lose'
  const scoreLabel = isWon ? 'Best Score' : 'Score'

  return (
    <div className="emo-win-or-lose-card">
      <div className="emo-details-section">
        <h1 className="emo-game-status">{gameStatus}</h1>
        <p className="emo-current-score-label">{scoreLabel}</p>
        <p className="emo-current-score-value">{score}/12</p>
        <button
          type="button"
          className="emo-play-again-button"
          onClick={onClickPlayAgain}
        >
          Play Again
        </button>
      </div>
      <div className="emo-image-section">
        <img className="emo-win-or-lose-image" src={imageUrl} alt={altvalue} />
      </div>
    </div>
  )
}

export default WinOrLoseCard
