import React from 'react'
import GamePlayingView from './GamePlayingView'
import GameResultsView from './GameResultsView'

class MemoryMatrixGame extends React.Component {
  state = {
    currentView: 'playing',
    gameLevel: 1,
    finalLevel: 1,
  }

  endGame = level => {
    this.setState({finalLevel: level, currentView: 'results'})
  }

  playAgain = () => {
    this.setState({gameLevel: 1, currentView: 'playing'})
  }

  goHome = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    const {currentView, gameLevel, finalLevel} = this.state

    return (
      <div className="app">
        {currentView === 'playing' && (
          <GamePlayingView
            level={gameLevel}
            setLevel={level => this.setState({gameLevel: level})}
            onGameEnd={this.endGame}
            onGoBack={this.goHome}
          />
        )}

        {currentView === 'results' && (
          <GameResultsView
            level={finalLevel}
            onPlayAgain={this.playAgain}
            onGoBack={this.goHome}
          />
        )}
      </div>
    )
  }
}

export default MemoryMatrixGame
