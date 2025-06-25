import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import './RockPaperPlay.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class RockPaperPlay extends Component {
  state = {
    score: 0,
    isGameOn: false,
    userChoice: {},
    opponentChoice: {},
    result: '',
    showRules: false,
  }

  getResult = (userId, opponentId) => {
    if (userId === opponentId) return 'IT IS DRAW'
    if (
      (userId === 'ROCK' && opponentId === 'SCISSORS') ||
      (userId === 'PAPER' && opponentId === 'ROCK') ||
      (userId === 'SCISSORS' && opponentId === 'PAPER')
    ) {
      return 'YOU WON'
    }
    return 'YOU LOSE'
  }

  onClickChoice = userChoice => {
    const opponentChoice =
      choicesList[Math.floor(Math.random() * choicesList.length)]
    const result = this.getResult(userChoice.id, opponentChoice.id)

    this.setState(prevState => {
      let updatedScore = prevState.score
      if (result === 'YOU WON') {
        updatedScore += 1
      } else if (result === 'YOU LOSE') {
        updatedScore -= 1
      }

      return {
        userChoice,
        opponentChoice,
        result,
        isGameOn: true,
        score: updatedScore,
      }
    })
  }

  onPlayAgain = () => {
    this.setState({isGameOn: false})
  }

  onClickShowRules = () => {
    this.setState({showRules: true})
  }

  onClickCloseRules = () => {
    this.setState({showRules: false})
  }

  onClickBackToHome = () => {
    const {history} = this.props
    history.push('/')
  }

  renderGame = () => (
    <div className="rps-choices-container">
      {choicesList.map(each => (
        <button
          type="button"
          key={each.id}
          className="rps-choice-button"
          data-testid={`${each.id.toLowerCase()}Button`}
          onClick={() => this.onClickChoice(each)}
        >
          <img src={each.imageUrl} alt={each.id} className="rps-choice-img" />
        </button>
      ))}
    </div>
  )

  renderResult = () => {
    const {userChoice, opponentChoice, result} = this.state
    return (
      <div className="rps-result-container">
        <div className="rps-choice-result">
          <p>YOU</p>
          <img src={userChoice.imageUrl} alt="your choice" />
        </div>
        <div className="rps-choice-result">
          <p>OPPONENT</p>
          <img src={opponentChoice.imageUrl} alt="opponent choice" />
        </div>
        <p className="rps-result-text">{result}</p>
        <button
          type="button"
          className="rps-play-again-button"
          onClick={this.onPlayAgain}
        >
          PLAY AGAIN
        </button>
      </div>
    )
  }

  renderRules = () => (
    <div className="rps-rules-popup">
      <div className="rps-rules-container">
        <button
          type="button"
          className="rps-close-button"
          onClick={this.onClickCloseRules}
        >
          ✕
        </button>
        <h1 className="rps-rules-heading">Rules</h1>
        <div className="rps-rules-list">
          <ul className="rps-rules-column">
            <li>
              Rock vs Rock → <span className="rps-draw">IT IS DRAW</span>
            </li>
            <li>
              Paper vs Rock → <span className="rps-won">YOU WON</span>
            </li>
            <li>
              Scissor vs Rock → <span className="rps-lose">YOU LOSE</span>
            </li>
            <li>
              Paper vs Paper → <span className="rps-draw">IT IS DRAW</span>
            </li>
            <li>
              Scissors vs Paper → <span className="rps-won">YOU WON</span>
            </li>
          </ul>
          <ul className="rps-rules-column">
            <li>
              Rock vs Scissors → <span className="rps-won">YOU WON</span>
            </li>
            <li>
              Paper vs Scissors → <span className="rps-lose">YOU LOSE</span>
            </li>
            <li>
              Scissors vs Scissors →{' '}
              <span className="rps-draw">IT IS DRAW</span>
            </li>
            <li>
              <span className="rps-won">YOU WON</span> → +1 score
            </li>
            <li>
              <span className="rps-draw">IT IS DRAW</span> → 0 score
            </li>
            <li>
              <span className="rps-lose">YOU LOSE</span> → -1 score
            </li>
          </ul>
        </div>
      </div>
    </div>
  )

  render() {
    const {score, isGameOn, showRules} = this.state

    return (
      <div className="rps-game-main-container">
        {!showRules ? (
          <>
            <div className="rps-game-header">
              <h1 className="rps-game-title">Rock Paper Scissors</h1>
              <div className="rps-score-box">
                <p className="rps-score-label">Score</p>
                <p className="rps-score-value">{score}</p>
              </div>
            </div>
            {isGameOn ? this.renderResult() : this.renderGame()}
            <div className="rps-footer-buttons">
              <button
                type="button"
                className="rps-rules-btn"
                onClick={this.onClickShowRules}
              >
                RULES
              </button>
              <button
                type="button"
                className="rps-home-btn"
                onClick={this.onClickBackToHome}
              >
                BACK
              </button>
            </div>
          </>
        ) : (
          this.renderRules()
        )}
      </div>
    )
  }
}

export default withRouter(RockPaperPlay)
