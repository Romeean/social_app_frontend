import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Comment } from '../../data'
import { Avatar } from '../common/Avatar'

/** Renders one comment, its reply controls, and its nested replies. */
export function CommentCard({ comment, reply }: { comment: Comment; reply: (parentId: string, text: string) => void }) {
  const [isReplying, setIsReplying] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [text, setText] = useState('')

  /** Submits a non-empty reply and closes the reply editor. */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!text.trim()) return
    reply(comment.id, text.trim())
    setText('')
    setIsReplying(false)
  }

  return (
    <div className="comment">
      <div className="comment-user"><Avatar user={comment.user} /><strong>{comment.user.name}</strong></div>
      <p>{comment.text}</p>
      <div className="comment-tools">
        <button onClick={() => setIsReplying((open) => !open)}>Ответить</button>
        {comment.replies.length > 0 && <button onClick={() => setIsCollapsed((collapsed) => !collapsed)}>{isCollapsed ? 'Показать' : 'Свернуть'} ответы · {comment.replies.length}</button>}
      </div>
      {isReplying && <form className="reply-form" onSubmit={handleSubmit}><input aria-label="Текст комментария" placeholder="Написать ответ…" maxLength={2000} value={text} onChange={(event) => setText(event.target.value)} /><button disabled={!text.trim()} aria-label="Отправить комментарий">↗</button></form>}
      {!isCollapsed && <div className="replies">{comment.replies.map((child) => <CommentCard key={child.id} comment={child} reply={reply} />)}</div>}
    </div>
  )
}