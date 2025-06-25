import React from 'react'
import './index.css'

class GamePlayingView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showRules: false,
      gameState: 'waiting',
      gridSize: Math.min(5, props.level + 2),
      activeTiles: [],
      userSelections: [],
      score: 0,
    }
    this.hideTimeout = null
  }

  componentDidMount() {
    this.generatePattern()
  }

  componentDidUpdate(prevProps) {
    const {level} = this.props
    if (prevProps.level !== level) {
      this.generatePattern()
    }
  }

  componentWillUnmount() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout)
    }
  }

  generatePattern = () => {
    const {level, onGameEnd} = this.props

    if (level > 4) {
      onGameEnd(4)
      return
    }

    const gridSize = Math.min(5, level + 2)
    const numTiles = Math.min(level + 1, gridSize * gridSize)
    const tiles = []

    while (tiles.length < numTiles) {
      const randomTile = Math.floor(Math.random() * gridSize * gridSize)
      if (!tiles.includes(randomTile)) {
        tiles.push(randomTile)
      }
    }

    this.setState({
      gridSize,
      activeTiles: tiles,
      gameState: 'showing',
      userSelections: [],
    })

    this.hideTimeout = setTimeout(() => {
      this.setState({gameState: 'guessing'})
    }, 2000)
  }

  handleTileClick = tileIndex => {
    const {gameState, userSelections, activeTiles} = this.state
    const {level, onGameEnd, setLevel} = this.props

    if (gameState !== 'guessing' || userSelections.includes(tileIndex)) return

    const newSelections = [...userSelections, tileIndex]
    const isCorrect = activeTiles.includes(tileIndex)

    if (!isCorrect) {
      this.setState({gameState: 'result', userSelections: newSelections})
      setTimeout(() => onGameEnd(level), 1500)
      return
    }

    if (newSelections.length === activeTiles.length) {
      this.setState(
        prevState => ({
          score: prevState.score + level * 10,
          gameState: 'result',
          userSelections: newSelections,
        }),
        () => {
          setTimeout(() => {
            if (level < 4) {
              setLevel(level + 1)
            } else {
              onGameEnd(4)
            }
          }, 1500)
        },
      )
    } else {
      this.setState({userSelections: newSelections})
    }
  }

  renderTile = index => {
    const {gameState, activeTiles, userSelections} = this.state
    const isActive = activeTiles.includes(index)
    const isUserSelected = userSelections.includes(index)
    const isWrongGuess = gameState === 'result' && isUserSelected && !isActive
    const isCorrectGuess = isUserSelected && isActive
    const isShowingPhase = gameState === 'showing' && isActive

    let className = 'tile'
    if (isShowingPhase) className += ' showing'
    if (isCorrectGuess) className += ' correct'
    if (isWrongGuess) className += ' wrong'

    return (
      <button
        key={index}
        className={className}
        onClick={() => this.handleTileClick(index)}
        type="button"
        aria-label={`Tile ${index + 1}`}
      />
    )
  }

  render() {
    const {onGoBack, level} = this.props
    const {showRules, score, gridSize} = this.state

    return (
      <div className="game-playing-view">
        <div className="game-header">
          <button className="back-button" onClick={onGoBack} type="button">
            ← Back
          </button>
          <button
            className="rules-button"
            onClick={() => this.setState({showRules: true})}
            type="button"
          >
            Rules
          </button>
        </div>

        <div className="game-info">
          <h2>Level: {level}</h2>
          <h3>Score: {score}</h3>
        </div>

        <div
          className="game-grid"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 60px)`,
            gridTemplateRows: `repeat(${gridSize}, 60px)`,
          }}
        >
          {Array.from({length: gridSize * gridSize}).map((_, index) =>
            this.renderTile(index),
          )}
        </div>

        {showRules && (
          <div className="rules-popup">
            <div className="rules-popup-content">
              <h3>Memory Matrix Rules</h3>
              <p>
                Memorize the highlighted tiles, then select them in any order.
              </p>
              <p>Each level increases difficulty. You have 4 levels total.</p>
              <button
                onClick={() => this.setState({showRules: false})}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default GamePlayingView
