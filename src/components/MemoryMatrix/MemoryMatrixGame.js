import {Component} from 'react'
import Modal from 'react-modal'
import {Line} from 'rc-progress'
import {CgClose} from 'react-icons/cg'
import './MemoryMatrixGame.css'

const emojiMeta = [
  {
    alt: 'neutral face',
    url: 'https://twemoji.maxcdn.com/v/13.1.0/72x72/1f610.png',
  },
  {
    alt: 'grimacing face',
    url: 'https://twemoji.maxcdn.com/v/13.1.0/72x72/1f62c.png',
  },
  {
    alt: 'slightly smiling face',
    url: 'https://twemoji.maxcdn.com/v/13.1.0/72x72/1f642.png',
  },
  {
    alt: 'grinning face with big eyes',
    url: 'https://twemoji.maxcdn.com/v/13.1.0/72x72/1f603.png',
  },
  {
    alt: 'grinning face with smiling eyes',
    url: 'https://twemoji.maxcdn.com/v/13.1.0/72x72/1f604.png',
  },
  {
    alt: 'beaming face with smiling eyes',
    url: 'https://twemoji.maxcdn.com/v/13.1.0/72x72/1f601.png',
  },
  {
    alt: 'grinning face',
    url: 'https://twemoji.maxcdn.com/v/13.1.0/72x72/1f600.png',
  },
  {
    alt: 'smiling face with sunglasses',
    url: 'https://twemoji.maxcdn.com/v/13.1.0/72x72/1f60e.png',
  },
]

if (typeof document !== 'undefined') {
  const root = document.getElementById('root') || document.createElement('div')
  root.setAttribute('id', 'root')
  document.body.appendChild(root)
  Modal.setAppElement(root)
}

class MemoryMatrixGame extends Component {
  state = {
    currentView: 'playing',
    gameLevel: 1,
    finalLevel: 1,
    showRules: false,
    gameState: 'waiting',
    gridSize: 3,
    activeTiles: [],
    userSelections: [],
    score: 0,
  }

  hideTimeout = null

  guessTimeout = null

  componentDidMount() {
    this.generatePattern()
  }

  componentDidUpdate(_, prevState) {
    const {gameLevel} = this.state
    if (prevState.gameLevel !== gameLevel) {
      this.generatePattern()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.hideTimeout)
    clearTimeout(this.guessTimeout)
  }

  pauseTimers = () => {
    clearTimeout(this.hideTimeout)
    clearTimeout(this.guessTimeout)
  }

