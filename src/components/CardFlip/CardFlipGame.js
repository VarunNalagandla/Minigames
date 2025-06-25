import React from 'react'
import {withRouter} from 'react-router-dom'
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
  return array
    .concat()
    .sort(() => Math.random() - 0.5)
    .map((item, idx) => ({...item, id: idx, flipped: false, matched: false}))
}

class CardFlipGame extends React.Component {
  state = {
    cards: shuffle([...cardsData, ...cardsData]),
    firstChoice: null,
    secondChoice: null,
    disabled: false,
  }

  handleCardClick = card => {
    const {firstChoice, cards, disabled} = this.state
    if (disabled || card.flipped || card.matched) return

    const updatedCards = cards.map(c =>
      c.id === card.id ? {...c, flipped: true} : c,
    )

    this.setState({cards: updatedCards}, () => {
      if (!firstChoice) {
        this.setState({firstChoice: card})
      } else {
        this.setState({secondChoice: card, disabled: true}, this.checkMatch)
      }
    })
  }

  checkMatch = () => {
    const {firstChoice, secondChoice, cards} = this.state
    if (firstChoice.name === secondChoice.name) {
      const updatedCards = cards.map(c =>
        c.name === firstChoice.name ? {...c, matched: true} : c,
      )
      this.setState({cards: updatedCards}, this.resetTurn)
    } else {
      setTimeout(() => {
        const updatedCards = cards.map(c =>
          c.id === firstChoice.id || c.id === secondChoice.id
            ? {...c, flipped: false}
            : c,
        )
        this.setState({cards: updatedCards}, this.resetTurn)
      }, 1000)
    }
  }

  resetTurn = () => {
    const {cards} = this.state
    const allMatched = cards.every(c => c.matched)
    this.setState(
      {
        firstChoice: null,
        secondChoice: null,
        disabled: false,
      },
      () => {
        if (allMatched) {
          const {history} = this.props
          history.push('/card-flip/results')
        }
      },
    )
  }

  render() {
    const {cards} = this.state
    const {history} = this.props
    const matches = cards.filter(c => c.matched).length / 2

    return (
      <div className="cf-game-container">
        <button
          type="button"
          className="cf-home-btn"
          onClick={() => history.push('/')}
        >
          ← Home
        </button>
        <h2 className="cf-score">Matches: {matches}</h2>
        <div className="cf-grid">
          {cards.map(card => (
            <div
              key={card.id}
              role="button"
              tabIndex={0}
              className={`cf-card ${card.flipped ? 'flipped' : ''}`}
              onClick={() => this.handleCardClick(card)}
              onKeyDown={e => e.key === 'Enter' && this.handleCardClick(card)}
            >
              <div className="cf-front" />
              <div className="cf-back">
                <img src={card.image} alt={card.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default withRouter(CardFlipGame)
