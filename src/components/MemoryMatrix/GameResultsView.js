import React from 'react'
import {Line} from 'rc-progress'
import './GameResultsView.css'

class GameResultsView extends React.Component {
  render() {
    const {level, onPlayAgain} = this.props
    const maxLevel = 15
    const percentage = Math.min(100, (level / maxLevel) * 100)

    const emojiAlts = [
      'neutral face',
      'grimacing face',
      'slightly smiling face',
      'grinning face with big eyes',
      'grinning face with smiling eyes',
      'beaming face with smiling eyes',
      'grinning face',
      'smiling face with sunglasses',
    ]

    const milestoneLabels = [1, 5, 10, 15]

    return (
      <div className="results-container">
        <div className="emoji-progress-wrapper">
          <div className="emoji-row">
            {emojiAlts.map(alt => (
              <img
                key={alt}
                className="result-emoji"
                src={`/${alt.replace(/\s+/g, '-')}.png`}
                alt={alt}
              />
            ))}
          </div>
          <div className="progress-bar">
            <Line
              percent={percentage}
              strokeWidth={10}
              strokeColor="#3b82f6"
              trailWidth={10}
            />
          </div>
          <div className="milestone-labels">
            {milestoneLabels.map(milestone => (
              <p key={milestone} className="milestone-label">
                Level {milestone}
              </p>
            ))}
          </div>
        </div>

        <h1 className="congrats-heading">Congratulations!</h1>
        <h2 className="reached-level">You have reached level {level}</h2>

        <button
          className="play-again-button"
          onClick={onPlayAgain}
          type="button"
        >
          Play Again
        </button>
      </div>
    )
  }
}

export default GameResultsView
