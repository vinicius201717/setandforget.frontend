/* eslint-disable no-unused-vars */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material'

interface NewCategoryModalProps {
  open: boolean
  onClose: () => void
  newCategory: string
  setNewCategory: (value: string) => void
  onAdd: () => void
}

export default function NewCategoryModal({
  open,
  onClose,
  newCategory,
  setNewCategory,
  onAdd,
}: NewCategoryModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Category</DialogTitle>
      <DialogContent sx={{ pt: 3, pb: 2, minWidth: 300 }}>
        <TextField
          autoFocus
          label='Category Name'
          fullWidth
          variant='outlined'
          sx={{ mt: 2 }}
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant='contained' onClick={onAdd}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}
