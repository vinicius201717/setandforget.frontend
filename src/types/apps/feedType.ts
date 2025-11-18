/* eslint-disable no-unused-vars */
export interface PostReactons {
  id: string
  postId: string
  userId: string
  liked: boolean
  reposted: boolean
  createdAt: string
  updatedAt: string
}

export interface PostMetrics {
  likes: number
  reposts: number
  replies: number
  views: number
}

export interface Post {
  id: string
  parentId?: string | null
  author: {
    id: string
    name: string
    handle: string
    avatarUrl?: string
    verified?: boolean
  }
  text?: string
  media?: { type: 'image' | 'video' | 'link' | string; url: string }[]
  metrics: PostMetrics
  userReactions: { liked: boolean; bookmarked: boolean; reposted: boolean }
  createdAt: string
  tags: string[]
  pair?: string
  postReactions: PostReactons[]
}

export interface PostCardProps {
  post: Post
  setPosts?: React.Dispatch<React.SetStateAction<Post[]>>
  onLike?: (id: string) => void
  onReply?: (id: string) => void
  onRepost?: (id: string) => void
  onMediaClick?: (media: { type: string; url: string }[], index: number) => void
  compact?: boolean
}

export interface Media {
  type: 'image' | 'video' | 'link' | string
  url: string
}

export interface RepostedItem {
  id: string
  post: Post
  reposted: boolean
  liked: boolean
}

export interface GetPostsResponse {
  posts: Post[]
  reposted: RepostedItem[]
}
