import type { User } from '../../data'

/** Displays a user's initials with their assigned avatar color. */
export function Avatar({ user }: { user: User }) {
  return <span className={`avatar ${user.color}`}>{user.initials}</span>
}