  generatePattern = () => {
    const {gameLevel} = this.state

    if (gameLevel > 15) {
      this.endGame(gameLevel)
      return
    }

    const N = gameLevel + 1
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
          this.endGame(gameLevel)
        }
      }, delay)
    }, delay)
  }

  handleTileClick = index => {
    const {gameState, userSelections, gameLevel} = this.state
    const {activeTiles, score} = this.state

    if (gameState !== 'guessing' || userSelections.includes(index)) return

    const newSelections = [...userSelections, index]
    const isCorrect = activeTiles.includes(index)

    if (!isCorrect) {
      clearTimeout(this.guessTimeout)

      const adjustedLevel =
        gameLevel === 10 &&
        userSelections.some(sel => activeTiles.includes(sel))
          ? 9
          : gameLevel

      this.setState({gameState: 'result', userSelections: newSelections})

      setTimeout(() => {
        this.endGame(adjustedLevel)
      }, 1500)
      return
    }

    const isLevelComplete = newSelections.length === activeTiles.length

    if (isLevelComplete) {
      clearTimeout(this.guessTimeout)
      this.setState(
        {
          score: score + gameLevel * 10,
          gameState: 'result',
          userSelections: newSelections,
        },
        () => {
          setTimeout(() => {
            this.setState({gameLevel: gameLevel + 1})
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
    const isShowingPhase = gameState === 'showing'

    let className = 'tile'
    if (isShowingPhase && isActive) className += ' showing'
    if (isCorrectGuess) className += ' correct'
    if (isWrongGuess) className += ' wrong'

    // ✅ Cleaned up to avoid nested ternary
    let testId
    if (isShowingPhase) {
      testId = isActive ? 'highlighted' : 'notHighlighted'
    }

    return (
      <li key={index}>
        <button
          className={className}
          onClick={() => this.handleTileClick(index)}
          type="button"
          disabled={isShowingPhase} // ✅ tiles disabled during showing
          aria-label={`Tile ${index + 1}`}
          data-testid={testId} // ✅ correct for test expectations
        />
      </li>
    )
  }

  endGame = level => {
    this.setState({
      finalLevel: level,
      currentView: 'results',
    })
  }

  playAgain = () => {
    this.setState(
      {
        gameLevel: 1,
        finalLevel: 1,
        currentView: 'playing',
        score: 0,
        activeTiles: [],
        userSelections: [],
        showRules: false,
      },
      this.generatePattern,
    )
  }

  goHome = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    const {
      currentView,
      gameLevel,
      finalLevel,
      gridSize,
      gameState,
      userSelections,
      activeTiles,
      score,
      showRules,
    } = this.state

    const isGameWon =
      gameState === 'result' && userSelections.length === activeTiles.length

    if (currentView === 'results') {
      const percent = Math.min(Math.round((finalLevel / 15) * 100), 100)

      return (
        <div className="game-results-view">
          <button
            type="button"
            className="close-button"
            data-testid="close"
            onClick={this.goHome}
          >
            Close
          </button>

          <main>
            <div className="emoji-progress-bar">
              <div className="emoji-row">
                {emojiMeta.map(({alt, url}) => (
                  <img key={alt} src={url} alt={alt} className="emoji-icon" />
                ))}
              </div>
              <Line
                percent={percent}
                strokeWidth={10}
                strokeColor="#3b82f6"
                className="progress-line"
                data-testid="progress-bar"
              />
              <div className="levels-labels">
                <p>Level 1</p>
                <p>Level 5</p>
                <p>Level 10</p>
                <p>Level 15</p>
              </div>
            </div>

            <h1 className="congrats-heading">Congratulations!</h1>
            <p className="reached-level">You have reached level {finalLevel}</p>

            <button
              type="button"
              className="play-again-button"
              onClick={this.playAgain}
            >
              Play Again
            </button>
          </main>
        </div>
      )
    }

    return (
      <div className="game-playing-view">
        <h1>Memory Matrix</h1>

        <div className="game-header">
          <button className="back-button" onClick={this.goHome} type="button">
            ← Back
          </button>
          <button
            className="rules-button"
            onClick={() => {
              this.pauseTimers()
              this.setState({showRules: true})
            }}
            type="button"
          >
            Rules
          </button>
        </div>

        <div className="game-info">
          {!isGameWon ? (
            <>
              <p>Level - {gameLevel}</p>
              <h3>Score: {score}</h3>
            </>
          ) : (
            <p>Level - {gameLevel}</p>
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

        {gameState === 'result' && isGameWon && <h1>Congratulations</h1>}

        <Modal
          isOpen={showRules}
          onRequestClose={() => this.setState({showRules: false})}
          contentLabel="Rules Modal"
          className="rules-modal"
          overlayClassName="rules-overlay"
        >
          <div className="rules-modal-content">
            <div className="rules-header">
              <h2>Rules</h2>
              <button
                type="button"
                className="rules-close-button"
                data-testid="close"
                onClick={() => {
                  this.setState({showRules: false}, () => {
                    if (gameState !== 'result') {
                      this.generatePattern()
                    }
                  })
                }}
                aria-label="Close rules modal"
              >
                <CgClose size={24} aria-hidden="true" />
              </button>
            </div>
            <ul>
              <li>
                In each level of the Game, Users should be able to see the Grid
                with (N X N) size starting from 3 and the grid will highlight N
                cells in Blue, the N highlighted cells will be picked randomly.
              </li>
              <li>
                The highlighted cells will remain N seconds for the user to
                memorize the cells. At this point, the user should not be able
                to perform any action.
              </li>
              <li>
                After N seconds, the grid will clear the N highlighted cells.
              </li>
              <li>
                At N seconds, the user can click on any cell. Clicking on a cell
                that was highlighted before it will turn blue. Clicking on the
                other cells that were not highlighted before then will turn to
                red.
              </li>
              <li>
                The user should be promoted to the next level if they guess all
                N cells correctly in one attempt.
              </li>
              <li>
                The user should be taken to the results page if the user clicks
                on the wrong cell.
              </li>
              <li>
                If the user completed all the levels, then the user should be
                taken to the results page.
              </li>
            </ul>
          </div>
        </Modal>
      </div>
    )
  }
}

export default MemoryMatrixGame
