import React from 'react'
import {BiArrowBack} from 'react-icons/bi'
import './RockPaperRules.css'

class RockPaperRules extends React.Component {
  handleBack = () => {
    const {history} = this.props
    history.push('/')
  }

  handleStartPlaying = () => {
    const {history} = this.props
    history.push('/rps/play')
  }

  render() {
    return (
      <div className="rpsrule-bg-container">
        <button
          type="button"
          className="rpsrule-back-button"
          onClick={this.handleBack}
        >
          <BiArrowBack className="rpsrule-back-icon" />
          Back
        </button>

        <main>
          <h1 className="rpsrule-title">Rock Paper Scissor</h1>
        </main>

        <div className="rpsrule-diagram">
          <img
            src="https://res.cloudinary.com/dbug7lhfv/image/upload/v1750694106/Group_7469_tyittk.png"
            alt="rock paper scissor"
            className="rpsrule-diagram-image"
          />
        </div>

        <h2 className="rpsrule-heading">Rules</h2>

        <ul className="rpsrule-list">
          <li>The game result should be based on user and opponent choices</li>
          <li>
            Rock vs Rock → <span className="rpsrule-draw">IT IS DRAW</span>
          </li>
          <li>
            Paper vs Rock → <span className="rpsrule-won">YOU WON</span>
          </li>
          <li>
            Scissor vs Rock → <span className="rpsrule-lose">YOU LOSE</span>
          </li>
          <li>
            Paper vs Paper → <span className="rpsrule-draw">IT IS DRAW</span>
          </li>
          <li>
            Scissors vs Paper → <span className="rpsrule-won">YOU WON</span>
          </li>
          <li>
            Rock vs Scissors → <span className="rpsrule-won">YOU WON</span>
          </li>
          <li>
            Paper vs Scissors → <span className="rpsrule-lose">YOU LOSE</span>
          </li>
          <li>
            Scissors vs Scissors →{' '}
            <span className="rpsrule-draw">IT IS DRAW</span>
          </li>
          <li>
            <span className="rpsrule-won">YOU WON</span> → +1 score
          </li>
          <li>
            <span className="rpsrule-draw">IT IS DRAW</span> → 0 score
          </li>
          <li>
            <span className="rpsrule-lose">YOU LOSE</span> → -1 score
          </li>
        </ul>

        <button
          type="button"
          className="rpsrule-start-button"
          onClick={this.handleStartPlaying}
        >
          Start playing
        </button>
      </div>
    )
  }
}

export default RockPaperRules
