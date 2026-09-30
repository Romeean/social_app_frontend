export type User = { id: number; name: string; handle: string; initials: string; color: string }

export type Comment = { id: string; user: User; text: string; replies: Comment[] }

export type Post = { id: string; user: User; title: string; text: string; topic: string; image?: string; likes: number; liked: boolean; comments: Comment[] }

export const me: User = { id: 0, name: 'Александр', handle: 'alex', initials: 'АЛ', color: 'sage' }

export const users: User[] = [
{ id: 1, name: 'Анна Смирнова', handle: 'annasm', initials: 'АС', color: 'peach' },
{ id: 2, name: 'Марк Волков', handle: 'markv', initials: 'МВ', color: 'blue' },
{ id: 3, name: 'Елена Ким', handle: 'lenakim', initials: 'ЕК', color: 'lilac' }]

export const topics = ['Все темы', 'Вдохновение', 'Технологии', 'Дизайн', 'Жизнь']

export const initialPosts: Post[] = [
{ id: '1', user: users[0], title: 'Иногда лучший план — просто выйти из дома', text: 'Уехали на выходные подальше от города. Ни уведомлений, ни списков дел — только горы, прохладный воздух и долгие разговоры. Оказывается, для перезагрузки нужно совсем немного.\nА где вы находите свою тишину?', topic: 'Вдохновение', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85', likes: 128, liked: false, comments: [{ id: 'c1', user: users[1], text: 'Какой вид! В горах даже мысли становятся спокойнее.', replies: [{ id: 'c2', user: users[0], text: 'Да! Уже хочется вернуться 🌿', replies: [] }] }] },
{ id: '2', user: users[1], title: 'Маленькие проекты — лучший способ учиться', text: 'Перестал бесконечно смотреть туториалы и начал делать небольшой проект для себя. За неделю разобрался в большем, чем за месяц теории.\nРасскажите, что вы сейчас делаете? Даже если это пока просто идея.', topic: 'Технологии', likes: 64, liked: false, comments: [] },
{ id: '3', user: users[2], title: 'Место для медленного утра', text: 'Нашла маленькую кофейню, где никто никуда не торопится. Книга, фильтр-кофе и столик у окна. Оставлю это здесь как напоминание: иногда можно просто быть.', topic: 'Жизнь', likes: 42, liked: false, comments: [] },
{ id: '4', user: me, title: 'Больше пространства, меньше шума', text: 'Люблю интерфейсы, в которых есть место для самого главного — людей и их мыслей. Привет, widori. Давайте знакомиться!', topic: 'Дизайн', likes: 12, liked: false, comments: [] }]
