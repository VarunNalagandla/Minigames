import React from 'react'
import './GamePlayingView.css'

class GamePlayingView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showRules: false,
      gameState: 'waiting',
      gridSize: 3,
      activeTiles: [],
      userSelections: [],
      score: 0,
    }

    this.hideTimeout = null
    this.guessTimeout = null
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
    clearTimeout(this.hideTimeout)
    clearTimeout(this.guessTimeout)
  }

  generatePattern = () => {
    const {level, onGameEnd} = this.props

    if (level > 15) {
      onGameEnd(level)
      return
    }

    const N = level + 1
    const gridSize = Math.min(5, Math.max(3, Math.ceil(Math.sqrt(N))))
    const totalTiles = gridSize * gridSize

    const tiles = new Set()
    while (tiles.size < N) {
      tiles.add(Math.floor(Math.random() * totalTiles))
    }

    const delay = N * 1000

    this.setState({
      gridSize,
      activeTiles: Array.from(tiles),
      gameState: 'showing',
      userSelections: [],
    })

    this.hideTimeout = setTimeout(() => {
      this.setState({gameState: 'guessing'})

      this.guessTimeout = setTimeout(() => {
        const {userSelections} = this.state
        if (userSelections.length === 0) {
          this.setState({gameState: 'result'})
          onGameEnd(level)
        }
      }, delay)
    }, delay)
  }

  handleTileClick = tileIndex => {
    const {gameState, userSelections, activeTiles, score} = this.state
    const {level, onGameEnd, setLevel} = this.props

    if (gameState !== 'guessing' || userSelections.includes(tileIndex)) return

    const newSelections = [...userSelections, tileIndex]
    const isCorrect = activeTiles.includes(tileIndex)

    if (!isCorrect) {
      clearTimeout(this.guessTimeout)
      this.setState({gameState: 'result', userSelections: newSelections})

      const adjustedLevel =
        level === 10 && userSelections.some(sel => activeTiles.includes(sel))
          ? 9
          : level

      setTimeout(() => {
        onGameEnd(adjustedLevel)
      }, 1500)
      return
    }

    if (newSelections.length === activeTiles.length) {
      clearTimeout(this.guessTimeout)
      this.setState(
        {
          score: score + level * 10,
          gameState: 'result',
          userSelections: newSelections,
        },
        () => {
          setTimeout(() => {
            setLevel(level + 1)
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
      <li key={index}>
        <button
          className={className}
          onClick={() => this.handleTileClick(index)}
          type="button"
          disabled={gameState === 'showing'}
          aria-label={`Tile ${index + 1}`}
          data-testid={isActive ? 'highlighted' : 'notHighlighted'}
        />
      </li>
    )
  }

  render() {
    const {onGoBack, level} = this.props
    const {showRules, score, gridSize} = this.state
    const {gameState, userSelections, activeTiles} = this.state
    const isGameWon =
      gameState === 'result' && userSelections.length === activeTiles.length

    return (
      <div className="game-playing-view">
        <h1>Memory Matrix</h1>

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
          {!isGameWon ? (
            <>
              <h2>Level: {level}</h2>
              <h3>Score: {score}</h3>
            </>
          ) : (
            <h2>Level - ({level + 1})</h2>
          )}
        </div>

        <ul
          className="game-grid"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 60px)`,
            gridTemplateRows: `repeat(${gridSize}, 60px)`,
          }}
        >
          {Array.from({length: gridSize * gridSize}).map((_, index) =>
            this.renderTile(index),
          )}
        </ul>

        {gameState === 'result' && !isGameWon && <h1>Congratulations</h1>}

        {showRules && (
          <div className="rules-popup">
            <div className="rules-popup-content">
              <h3>Memory Matrix Rules</h3>
              <img src="memory.png" alt="memory matrix" />
              <ul>
                <li>1. Tiles are briefly highlighted.</li>
                <li>2. Remember their positions.</li>
                <li>3. Select the tiles in any order.</li>
                <li>4. Each level gets harder.</li>
                <li>5. Selecting a wrong tile ends the level.</li>
                <li>6. Complete all highlighted tiles to advance.</li>
                <li>7. The game ends at level 15.</li>
              </ul>
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
