import React from 'react'
import {withRouter} from 'react-router-dom'
import './CardFlipResults.css'

class CardFlipResults extends React.Component {
  render() {
    const {history, location} = this.props
    const {won, flips = 0} = location.state || {}

    return (
      <div className="cf-results-container">
        {won ? (
          <>
            <h1>Congratulations</h1>
            <h2>You matched all of the cards in record time</h2>
            <img
              src="https://assets.ccbp.in/frontend/react-js/face-with-big-eyes-img.png"
              alt="grinning face with big eyes"
            />
            <p>No.of Flips - {flips}</p>
          </>
        ) : (
          <>
            <h1>Better luck next time</h1>
            <h2>You did not match all of the cards in record time</h2>
            <img
              src="https://assets.ccbp.in/frontend/react-js/neutral-face-img.png"
              alt="neutral face"
            />
          </>
        )}
        <button
          type="button"
          onClick={() => history.push('/card-flip-memory-game/play')}
        >
          Play Again
        </button>
        <button type="button" onClick={() => history.push('/')}>
          ← Home
        </button>
      </div>
    )
  }
}

export default withRouter(CardFlipResults)
