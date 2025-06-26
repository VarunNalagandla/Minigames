import React from 'react'
import {withRouter} from 'react-router-dom'
// ❌ Remove this import if not allowed in your project setup
import {BiArrowBack} from 'react-icons/bi'
import './CardFlipRules.css'

class CardFlipRules extends React.Component {
  handleStart = () => {
    const {history} = this.props
    history.push('/card-flip-memory-game/play')
  }

  handleBack = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    return (
      <div className="cf-rules-container">
        <img
          src="https://res.cloudinary.com/dbug7lhfv/image/upload/v1750700438/animals_corjq7.png"
          alt="card flip memory game"
          className="cf-game-image"
        />

        <h1 className="cf-main-heading">Rules</h1>

        <ul className="cf-rules-list">
          <li>
            When the game is started, the users should be able to see the list
            of Cards that are shuffled and turned face down.
          </li>
          <li>
            When a user starts the game, the user should be able to see the
            Timer running.
          </li>
          <li>The Timer starts from 2 Minutes.</li>
          <li>
            If the two cards have the same image, they remain face up. If not,
            they should be flipped face down again after a short 2 seconds.
          </li>
          <li>Users should be able to compare only two cards at a time.</li>
          <li>
            When the user is not able to find all the cards before the timer
            ends then the game should end and redirect to the Time Up Page.
          </li>
          <li>
            If the user finds all the matching cards before the timer ends, then
            the user should be redirected to the results page.
          </li>
        </ul>

        <div className="cf-buttons">
          <button
            type="button"
            className="cf-back-btn"
            onClick={this.handleBack}
          >
            <BiArrowBack size={20} />
            Back
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
