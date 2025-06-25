import React from 'react'
import {withRouter} from 'react-router-dom'

class MemoryMatrixRules extends React.Component {
  startGame = () => {
    const {history} = this.props
    history.push('/matrix/play')
  }

  goHome = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    return (
      <div className="game-rules-view">
        <button type="button" className="back-button" onClick={this.goHome}>
          ← Back
        </button>
        <h1>Memory Matrix Rules</h1>

        <div className="rules-content">
          <h2>How to Play</h2>
          <ol>
            <li>Watch as tiles light up in a specific pattern</li>
            <li>Remember the pattern</li>
            <li>Click on the tiles in the same order they lit up</li>
            <li>Correct answers advance you to the next level</li>
            <li>Each level increases the pattern complexity</li>
          </ol>

          <h2>Scoring</h2>
          <ul>
            <li>+10 points for each correct pattern</li>
            <li>Bonus points for completing levels quickly</li>
            <li>Reach level 4 to complete the game</li>
          </ul>
        </div>

        <button type="button" className="start-button" onClick={this.startGame}>
          Start Playing
        </button>
      </div>
    )
  }
}

export default withRouter(MemoryMatrixRules)
