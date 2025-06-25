import React from 'react'
import './index.css'

class GameResultsView extends React.Component {
  render() {
    const {level, onGoBack, onPlayAgain} = this.props
    const maxLevel = 4
    const percentage = Math.min(100, (level / maxLevel) * 100)

    let message
    if (level === 4) {
      message = "Amazing! You've mastered Memory Matrix!"
    } else if (level === 3) {
      message = "Great job! You're getting really good at this!"
    } else if (level === 2) {
      message = 'Good effort! Keep practicing to improve!'
    } else {
      message = "Nice try! You'll do better next time!"
    }

    return (
      <div className="game-results-view">
        <button className="back-button" onClick={onGoBack} type="button">
          ← Back
        </button>

        <h1>Game Complete!</h1>
        <h2>You reached level {level}</h2>

        <div className="progress-container">
          <div className="progress-bar" style={{width: `${percentage}%`}}>
            {percentage}%
          </div>
        </div>

        <div className="result-message">
          <p>{message}</p>
        </div>

        <button
          className="play-again-button"
          onClick={onPlayAgain}
          type="button"
        >
          Play Again
        </button>
      </div>
    )
  }
}

export default GameResultsView
