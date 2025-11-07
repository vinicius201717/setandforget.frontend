/* eslint-disable no-unused-vars */
'use client'

import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import LinkIcon from '@mui/icons-material/Link'
import FlagIcon from '@mui/icons-material/Flag'
import EditIcon from '@mui/icons-material/Edit'

interface Props {
  anchorEl: HTMLElement | null
  open: boolean
  onClose: () => void
  postId: string
  onDelete?: (id: string) => void
  onEdit?: (id: string) => void
}

export default function PostOptionsMenu({
  anchorEl,
  open,
  onClose,
  postId,
  onDelete,
  onEdit,
}: Props) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/feed/${postId}`)
    onClose()
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      {onEdit && (
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

      {onDelete && (
        <MenuItem
          onClick={() => {
            onDelete(postId)
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

      <MenuItem onClick={handleCopyLink}>
        <ListItemIcon>
          <LinkIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText primary='Copiar link' />
      </MenuItem>

      <MenuItem
        onClick={() => {
          console.log('Report:', postId)
          onClose()
        }}
      >
        <ListItemIcon>
          <FlagIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText primary='Denunciar' />
      </MenuItem>
    </Menu>
  )
}
