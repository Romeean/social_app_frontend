import type { Post, User } from '../../data'
import { me, topics, users } from '../../data'
import type { AppPage } from '../../hooks/useSocialApp'
import { Avatar } from '../common/Avatar'
import { Icon } from '../common/Icon'

/** Renders primary navigation and the current user's account controls. */
export function MainSidebar({ page, onNavigate, onCompose, onOpenProfile }: {
  page: AppPage
  onNavigate: (page: AppPage) => void
  onCompose: () => void
  onOpenProfile: (user: User) => void
}) {
  const navigation: { id: AppPage; icon: string; label: string }[] = [
    { id: 'feed', icon: 'home', label: 'Главная' },
    { id: 'explore', icon: 'compass', label: 'Обзор' },
    { id: 'profile', icon: 'user', label: 'Мой профиль' },
  ]

  /** Navigates to the selected page, opening the signed-in user's profile when needed. */
  function handleNavigate(nextPage: AppPage) {
    if (nextPage === 'profile') onOpenProfile(me)
    else onNavigate(nextPage)
  }

  return <aside className="sidebar">
    <button className="brand" onClick={() => onNavigate('feed')}><span className="brand-icon">w</span>widori<span>.</span></button>
    <p className="tagline">Шире круг. Ближе люди.</p>
    <nav aria-label="Основная навигация">{navigation.map((item) => <button key={item.id} className={page === item.id ? 'active' : ''} onClick={() => handleNavigate(item.id)}><Icon name={item.icon} /><span>{item.label}</span>{page === item.id && <i />}</button>)}</nav>
    <button className="primary create" onClick={onCompose}><Icon name="plus" /><span>Создать пост</span></button>
    <div className="sidebar-note"><Icon name="leaf" /><p>Для мыслей, находок<br />и новых точек зрения.</p><small>WIDELY ORIENTED</small></div>
    <button className="person account" onClick={() => onOpenProfile(me)}><Avatar user={me} /><span><strong>{me.name}</strong><small>@{me.handle}</small></span><span className="chevron">›</span></button>
  </aside>
}

/** Renders search, suggested users, trending topics, and the app footer. */
export function RightSidebar({ posts, following, query, setQuery, onOpenProfile, onToggleFollow, onSelectTopic }: {
  posts: Post[]
  following: number[]
  query: string
  setQuery: (query: string) => void
  onOpenProfile: (user: User) => void
  onToggleFollow: (userId: number) => void
  onSelectTopic: (topic: string) => void
}) {
  return <aside className="right-sidebar">
    <label className="search"><Icon name="search" /><input aria-label="Поиск постов" placeholder="Поиск в widori" value={query} onChange={(event) => setQuery(event.target.value)} /><span>⌕</span></label>
    <section className="side-card"><h2>На одной волне <span>✧</span></h2><p className="side-caption">Люди, с которыми будет интересно</p>
      {users.map((user) => <div className="suggestion" key={user.id}><button className="person" onClick={() => onOpenProfile(user)}><Avatar user={user} /><span><strong>{user.name}</strong><small>@{user.handle}</small></span></button><button className="follow" aria-label={(following.includes(user.id) ? 'Отписаться от ' : 'Подписаться на ') + user.name} aria-pressed={following.includes(user.id)} onClick={() => onToggleFollow(user.id)}>{following.includes(user.id) ? '✓' : '+'}</button></div>)}
    </section>
    <section className="side-card"><h2>О чём говорят</h2><p className="side-caption">Найдите свой повод для разговора</p>
      {topics.slice(1).map((item, index) => <button className="trending" key={item} onClick={() => onSelectTopic(item)}><span>0{index + 1}</span><span><strong>{item}</strong><small>{posts.filter((post) => post.topic === item).length} публикаций</small></span><span>›</span></button>)}
    </section>
    <section className="about"><div className="eyebrow">● &nbsp; ЗНАКОМЬТЕСЬ, WIDORI</div><h2>Мир шире вашей ленты.</h2><p>У каждого есть история.<br />Здесь есть место для вашей.</p><i /></section>
    <footer><span>widori © 2026</span><span>Сделано для общения ✳</span><p>Демо · изменения до перезагрузки</p></footer>
  </aside>
}