/* eslint-disable no-unused-vars */
export interface Post {
  id: string
  author: {
    id: string
    name: string
    handle: string
    avatarUrl?: string
    verified?: boolean
  }
  text?: string
  media?: { type: 'image' | 'video' | 'link' | string; url: string }[]
  metrics: { likes: number; reposts: number; replies: number; views?: number }
  userReactions: { liked: boolean; bookmarked: boolean; reposted: boolean }
  createdAt: string
  tags: string[]
  pair?: string
}

export interface PostCardProps {
  post: Post
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  onLike?: (id: string) => void
  onReply?: (id: string) => void
  onRepost?: (id: string) => void
  onMediaClick?: (media: { type: string; url: string }[], index: number) => void
}
