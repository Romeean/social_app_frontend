import type { Post, User } from '../../data'
import { me } from '../../data'
import { Avatar } from '../common/Avatar'

/** Shows a user's profile details, post count, and follow action. */
export function ProfilePanel({ user, posts, followingCount, isFollowing, onToggleFollow }: {
  user: User
  posts: Post[]
  followingCount: number
  isFollowing: boolean
  onToggleFollow: () => void
}) {
  const postCount = posts.filter((post) => post.user.id === user.id).length

  return <section className="card profile">
    <div className="cover">Каждая мысль — начало разговора.<span>✳</span></div>
    <div className="profile-body">
      <Avatar user={user} />
      <div className="profile-heading"><h2>{user.name}</h2>{user.id !== me.id && <button className="primary" onClick={onToggleFollow}>{isFollowing ? 'Вы подписаны' : 'Подписаться'}</button>}</div>
      <span className="muted">@{user.handle}</span>
      <p>{user.id === me.id ? 'Замечаю интересное в повседневном. Дизайн, прогулки и немного технологий.' : 'Делюсь находками, вдохновением и маленькими открытиями.'}</p>
      <div className="stats"><span><b>{postCount}</b> постов</span>{user.id === me.id && <span><b>{followingCount}</b> подписок</span>}</div>
    </div>
  </section>
}