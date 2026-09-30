import './App.css'
import './theme.css'
import { PostComposer } from './components/composer/PostComposer'
import { Icon } from './components/common/Icon'
import { PostCard } from './components/posts/PostCard'
import { ProfilePanel } from './components/profile/ProfilePanel'
import { FeedControls } from './components/layout/FeedControls'
import { MainSidebar, RightSidebar } from './components/layout/Sidebars'
import { WelcomeBanner } from './components/layout/WelcomeBanner'
import { useSocialApp } from './hooks/useSocialApp'
import { useState } from 'react'

/** Composes the application shell and connects its feature components. */
export default function App() {
  const social = useSocialApp()
  const [isComposerOpen, setIsComposerOpen] = useState(false)
  const visiblePosts = social.getVisiblePosts()
  const pageTitle = social.page === 'profile' ? 'Профиль' : social.page === 'explore' ? 'Интересное рядом' : 'Главная'

  /** Opens the selected topic in the discovery feed. */
  function selectTopic(topic: string) {
    social.setPage('explore')
    social.setTopic(topic)
    social.setQuery('')
  }

  /** Opens a destination page and resets its topic filter. */
  function navigate(page: 'feed' | 'explore' | 'profile') {
    social.setPage(page)
    social.setTopic('Все темы')
  }

  return <div className="layout">
    <MainSidebar page={social.page} onNavigate={navigate} onCompose={() => setIsComposerOpen(true)} onOpenProfile={social.showProfile} />
    <main>
      <header><div><div className="eyebrow">ВАШ МАЛЕНЬКИЙ БОЛЬШОЙ МИР</div><h1>{pageTitle}</h1></div><span className="header-leaf"><Icon name="leaf" /></span></header>
      {social.page === 'profile'
        ? <ProfilePanel user={social.profile} posts={social.posts} followingCount={social.following.length} isFollowing={social.following.includes(social.profile.id)} onToggleFollow={() => social.toggleFollow(social.profile.id)} />
        : <WelcomeBanner />}
      <PostComposer onPublish={social.publishPost} isEditing={isComposerOpen} setIsEditing={setIsComposerOpen} />
      <FeedControls page={social.page} tab={social.tab} setTab={social.setTab} sort={social.sort} setSort={social.setSort} topic={social.topic} setTopic={social.setTopic} query={social.query} setQuery={social.setQuery} />
      <div className="feed">{visiblePosts.map((post) => <PostCard key={post.id} post={post} openProfile={social.showProfile} like={() => social.toggleLike(post.id)} reply={(text, parentId) => social.addReply(post.id, text, parentId)} />)}
        {!visiblePosts.length && <section className="card empty"><Icon name="compass" /><h2>Здесь пока тихо</h2><p>{social.page === 'feed' && social.tab === 'following' ? 'Подпишитесь на авторов во вкладке «Обзор», чтобы видеть их посты.' : 'Попробуйте другую тему или измените поисковый запрос.'}</p></section>}
      </div>
      <p className="feed-end">— &nbsp; Вы там, где нужно. Оставайтесь любопытными. &nbsp; —</p>
    </main>
    <RightSidebar posts={social.posts} following={social.following} query={social.query} setQuery={social.setQuery} onOpenProfile={social.showProfile} onToggleFollow={social.toggleFollow} onSelectTopic={selectTopic} />
  </div>
}