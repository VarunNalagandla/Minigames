import React from 'react'
import {withRouter} from 'react-router-dom'
import './EmojiGameRules.css'

class EmojiGameRules extends React.Component {
  onClickStart = () => {
    const {history} = this.props
    history.push('/emoji/play')
  }

  onClickBack = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    return (
      <div className="emo-rules-container">
        <button
          type="button"
          className="emo-back-button-top"
          onClick={this.onClickBack}
        >
          ← Back
        </button>
        <div className="emo-rules-card">
          <div className="emo-rules-image-section">
            <img
              src="https://res.cloudinary.com/dbug7lhfv/image/upload/v1750611307/f44fa4e27d470d3b6a41ca34dd87685e7465f380_gvtgvg.png"
              alt="emoji game"
              className="emo-rules-image"
            />
            <h1 className="emo-rules-title">Emoji Game</h1>
          </div>
          <div className="emo-rules-text-section">
            <h2 className="emo-rules-heading">Rules</h2>
            <ul className="emo-rules-list">
              <li>User should be able to see the list of Emojis</li>
              <li>
                When the user clicks any one of the Emoji for the first time,
                then the count of the score should be incremented by 1 and the
                List of emoji cards should be shuffled.
              </li>
              <li>
                This process should be repeated every time the user clicks on an
                emoji card
              </li>
              <li>
                When the user clicks on all Emoji cards without clicking any of
                it twice, then the user will win the game
              </li>
              <li>
                When the user clicks on the same Emoji for the second time, then
                the user will lose the game.
              </li>
              <li>
                Once the game is over, the user will be redirected to the
                results page.
              </li>
            </ul>
            <button
              type="button"
              className="emo-start-button"
              onClick={this.onClickStart}
            >
              Start playing
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(EmojiGameRules)
