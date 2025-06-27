import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Modal from 'react-modal'
import {CgClose} from 'react-icons/cg'
import './RockPaperPlay.css'

if (typeof document !== 'undefined') {
  const root = document.getElementById('root') || document.createElement('div')
  root.setAttribute('id', 'root')
  document.body.appendChild(root)
  Modal.setAppElement(root)
}

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
    alt: 'rock',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
    alt: 'scissor',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
    alt: 'paper',
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
      <h1 className="rps-subtitle">Let’s pick</h1>
      <div className="rps-buttons-wrapper">
        {choicesList.map(each => (
          <button
            key={each.id}
            type="button"
            className="rps-choice-button"
            data-testid={`${each.alt}Button`}
            onClick={() => this.onClickChoice(each)}
          >
            <img
              src={each.imageUrl}
              alt={each.alt}
              className="rps-choice-img"
            />
          </button>
        ))}
      </div>
    </div>
  )

  renderResult = () => {
    const {userChoice, opponentChoice, result} = this.state

    let emojiUrl = ''
    let testAlt = ''
    let displayAlt = ''

    if (result === 'YOU WON') {
      emojiUrl =
        'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/smiling-face-with-star-eyes-img.png'
      testAlt = 'Smiling face with star eyes'
      displayAlt = 'won emoji'
    } else if (result === 'YOU LOSE') {
      emojiUrl =
        'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/face-without-mouth-img.png'
      testAlt = 'Frowning face'
      displayAlt = 'lose emoji'
    } else {
      emojiUrl =
        'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/face-without-mouth-img.png'
      testAlt = 'Face without mouth'
      displayAlt = 'draw emoji'
    }

    return (
      <div className="rps-result-container">
        <h1>Rock Paper Scissor</h1>

        <div className="rps-choice-result">
          <p>YOU</p>
          <img src={userChoice.imageUrl} alt={userChoice.alt} />
        </div>
        <div className="rps-choice-result">
          <p>OPPONENT</p>
          <img src={opponentChoice.imageUrl} alt={opponentChoice.alt} />
        </div>

        <p className="rps-result-text">{result}</p>

        <img src={emojiUrl} alt={testAlt} className="rps-test-emoji" />
        <img src={emojiUrl} alt={displayAlt} className="rps-result-emoji" />

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

  renderRulesModal = () => {
    const {showRules} = this.state

    return (
      <Modal
        isOpen={showRules}
        onRequestClose={this.onClickCloseRules}
        className="rps-modal"
        overlayClassName="rps-modal-overlay"
      >
        <button
          type="button"
          data-testid="close"
          className="rps-close-button"
          onClick={this.onClickCloseRules}
          aria-label="Close"
        >
          <CgClose size={20} />
        </button>
        <h1 className="rps-modal-heading">Rules</h1>
        <ul className="rps-rules-ul">
          <li>
            The game result should be based on user and user opponent choices
          </li>
          <li>
            When the user choice is rock and his opponent choice is rock then
            the result will be IT IS DRAW
          </li>
          <li>
            When the user choice is paper and his opponent choice is rock then
            the result will be YOU WON
          </li>
          <li>
            When the user choice is a scissor and his opponent choice is rock
            then the result will be YOU LOSE
          </li>
          <li>
            When the user choice is paper and his opponent choice is paper then
            the result will be IT IS DRAW
          </li>
          <li>
            When the user choice is scissors and his opponent choice is paper
            then the result will be YOU WON
          </li>
          <li>
            When the user choice is rock and his opponent choice is scissors
            then the result will be YOU WON
          </li>
          <li>
            When the user choice is paper and his opponent choice is scissors
            then the result will be YOU LOSE
          </li>
          <li>
            When the user choice is scissors and his opponent choice is scissors
            then the result will be IT IS DRAW
          </li>
          <li>
            When the result is YOU WON, then the count of the score should be
            incremented by 1
          </li>
          <li>
            When the result is IT IS DRAW, then the count of the score should be
            the same
          </li>
          <li>
            When the result is YOU LOSE, then the count of the score should be
            decremented by 1
          </li>
        </ul>
      </Modal>
    )
  }

  render() {
    const {score, isGameOn} = this.state

    return (
      <div className="rps-game-main-container">
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

        {this.renderRulesModal()}
      </div>
    )
  }
}

export default withRouter(RockPaperPlay)
