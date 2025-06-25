import React from 'react'
import {withRouter} from 'react-router-dom'
import './CardFlipRules.css'

class CardFlipRules extends React.Component {
  handleStart = () => {
    const {history} = this.props
    history.push('/card-flip/play')
  }

  handleBack = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    return (
      <div className="cf-rules-container">
        <h1 className="cf-rules-title">Card Flip Memory Game</h1>
        <ol className="cf-rules-list">
          <li>Flip two cards each turn.</li>
          <li>If they match, they stay revealed.</li>
          <li>If not, they flip back.</li>
          <li>Match all cards to win.</li>
        </ol>
        <div className="cf-buttons">
          <button
            type="button"
            className="cf-back-btn"
            onClick={this.handleBack}
          >
            ← Home
          </button>
          <button
            type="button"
            className="cf-start-btn"
            onClick={this.handleStart}
          >
            Start Playing
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(CardFlipRules)
