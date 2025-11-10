/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
'use client'

import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import LinkIcon from '@mui/icons-material/Link'
import FlagIcon from '@mui/icons-material/Flag'
import EditIcon from '@mui/icons-material/Edit'

import deletePost from 'src/pages/api/feed/deletePost'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Post } from 'src/types/apps/feedType'

interface Props {
  anchorEl: HTMLElement | null
  open: boolean
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  onClose: () => void
  postId: string
  isOwner: boolean
  onEdit?: (id: string) => void
}

export default function PostOptionsMenu({
  anchorEl,
  open,
  onClose,
  postId,
  isOwner,
  setPosts,
  onEdit,
}: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/feed/${postId}`)
    toast.success('Link copiado!', { position: 'bottom-right' })
    onClose()
  }

  const handleDelete = async () => {
    try {
      await deletePost(postId)

      setPosts((prev: Post[]) => prev.filter((p) => p.id !== postId))

      toast.success('Post deletado com sucesso', { position: 'bottom-right' })
    } catch (err) {
      toast.error('Erro ao deletar o post', { position: 'bottom-right' })
    } finally {
      setConfirmOpen(false)
    }
  }

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {/* ✅ Mostrar somente se o post for do usuário */}
        {isOwner && onEdit && (
          <MenuItem
            onClick={() => {
              onEdit(postId)
              onClose()
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary='Editar' />
          </MenuItem>
        )}

        {isOwner && (
          <MenuItem
            onClick={() => {
              setConfirmOpen(true)
              onClose()
            }}
            sx={{ color: 'error.main' }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize='small' color='error' />
            </ListItemIcon>
            <ListItemText primary='Excluir' />
          </MenuItem>
        )}

        {/* ✅ Sempre aparece */}
        <MenuItem onClick={handleCopyLink}>
          <ListItemIcon>
            <LinkIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Copiar link' />
        </MenuItem>

        {/* ✅ Sempre aparece */}
        <MenuItem
          onClick={() => {
            console.log('Report:', postId)
            toast('Obrigado pelo feedback!', { position: 'bottom-right' })
            onClose()
          }}
        >
          <ListItemIcon>
            <FlagIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Denunciar' />
        </MenuItem>
      </Menu>

      {/* ✅ Modal de confirmação */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirmar exclusão</DialogTitle>

        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir este post? Esta ação não pode ser
            desfeita.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancelar</Button>

          <Button color='error' variant='contained' onClick={handleDelete}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
