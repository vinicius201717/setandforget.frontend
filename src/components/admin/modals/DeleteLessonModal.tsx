import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'
import { Lesson } from 'src/types/apps/admin'

interface DeleteLessonModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  lessonToDelete: Lesson | null
}

export default function DeleteLessonModal({
  open,
  onClose,
  onConfirm,
  lessonToDelete,
}: DeleteLessonModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Lesson</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete{' '}
          <strong>{lessonToDelete?.name}</strong>? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color='error' variant='contained' onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
