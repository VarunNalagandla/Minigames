import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'

// Emoji Game
import EmojiGameRules from './components/EmojiGame/EmojiGameRules'
import EmojiGame from './components/EmojiGame/EmojiGame'

// Rock Paper Scissors
import RockPaperRules from './components/RockPaperScissors/RockPaperRules'
import RockPaperPlay from './components/RockPaperScissors/RockPaperPlay'

// Memory Matrix
import MemoryMatrixRules from './components/MemoryMatrix/MemoryMatrixRules'
import MemoryMatrixGame from './components/MemoryMatrix/MemoryMatrixGame'

// Card-Flip Memory
import CardFlipRules from './components/CardFlip/CardFlipRules'
import CardFlipGame from './components/CardFlip/CardFlipGame'
import CardFlipResults from './components/CardFlip/CardFlipResults'

import './App.css'

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        {/* Emoji Game */}
        <Route exact path="/emoji-game" component={EmojiGameRules} />
        <Route exact path="/emoji-game/play" component={EmojiGame} />
        {/* Rock Paper Scissors */}
        <Route exact path="/rock-paper-scissor" component={RockPaperRules} />
        <Route
          exact
          path="/rock-paper-scissor/play"
          component={RockPaperPlay}
        />
        {/* Memory Matrix */}
        <Route exact path="/memory-matrix" component={MemoryMatrixRules} />
        <Route exact path="/memory-matrix/play" component={MemoryMatrixGame} />
        {/* Card-Flip Memory Game */}
        <Route exact path="/card-flip-memory-game" component={CardFlipRules} />
        <Route
          exact
          path="/card-flip-memory-game/play"
          component={CardFlipGame}
        />
        <Route
          exact
          path="/card-flip-memory-game/results"
          component={CardFlipResults}
        />
      </Switch>
    )
  }
}

export default App
