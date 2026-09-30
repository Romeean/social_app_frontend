import type { Comment } from '../data'

/** Counts a comment and every nested reply. */
export function countComments(comments: Comment[]): number {
  return comments.reduce((total, comment) => total + 1 + countComments(comment.replies), 0)
}

/** Adds a new comment to the selected post or inserts it beneath a parent comment. */
export function insertReply(comments: Comment[], parentId: string, reply: Comment): Comment[] {
  return comments.map((comment) =>
    comment.id === parentId
      ? { ...comment, replies: [...comment.replies, reply] }
      : { ...comment, replies: insertReply(comment.replies, parentId, reply) },
  )
}