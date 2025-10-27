import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'

interface DeleteCategoryModalProps {
  openConfirm: boolean
  cancelDelete: () => void
  confirmDelete: () => void
}

export default function DeleteCategory({
  openConfirm,
  cancelDelete,
  confirmDelete,
}: DeleteCategoryModalProps) {
  return (
    <Dialog open={openConfirm} onClose={cancelDelete}>
      <DialogTitle>Confirmar exclusão</DialogTitle>
      <DialogContent>
        <Typography>Deseja realmente excluir esta categoria?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelDelete}>Cancelar</Button>
        <Button onClick={confirmDelete} color='error' variant='contained'>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  )
}
