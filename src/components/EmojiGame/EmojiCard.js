import './EmojiCard.css'

const EmojiCard = props => {
  const {emojiDetails, clickEmoji} = props
  const {id, emojiName, emojiUrl} = emojiDetails

  const onClickEmojiCard = () => {
    clickEmoji(id)
  }

  return (
    <li className="emo-item">
      <button type="button" className="emo-btn" onClick={onClickEmojiCard}>
        <img className="emo-icon" src={emojiUrl} alt={emojiName} />
      </button>
    </li>
  )
}

export default EmojiCard
