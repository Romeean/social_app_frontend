import { useRef, useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import type { Post } from '../../data'
import { me, topics } from '../../data'
import { readImageFile, validateImageFile } from '../../utils/images'
import { Avatar } from '../common/Avatar'
import { Icon } from '../common/Icon'

/** Provides the post editor, photo attachment, and publish controls. */
export function PostComposer({ onPublish, isEditing, setIsEditing }: {
  onPublish: (post: Post) => void
  isEditing: boolean
  setIsEditing: (isEditing: boolean) => void
}) {
  const [draft, setDraft] = useState('')
  const [title, setTitle] = useState('')
  const [photo, setPhoto] = useState<string>()
  const [topic, setTopic] = useState('Жизнь')
  const [error, setError] = useState('')
  const fileInput = useRef<HTMLInputElement>(null)
  const textArea = useRef<HTMLTextAreaElement>(null)

  /** Opens the editor and focuses the post text field. */
  function openComposer() {
    setIsEditing(true)
    window.setTimeout(() => textArea.current?.focus(), 0)
  }

  /** Publishes a completed post and resets the editor. */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!draft.trim()) return
    onPublish({ id: crypto.randomUUID(), user: me, title: title.trim(), text: draft.trim(), topic, image: photo, likes: 0, liked: false, comments: [] })
    setDraft('')
    setTitle('')
    setPhoto(undefined)
    setIsEditing(false)
    setError('')
  }

  /** Validates and loads a selected image for the post preview. */
  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!validateImageFile(file)) {
      setError('Выберите JPG, PNG, WebP или GIF размером до 5 МБ.')
      return
    }
    try {
      setPhoto(await readImageFile(file))
      setError('')
    } catch {
      setError('Не удалось прочитать фото.')
    }
  }

  return <section className="card composer" aria-label="Новый пост">
    <div className="composer-start"><Avatar user={me} /><button onClick={openComposer}>Чем хотите поделиться, Александр?</button><Icon name="leaf" /></div>
    {isEditing && <form onSubmit={handleSubmit}>
      <input className="draft-title" aria-label="Заголовок" placeholder="Заголовок (необязательно)" maxLength={160} value={title} onChange={(event) => setTitle(event.target.value)} />
      <textarea ref={textArea} aria-label="Текст поста" placeholder="Ваша мысль может стать началом разговора…" maxLength={5000} value={draft} onChange={(event) => setDraft(event.target.value)} />
      {photo && <div className="attachment"><img src={photo} alt="Предпросмотр фото" /><button type="button" onClick={() => setPhoto(undefined)} aria-label="Удалить фото">×</button></div>}
      <div className="composer-options"><select aria-label="Тема поста" value={topic} onChange={(event) => setTopic(event.target.value)}>{topics.slice(1).map((item) => <option key={item}>{item}</option>)}</select><button type="button" onClick={() => setIsEditing(false)}>Свернуть</button><button className="primary" disabled={!draft.trim()}>Опубликовать</button></div>
    </form>}
    <div className="composer-bottom"><button onClick={() => { openComposer(); fileInput.current?.click() }}><Icon name="image" />Фото</button><span>Большие разговоры начинаются с малого</span></div>
    <input ref={fileInput} hidden type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleFileChange} />
    {error && <p className="error" role="alert">{error}</p>}
  </section>
}