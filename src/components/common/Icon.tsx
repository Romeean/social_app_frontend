const iconPaths: Record<string, string> = {
  home: 'm3 10 9-7 9 7v11H3ZM9 21v-8h6v8',
  compass: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-5-4-2 6-6 2 2-6Z',
  user: 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a8 8 0 0 1 16 0v2',
  search: 'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 6 6',
  plus: 'M12 5v14M5 12h14',
  heart: 'M12 20C-5 9 4-2 12 6c8-8 17 3 0 14Z',
  comment: 'M21 11a9 9 0 0 1-13 8l-5 2 1-6a9 9 0 1 1 17-4Z',
  image: 'M3 3h18v18H3ZM3 17l5-5 4 4 4-6 5 7M7 7h2',
  leaf: 'M20 3C6 2 1 9 6 16S22 15 20 3ZM4 21 15 9',
}

/** Renders a small decorative line icon by name. */
export function Icon({ name }: { name: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={iconPaths[name] ?? iconPaths.plus} />
    </svg>
  )
}