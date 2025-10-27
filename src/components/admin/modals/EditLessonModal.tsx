/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { Category, Lesson } from 'src/types/apps/admin'

interface EditLessonModalProps {
  open: boolean
  onClose: () => void
  editData: {
    title: string
    subtitle: string
    description: string
    videoLink: string
    categoryId: string
  }
  setEditData: (data: any) => void
  onSave: () => void
  categories: Category[]
  lessonToEdit: Lesson | null
}

export default function EditLessonModal({
  open,
  onClose,
  editData,
  setEditData,
  onSave,
  categories,
}: EditLessonModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 0,
          backgroundColor: 'background.paper',
          boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'visible',
        },
      }}
      TransitionProps={{ unmountOnExit: true }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: '1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          textAlign: 'center',
        }}
      >
        ✏️ Edit Lesson
      </DialogTitle>

      <DialogContent
        sx={{
          px: 2,
          display: 'grid',
          gap: 3,
          flexGrow: 1,
          overflow: 'visible',
        }}
      >
        <FormControl fullWidth variant='outlined'>
          <InputLabel shrink={!!editData.categoryId}>Category</InputLabel>
          <Select
            label='Category'
            value={editData.categoryId}
            onChange={(e) =>
              setEditData({ ...editData, categoryId: e.target.value })
            }
            sx={{ borderRadius: 2 }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label='Lesson title'
          variant='outlined'
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          fullWidth
          InputLabelProps={{ shrink: !!editData.title }}
        />

        <TextField
          label='Lesson subtitle'
          variant='outlined'
          value={editData.subtitle}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          fullWidth
          InputLabelProps={{ shrink: !!editData.subtitle }}
        />

        <TextField
          label='Description'
          variant='outlined'
          multiline
          rows={4}
          value={editData.description}
          onChange={(e) =>
            setEditData({ ...editData, description: e.target.value })
          }
          fullWidth
          sx={{ gridColumn: '1 / -1', borderRadius: 2 }}
          InputLabelProps={{ shrink: !!editData.description }}
        />

        <TextField
          label='Video Link (YouTube)'
          variant='outlined'
          value={editData.videoLink}
          onChange={(e) =>
            setEditData({ ...editData, videoLink: e.target.value })
          }
          fullWidth
          sx={{ gridColumn: '1 / -1', borderRadius: 2 }}
          InputLabelProps={{ shrink: !!editData.videoLink }}
        />
      </DialogContent>

      <DialogActions
        sx={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          variant='outlined'
          color='inherit'
          onClick={onClose}
          sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={onSave}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
