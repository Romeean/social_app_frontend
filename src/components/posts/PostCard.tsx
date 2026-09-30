import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Post, User } from '../../data'
import { countComments } from '../../utils/comments'
import { Avatar } from '../common/Avatar'
import { Icon } from '../common/Icon'
import { CommentCard } from '../comments/CommentCard'

type PostCardProps = {
  post: Post
  like: () => void
  openProfile: (user: User) => void
  reply: (text: string, parentId?: string) => void
}

/** Displays a post and its interactive like and comment controls. */
export function PostCard({ post, like, openProfile, reply }: PostCardProps) {
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [replyText, setReplyText] = useState('')

  /** Adds a top-level comment to this post. */
  function handleReplySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!replyText.trim()) return
    reply(replyText.trim())
    setReplyText('')
  }

  return (
    <article className="card post">
      <div className="post-meta">
        <button className="person" onClick={() => openProfile(post.user)}><Avatar user={post.user} /><span><strong>{post.user.name}</strong><small>@{post.user.handle} · {Number(post.id) < 5 ? 'Сегодня' : 'Только что'}</small></span></button>
        <span className="badge">{post.topic}</span>
      </div>
      {post.title && <h2>{post.title}</h2>}
      <p className="post-text">{post.text}</p>
      {post.image && <img className="post-image" src={post.image} alt="Фото к публикации" loading="lazy" />}
      <div className="post-actions">
        <button className={post.liked ? 'liked' : ''} aria-pressed={post.liked} aria-label={`Нравится: ${post.likes}`} onClick={like}><Icon name="heart" />{post.likes}</button>
        <button aria-expanded={commentsOpen} onClick={() => setCommentsOpen((open) => !open)}><Icon name="comment" />{countComments(post.comments)} <span>комментариев</span></button>
        <small>Есть что обсудить</small>
      </div>
      {commentsOpen && <section className="comments" aria-label="Комментарии">
        <form className="reply-form" onSubmit={handleReplySubmit}><input aria-label="Текст комментария" placeholder="Написать ответ…" maxLength={2000} value={replyText} onChange={(event) => setReplyText(event.target.value)} /><button disabled={!replyText.trim()} aria-label="Отправить комментарий">↗</button></form>
        {post.comments.length === 0 && <p className="muted">Станьте первым участником разговора.</p>}
        {post.comments.map((comment) => <CommentCard key={comment.id} comment={comment} reply={(parentId, text) => reply(text, parentId)} />)}
      </section>}
    </article>
  )
}