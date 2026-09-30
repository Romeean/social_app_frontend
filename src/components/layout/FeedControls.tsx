import type { AppPage, FeedTab, SortOrder } from '../../hooks/useSocialApp'
import { topics } from '../../data'
import { Icon } from '../common/Icon'

/** Displays the feed tabs, sorting options, topic filters, and mobile search. */
export function FeedControls({ page, tab, setTab, sort, setSort, topic, setTopic, query, setQuery }: {
  page: AppPage
  tab: FeedTab
  setTab: (tab: FeedTab) => void
  sort: SortOrder
  setSort: (sort: SortOrder) => void
  topic: string
  setTopic: (topic: string) => void
  query: string
  setQuery: (query: string) => void
}) {
  const sectionLabel = page === 'profile' ? 'Публикации' : 'Открывайте новое'

  return <>
    <div className="feed-controls"><div className="tabs">{page === 'feed' ? <><button className={tab === 'all' ? 'selected' : ''} onClick={() => setTab('all')}>Вся лента</button><button className={tab === 'following' ? 'selected' : ''} onClick={() => setTab('following')}>Подписки</button></> : <strong>{sectionLabel}</strong>}</div>
      <select aria-label="Порядок постов" value={sort} onChange={(event) => setSort(event.target.value as SortOrder)}><option value="new">Сначала новые</option><option value="popular">Популярные</option></select>
    </div>
    <div className="topics">{topics.map((item) => <button key={item} className={topic === item ? 'selected' : ''} onClick={() => setTopic(item)}>{item}</button>)}</div>
    <label className="search mobile-search"><Icon name="search" /><input aria-label="Поиск по ленте" placeholder="Поиск в widori" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
  </>
}