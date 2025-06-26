import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import './Home.css'

class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <h1 className="home-heading">Games</h1>
        <ul className="games-list">
          <li className="game-card">
            <Link to="/emoji-game">
              <img
                src="https://res.cloudinary.com/dbug7lhfv/image/upload/v1750611307/f44fa4e27d470d3b6a41ca34dd87685e7465f380_gvtgvg.png"
                alt="emoji game"
                className="game-image"
              />
              <p className="game-title">Emoji Game</p>
            </Link>
          </li>

          <li className="game-card">
            <Link to="/memory-matrix">
              <img
                src="https://res.cloudinary.com/dbug7lhfv/image/upload/v1750700392/memory_2x_sdgfun.png"
                alt="memory matrix"
                className="game-image"
              />
              <p className="game-title">Memory Matrix</p>
            </Link>
          </li>

          <li className="game-card">
            <Link to="/rock-paper-scissor">
              <img
                src="https://res.cloudinary.com/dbug7lhfv/image/upload/v1750694106/Group_7469_tyittk.png"
                alt="rock paper scissor"
                className="game-image"
              />
              <p className="game-title">Rock Paper Scissor</p>
            </Link>
          </li>

          <li className="game-card">
            <Link to="/card-flip-memory-game">
              <img
                src="https://res.cloudinary.com/dbug7lhfv/image/upload/v1750700438/animals_corjq7.png"
                alt="card flip memory game"
                className="game-image"
              />
              <p className="game-title">Card Flip Memory Game</p>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(Home)
