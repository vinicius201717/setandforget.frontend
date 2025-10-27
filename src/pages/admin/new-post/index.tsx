/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import createNewPost from 'src/pages/api/admin/createNewPost'
import {
  Category,
  CategoryWithLessons,
  createNewPostType,
  Lesson,
} from 'src/types/apps/admin'
import toast from 'react-hot-toast'
import createCategory from 'src/pages/api/admin/createCategory'
import { get } from 'lodash'
import getCategory from 'src/pages/api/admin/getCategoryLesson'
import deleteClass from 'src/pages/api/admin/deleteClass'
import updateClass from 'src/pages/api/admin/updateClass'

import EditLessonModal from 'src/components/admin/modals/EditLessonModal'
import NewCategoryModal from 'src/components/admin/modals/NewCategoryModal'
import DeleteLessonModal from 'src/components/admin/modals/DeleteLessonModal'
import LessonList from 'src/components/admin/components/LessonList'
import DeleteCategory from 'src/components/admin/modals/DeleteCategory'
import deleteCategory from 'src/pages/api/admin/deleteCategory'

// Define the Zod schema based on CreateVideoDto
const createVideoSchema = z.object({
  title: z.string().min(1, 'Name is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  description: z.string().optional(),
  videoLink: z
    .string()
    .url('Must be a valid URL')
    .min(1, 'Video URL is required'),
  categoryId: z.string().min(1, 'Category is required'),
})

// Map categories to IDs (assuming categories have IDs)

export default function AdminContentPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [newCategory, setNewCategory] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [lessonToEdit, setLessonToEdit] = useState<Lesson | null>(null)
  const [editData, setEditData] = useState({
    title: '',
    subtitle: '',
    description: '',
    videoLink: '',
    categoryId: '',
  })
  const [openConfirm, setOpenConfirm] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)

  // Initialize react-hook-form with zod resolver
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createVideoSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      description: '',
      videoLink: '',
      categoryId: '',
    },
  })

  const handleAddLesson = async (data: createNewPostType) => {
    try {
      createNewPost({
        ...data,
      }).then((response: any) => {
        toast.success('Post created successfully!', {
          position: 'bottom-right',
        })

        setLessons([...lessons, response.data])
        reset()
      })
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  const handleEditLesson = (lesson: Lesson) => {
    setLessonToEdit(lesson)
    setEditData({
      title: lesson.title,
      subtitle: lesson.subtitle,
      description: lesson.description || '',
      videoLink: lesson.videoLink || '',
      categoryId: lesson.categoryId,
    })
    setOpenEditDialog(true)
  }

  const handleUpdateLesson = async () => {
    if (!lessonToEdit) return

    updateClass(lessonToEdit.id, editData)
      .then(() => {
        toast.success('Lesson updated successfully!', {
          position: 'bottom-right',
        })

        setLessons((prevLessons) =>
          prevLessons.map((l) =>
            l.id === lessonToEdit.id ? { ...l, ...editData } : l,
          ),
        )

        setOpenEditDialog(false)
        setLessonToEdit(null)
      })
      .catch((error) => {
        console.error('Error updating lesson:', error)
        toast.error('Failed to update lesson. Please try again.', {
          position: 'bottom-right',
        })
      })
  }

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error('Please enter a category name.', { position: 'bottom-right' })
      return
    }

    createCategory(newCategory)
      .then((response: any) => {
        toast.success('Category created successfully!', {
          position: 'bottom-right',
        })

        const newCat = {
          id: response.data.id,
          name: response.data.name || newCategory,
        }

        setCategories((prev) => [...prev, newCat])
        setNewCategory('')
        setOpenDialog(false)
      })
      .catch((error: any) => {
        console.error('Error creating category:', error)
        toast.error('Failed to create category. Please try again.', {
          position: 'bottom-right',
        })
      })
  }

  const groupedLessons = categories.map((cat) => ({
    id: cat.id,
    category: cat.name,
    lessons: lessons.filter((l) => l.categoryId === cat.id),
  }))

  const handleDeleteCategory = (categoryId: string) => {
    setCategoryToDelete(categoryId)
    setOpenConfirm(true)
  }

  const confirmDelete = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete).then(() => {
        setCategories((prevCategories) =>
          prevCategories.filter((cat) => cat.id !== categoryToDelete),
        )
        toast.success('Category deleted successfully!', {
          position: 'bottom-right',
        })
      })
    }
    setOpenConfirm(false)
    setCategoryToDelete(null)
  }

  const cancelDelete = () => {
    setOpenConfirm(false)
    setCategoryToDelete(null)
  }

  const handleDeleteLesson = (lessonToDelete: Lesson) => {
    setLessonToDelete(lessonToDelete)
    setOpenDeleteDialog(true)
  }

  const confirmDeleteLesson = () => {
    if (lessonToDelete) {
      deleteClass(lessonToDelete.id).then(() => {
        setLessons((prevLessons) =>
          prevLessons.filter((lesson) => lesson !== lessonToDelete),
        )
        toast.success('Lesson deleted successfully!', {
          position: 'bottom-right',
        })
      })
    }
    setLessonToDelete(null)
    setOpenDeleteDialog(false)
  }

  useEffect(() => {
    getCategory().then((res) => {
      const fetchedCategories = get(res, 'data', [])

      // Set categories
      setCategories(
        fetchedCategories.map((cat: CategoryWithLessons) => ({
          id: cat.id,
          name: cat.name,
        })),
      )

      // Set lessons
      const allLessons: Lesson[] = []
      fetchedCategories.forEach((cat: CategoryWithLessons) => {
        if (Array.isArray(cat.classes)) {
          cat.classes.forEach((lesson: Lesson) => {
            allLessons.push({
              id: lesson.id,
              categoryId: cat.id,
              title: lesson.title,
              subtitle: lesson.subtitle,
              watched: lesson.watched,
              description: lesson.description,
              videoLink: lesson.videoLink,
            })
          })
        }
      })

      setLessons(allLessons)
    })
  }, [])

  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        maxWidth: '800px',
        mx: 'auto',
      }}
    >
      <Typography variant='h4' fontWeight={600}>
        Add Content
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: 3,
        }}
        component='form'
        onSubmit={handleSubmit(handleAddLesson)}
      >
        <FormControl fullWidth error={!!errors.categoryId}>
          <InputLabel>Category</InputLabel>
          <Controller
            name='categoryId'
            control={control}
            render={({ field }) => (
              <Select
                label='Category'
                {...field}
                onChange={(e) => field.onChange(String(e.target.value))}
              >
                <MenuItem value={0} disabled>
                  Select a category
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.categoryId && (
            <Typography color='error' variant='caption'>
              {errors.categoryId.message}
            </Typography>
          )}
        </FormControl>

        <Button
          variant='outlined'
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          New Category
        </Button>

        <Controller
          name='title'
          control={control}
          render={({ field }) => (
            <TextField
              label='Lesson title'
              fullWidth
              {...field}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />

        <Controller
          name='subtitle'
          control={control}
          render={({ field }) => (
            <TextField
              label='Lesson subtitle'
              fullWidth
              {...field}
              error={!!errors.subtitle}
              helperText={errors.subtitle?.message}
            />
          )}
        />

        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <TextField
              label='Description'
              multiline
              rows={3}
              fullWidth
              {...field}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />

        <Controller
          name='videoLink'
          control={control}
          render={({ field }) => (
            <TextField
              label='Video Link (YouTube)'
              fullWidth
              {...field}
              error={!!errors.videoLink}
              helperText={errors.videoLink?.message}
            />
          )}
        />

        <Button type='submit' variant='contained'>
          Add Class
        </Button>
      </Box>

      <Box>
        <Typography variant='h5' sx={{ mb: 2 }}>
          Content Created
        </Typography>
        {groupedLessons.map((group) => (
          <Accordion key={group.category}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Typography fontWeight={600}>{group.category}</Typography>
                {group.lessons.length === 0 && (
                  <IconButton
                    size='small'
                    color='error'
                    onClick={() => handleDeleteCategory(group.id)}
                  >
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                )}
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              {group.lessons.length > 0 ? (
                <LessonList
                  lessons={group.lessons}
                  handleEditLesson={handleEditLesson}
                  handleDeleteLesson={handleDeleteLesson}
                />
              ) : (
                <Typography variant='body2' color='text.secondary'>
                  No classes in this category yet.
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <DeleteCategory
        cancelDelete={cancelDelete}
        confirmDelete={confirmDelete}
        openConfirm={openConfirm}
      />
      <EditLessonModal
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        editData={editData}
        setEditData={setEditData}
        onSave={handleUpdateLesson}
        categories={categories}
        lessonToEdit={lessonToEdit}
      />

      <NewCategoryModal
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        onAdd={handleAddCategory}
      />

      <DeleteLessonModal
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={confirmDeleteLesson}
        lessonToDelete={lessonToDelete}
      />
    </Box>
  )
}
