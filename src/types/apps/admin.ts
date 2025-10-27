export type createNewPostType = {
  id?: string
  title: string
  subtitle: string
  description?: string
  videoLink: string
  categoryId: string
}

export interface Category {
  id: string
  name: string
}

// Type for lessons
export interface Lesson {
  id: string
  categoryId: string
  title: string
  subtitle: string
  watched: boolean
  description: string
  videoLink: string
}

export interface CategoryWithLessonsResponse {
  id: string
  name: string
  classes: Lesson[]
}

export interface CategoryWithLessons extends Category {
  classes: Lesson[]
}
