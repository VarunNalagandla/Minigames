import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Modal from 'react-modal'
import {CgClose} from 'react-icons/cg'
import './EmojiGame.css'
import EmojiCard from './EmojiCard'
import NavBar from './NavBar'
import WinOrLoseCard from './WinOrLoseCard'

if (typeof document !== 'undefined') {
  const root = document.getElementById('root') || document.createElement('div')
  root.setAttribute('id', 'root')
  document.body.appendChild(root)
  Modal.setAppElement(root)
}

const emojisList = [
  {
    id: 0,
    emojiName: 'Face with stuck out tongue',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-img.png',
  },
  {
    id: 1,
    emojiName: 'Face with head bandage',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-head-bandage-img.png',
  },
  {
    id: 2,
    emojiName: 'Face with hugs',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-hugs-img.png',
  },
  {
    id: 3,
    emojiName: 'Face with laughing',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-img.png',
  },
  {
    id: 4,
    emojiName: 'Laughing face with hand in front of mouth',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-with-hand-infront-mouth-img.png',
  },
  {
    id: 5,
    emojiName: 'Face with mask',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-mask-img.png',
  },
  {
    id: 6,
    emojiName: 'Face with silence',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-silence-img.png',
  },
  {
    id: 7,
    emojiName: 'Face with stuck out tongue and winked eye',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-and-winking-eye-img.png',
  },
  {
    id: 8,
    emojiName: 'Grinning face with sweat',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/grinning-face-with-sweat-img.png',
  },
  {
    id: 9,
    emojiName: 'Smiling face with heart eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-heart-eyes-img.png',
  },
  {
    id: 10,
    emojiName: 'Grinning face',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/grinning-face-img.png',
  },
  {
    id: 11,
    emojiName: 'Smiling face with star eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-star-eyes-img.png',
  },
]

class EmojiGame extends Component {
  state = {
    clickedEmojisList: [],
    isGameInProgress: true,
    topScore: 0,
    showRulesPopup: false,
  }

  resetGame = () => {
    this.setState({clickedEmojisList: [], isGameInProgress: true})
  }

  renderScoreCard = () => {
    const {clickedEmojisList} = this.state
    const isWon = clickedEmojisList.length === emojisList.length

    return (
      <WinOrLoseCard
        isWon={isWon}
        onClickPlayAgain={this.resetGame}
        score={clickedEmojisList.length}
      />
    )
  }

  finishGameAndSetTopScore = currentScore => {
    const {topScore} = this.state
    const newTopScore = currentScore > topScore ? currentScore : topScore
    this.setState({topScore: newTopScore, isGameInProgress: false})
  }

  clickEmoji = id => {
    const {clickedEmojisList} = this.state
    const isEmojiPresent = clickedEmojisList.includes(id)
    const clickedEmojisLength = clickedEmojisList.length

    if (isEmojiPresent) {
      this.finishGameAndSetTopScore(clickedEmojisLength)
    } else {
      if (emojisList.length - 1 === clickedEmojisLength) {
        this.finishGameAndSetTopScore(emojisList.length)
      }
      this.setState(prevState => ({
        clickedEmojisList: [...prevState.clickedEmojisList, id],
      }))
    }
  }

  getShuffledEmojisList = () => [...emojisList].sort(() => Math.random() - 0.5)

  renderEmojisList = () => {
    const shuffledEmojisList = this.getShuffledEmojisList()
    return (
      <ul className="emo-list-container">
        {shuffledEmojisList.map(emojiObject => (
          <EmojiCard
            key={emojiObject.id}
            emojiDetails={emojiObject}
            clickEmoji={this.clickEmoji}
          />
        ))}
      </ul>
    )
  }

  onClickBack = () => {
    const {history} = this.props
    history.push('/')
  }

  toggleRulesPopup = () => {
    this.setState(prevState => ({
      showRulesPopup: !prevState.showRulesPopup,
    }))
  }

  renderRulesPopup = () => {
    const {showRulesPopup} = this.state

    return (
      <Modal
        isOpen={showRulesPopup}
        onRequestClose={this.toggleRulesPopup}
        className="emo-popup-content"
        overlayClassName="emo-popup-overlay"
      >
        <div className="emo-modal-header">
          <h2 className="emo-popup-heading">Rules</h2>
          <button
            type="button"
            onClick={this.toggleRulesPopup}
            className="emo-popup-close-button"
            data-testid="close"
            aria-label="Close"
          >
            <CgClose size={20} />
          </button>
        </div>
        <ul className="emo-modal-list">
          <li>User should be able to see the list of Emojis</li>
          <li>
            When the user clicks any one of the Emoji for the first time, then
            the count of the score should be incremented by 1 and the List of
            emoji cards should be shuffled
          </li>
          <li>
            This process should be repeated every time the user clicks on an
            emoji card
          </li>
          <li>
            When the user clicks on all Emoji cards without clicking any of it
            twice, then the user will win the game
          </li>
          <li>
            When the user clicks on the same Emoji for the second time, then the
            user will lose the game
          </li>
          <li>
            Once the game is over, the user will be redirected to the results
            page
          </li>
        </ul>
        <ul className="emo-modal-emojis">
          {emojisList.map(emoji => (
            <li key={emoji.id}>
              <img
                src={emoji.emojiUrl}
                alt={emoji.emojiName}
                className="emo-modal-emoji"
              />
            </li>
          ))}
        </ul>
      </Modal>
    )
  }

  render() {
    const {clickedEmojisList, showRulesPopup} = this.state
    const {isGameInProgress, topScore} = this.state
    return (
      <div className="emo-app-container">
        <NavBar
          currentScore={clickedEmojisList.length}
          isGameInProgress={isGameInProgress}
          topScore={topScore}
        />
        <div className="emo-body">
          <div className="emo-top-buttons">
            <button
              type="button"
              className="emo-back-button"
              onClick={this.onClickBack}
            >
              ← Back
            </button>
            <button
              type="button"
              className="emo-rules-button"
              onClick={this.toggleRulesPopup}
            >
              Rules
            </button>
          </div>
          {isGameInProgress ? this.renderEmojisList() : this.renderScoreCard()}
        </div>
        {showRulesPopup ? this.renderRulesPopup() : null}
      </div>
    )
  }
}

export default withRouter(EmojiGame)
