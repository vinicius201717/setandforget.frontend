export type createNewPostType = {
  id?: string
  name: string
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
  name: string
  description: string
  videoLink: string
}

export interface CategoryWithLessons extends Category {
  classes: Lesson[]
}
