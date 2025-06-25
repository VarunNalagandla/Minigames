import './NavBar.css'

const NavBar = props => {
  const {currentScore, isGameInProgress, topScore} = props

  return (
    <nav className="emo-nav-bar-container">
      <div className="emo-title-with-score-container">
        <div className="emo-logo-and-title-container">
          <img
            className="emo-emoji-logo"
            src="https://assets.ccbp.in/frontend/react-js/game-logo-img.png"
            alt="emoji logo"
          />
          <h1 className="emo-title">Emoji Game</h1>
        </div>
        {isGameInProgress && (
          <div className="emo-scores-container">
            <p className="emo-score">Score: {currentScore}</p>
            <p className="emo-score">Top Score: {topScore}</p>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
