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
    history.push('/rock-paper-scissor/play')
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
          <li>
            The game result should be based on user and user opponent choices
          </li>
          <li>
            When the user choice is rock and his opponent choice is rock then
            the result will be <span className="rpsrule-draw">IT IS DRAW</span>
          </li>
          <li>
            When the user choice is paper and his opponent choice is rock then
            the result will be <span className="rpsrule-won">YOU WON</span>
          </li>
          <li>
            When the user choice is a scissor and his opponent choice is rock
            then the result will be{' '}
            <span className="rpsrule-lose">YOU LOSE</span>
          </li>
          <li>
            When the user choice is paper and his opponent choice is paper then
            the result will be <span className="rpsrule-draw">IT IS DRAW</span>
          </li>
          <li>
            When the user choice is scissors and his opponent choice is paper
            then the result will be <span className="rpsrule-won">YOU WON</span>
          </li>
          <li>
            When the user choice is rock and his opponent choice is scissors
            then the result will be <span className="rpsrule-won">YOU WON</span>
          </li>
          <li>
            When the user choice is paper and his opponent choice is scissors
            then the result will be{' '}
            <span className="rpsrule-lose">YOU LOSE</span>
          </li>
          <li>
            When the user choice is scissors and his opponent choice is scissors
            then the result will be{' '}
            <span className="rpsrule-draw">IT IS DRAW</span>
          </li>
          <li>
            When the result is <span className="rpsrule-won">YOU WON</span>,
            then the count of the score should be incremented by 1
          </li>
          <li>
            When the result is <span className="rpsrule-draw">IT IS DRAW</span>,
            then the count of the score should be the same
          </li>
          <li>
            When the result is <span className="rpsrule-lose">YOU LOSE</span>,
            then the count of the score should be decremented by 1
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
