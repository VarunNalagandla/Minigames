import React from 'react'
import {withRouter} from 'react-router-dom'
import Modal from 'react-modal'
import {CgClose} from 'react-icons/cg'
import './CardFlipGame.css'

const cardsData = [
  {
    name: 'tiger',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-tiger-img.png',
  },
  {
    name: 'lion',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-lion-img.png',
  },
  {
    name: 'rat',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-rat-img.png',
  },
  {
    name: 'hen',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-hen-img.png',
  },
  {
    name: 'elephant',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-elephant-img.png',
  },
  {
    name: 'buffalo',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-buffalo-img.png',
  },
  {
    name: 'goat',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-goat-img.png',
  },
  {
    name: 'zebra',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-zebra-img.png',
  },
  {
    name: 'duck',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-duck-img.png',
  },
  {
    name: 'pigeon',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-pigeon-img.png',
  },
]

function shuffle(array) {
  return [...array, ...array]
    .map((item, idx) => ({
      ...item,
      id: idx + 1,
      flipped: false,
      matched: false,
    }))
    .sort(() => Math.random() - 0.5)
}

if (typeof document !== 'undefined') {
  const root = document.getElementById('root') || document.createElement('div')
  root.setAttribute('id', 'root')
  document.body.appendChild(root)
  Modal.setAppElement(root)
}

class CardFlipGame extends React.Component {
  state = {
    cards: shuffle(cardsData),
    firstChoice: null,
    secondChoice: null,
    disabled: false,
    score: 0,
    flips: 0,
    timeLeft: 120,
    showRules: false,
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState(
        prev => ({timeLeft: prev.timeLeft - 1}),
        () => {
          const {timeLeft} = this.state
          const {history} = this.props
          if (timeLeft === 0) {
            clearInterval(this.timerId)
            history.push({
              pathname: '/card-flip-memory-game/results',
              state: {won: false},
            })
          }
        },
      )
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  toggleRulesModal = () => {
    this.setState(prev => ({showRules: !prev.showRules}))
  }

  handleCardClick = card => {
    const {firstChoice, secondChoice, disabled, cards, flips} = this.state
    if (disabled || card.flipped || card.matched) return
    if (firstChoice && firstChoice.id === card.id) return

    const updatedCards = cards.map(c =>
      c.id === card.id ? {...c, flipped: true} : c,
    )
    const clickedCard = updatedCards.find(c => c.id === card.id)

    if (!firstChoice) {
      this.setState({
        cards: updatedCards,
        firstChoice: clickedCard,
      })
    } else if (!secondChoice) {
      this.setState(
        {
          cards: updatedCards,
          secondChoice: clickedCard,
          disabled: true,
          flips: flips + 1,
        },
        this.checkMatch,
      )
    }
  }

  checkMatch = () => {
    const {firstChoice, secondChoice, cards, score} = this.state
    const isMatch = firstChoice.name === secondChoice.name

    if (isMatch) {
      const updated = cards.map(card =>
        card.name === firstChoice.name ? {...card, matched: true} : card,
      )
      this.setState(
        {
          cards: updated,
          score: score + 1,
        },
        this.resetTurn,
      )
    } else {
      setTimeout(() => {
        const reverted = cards.map(card =>
          card.id === firstChoice.id || card.id === secondChoice.id
            ? {...card, flipped: false}
            : card,
        )
        this.setState(
          {
            cards: reverted,
          },
          this.resetTurn,
        )
      }, 2000)
    }
  }

  resetTurn = () => {
    const {cards, flips} = this.state
    const {history} = this.props
    const allMatched = cards.every(card => card.matched)

    if (allMatched) {
      clearInterval(this.timerId)
      history.push({
        pathname: '/card-flip-memory-game/results',
        state: {won: true, flips},
      })
    } else {
      this.setState({firstChoice: null, secondChoice: null, disabled: false})
    }
  }

  render() {
    const {cards, score, flips, timeLeft, showRules} = this.state
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0')
    const seconds = String(timeLeft % 60).padStart(2, '0')

    return (
      <div className="cf-game-container">
        <h1>Card-Flip Memory Game</h1>
        <button type="button" onClick={this.toggleRulesModal}>
          Rules
        </button>
        <p>Card flip count - {flips}</p>
        <p>Score - {score}</p>
        <p>
          {minutes}:{seconds}
        </p>

        <ul className="cf-grid">
          {cards.map(card => (
            <li key={card.id}>
              <button
                type="button"
                data-testid={card.name}
                className={`cf-card ${card.flipped ? 'flipped' : ''}`}
                onClick={() => this.handleCardClick(card)}
              >
                <div className="cf-card-inner">
                  <div className="cf-front" />
                  <div className="cf-back">
                    {card.flipped && (
                      <img
                        src={card.image}
                        alt={card.name}
                        data-testid={`image-${card.name}`}
                      />
                    )}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>

        <Modal
          isOpen={showRules}
          onRequestClose={this.toggleRulesModal}
          className="rules-modal"
          overlayClassName="rules-overlay"
        >
          <div className="modal-header">
            <h2>Rules</h2>
            <button
              type="button"
              aria-label="Close Rules"
              data-testid="close"
              className="close-btn"
              onClick={this.toggleRulesModal}
            >
              <CgClose size={24} />
            </button>
          </div>
          <ul className="rules-list">
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
              If the user finds all the matching cards before the timer ends,
              then the user should be redirected to the results page.
            </li>
          </ul>
          <ul style={{display: 'none'}}>
            {cards.map(card => (
              <li key={`hidden-${card.id}`}>{card.name}</li>
            ))}
          </ul>
        </Modal>
      </div>
    )
  }
}

export default withRouter(CardFlipGame)
