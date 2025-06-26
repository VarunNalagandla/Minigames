import React from 'react'
import {withRouter} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import './MemoryMatrixRules.css'

class MemoryMatrixRules extends React.Component {
  startGame = () => {
    const {history} = this.props
    history.push('/memory-matrix/play')
  }

  goHome = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    return (
      <div className="game-rules-view">
        <button type="button" className="back-button" onClick={this.goHome}>
          <BiArrowBack className="back-icon" />
          Back
        </button>

        <main>
          <h1 className="main-heading">Memory Matrix</h1>
          <img
            src="https://res.cloudinary.com/dbug7lhfv/image/upload/v1750700392/memory_2x_sdgfun.png"
            alt="memory matrix"
            className="rules-image"
          />

          <h2 className="rules-heading">Rules</h2>
          <div className="rules-columns">
            <ul className="rules-list">
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
                that was highlighted before will turn blue. Clicking on the
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

          <button
            type="button"
            className="start-button"
            onClick={this.startGame}
          >
            Start Playing
          </button>
        </main>
      </div>
    )
  }
}

export default withRouter(MemoryMatrixRules)
