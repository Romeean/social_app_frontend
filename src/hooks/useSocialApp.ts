import { useState } from 'react'
import { initialPosts, me } from '../data'
import type { Comment, Post, User } from '../data'
import { insertReply } from '../utils/comments'

export type AppPage = 'feed' | 'explore' | 'profile'
export type FeedTab = 'all' | 'following'
export type SortOrder = 'new' | 'popular'

/** Owns feed state and actions shared across the social app. */
export function useSocialApp() {
  const [posts, setPosts] = useState(initialPosts)
  const [page, setPage] = useState<AppPage>('feed')
  const [profile, setProfile] = useState(me)
  const [following, setFollowing] = useState<number[]>([])
  const [tab, setTab] = useState<FeedTab>('all')
  const [topic, setTopic] = useState('Все темы')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortOrder>('new')

  /** Opens a user's profile and resets feed-only filters. */
  function showProfile(user: User) {
    setProfile(user)
    setPage('profile')
    setTopic('Все темы')
    setQuery('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /** Toggles whether the current user follows the given account. */
  function toggleFollow(userId: number) {
    setFollowing((current) => current.includes(userId) ? current.filter((id) => id !== userId) : [...current, userId])
  }

  /** Toggles a post's liked state and keeps its count in sync. */
  function toggleLike(postId: string) {
    setPosts((current) => current.map((post) => post.id === postId ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) } : post))
  }

  /** Adds a reply to the selected post, nesting it when a parent ID is provided. */
  function addReply(postId: string, text: string, parentId?: string) {
    const comment: Comment = { id: crypto.randomUUID(), user: me, text, replies: [] }
    setPosts((current) => current.map((post) => post.id === postId
      ? { ...post, comments: parentId ? insertReply(post.comments, parentId, comment) : [...post.comments, comment] }
      : post))
  }

  /** Adds a freshly published post and returns the app to the full feed. */
  function publishPost(post: Post) {
    setPosts((current) => [post, ...current])
    setPage('feed')
    setTab('all')
    setQuery('')
    setTopic('Все темы')
    setSort('new')
  }

  /** Filters and sorts posts according to the current page and feed controls. */
  function getVisiblePosts() {
    return posts
      .filter((post) => (page !== 'profile' || post.user.id === profile.id)
        && (page !== 'feed' || tab !== 'following' || following.includes(post.user.id))
        && (topic === 'Все темы' || post.topic === topic)
        && `${post.title} ${post.text} ${post.user.name}`.toLowerCase().includes(query.toLowerCase()))
      .sort((left, right) => sort === 'popular' ? right.likes - left.likes : 0)
  }

  return { posts, page, setPage, profile, following, tab, setTab, topic, setTopic, query, setQuery, sort, setSort, showProfile, toggleFollow, toggleLike, addReply, publishPost, getVisiblePosts }
}