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
        <Route exact path="/emoji" component={EmojiGameRules} />
        <Route exact path="/emoji/play" component={EmojiGame} />
        {/* Rock Paper Scissors */}
        <Route exact path="/rps" component={RockPaperRules} />
        <Route exact path="/rps/play" component={RockPaperPlay} />
        {/* Memory Matrix */}
        <Route exact path="/matrix" component={MemoryMatrixRules} />
        <Route exact path="/matrix/play" component={MemoryMatrixGame} />
        {/* Card-Flip Memory */}
        <Route exact path="/card-flip" component={CardFlipRules} />
        <Route exact path="/card-flip/play" component={CardFlipGame} />
        <Route exact path="/card-flip/results" component={CardFlipResults} />
      </Switch>
    )
  }
}

export default App
