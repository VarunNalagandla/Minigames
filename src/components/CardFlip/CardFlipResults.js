import React from 'react'
import {withRouter} from 'react-router-dom'
import './CardFlipResults.css'

class CardFlipResults extends React.Component {
  handlePlayAgain = ({history}) => history.push('/card-flip/play')

  handleBack = ({history}) => history.push('/')

  render() {
    const {history} = this.props
    return (
      <div className="cf-results-container">
        <h1>🎉 You Matched All Cards!</h1>
        <button
          type="button"
          className="cf-play-btn"
          onClick={() => this.handlePlayAgain({history})}
        >
          Play Again
        </button>
        <button
          type="button"
          className="cf-back-btn"
          onClick={() => this.handleBack({history})}
        >
          ← Home
        </button>
      </div>
    )
  }
}

export default withRouter(CardFlipResults)
