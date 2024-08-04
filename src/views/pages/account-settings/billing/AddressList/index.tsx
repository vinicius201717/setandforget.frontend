// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect, useState } from 'react'
import { getAllAddress } from 'src/pages/api/address/getAllAddress'
import {
  AddressListProps,
  PostAddressResponseType,
} from 'src/types/apps/addressType'
import { AddressBox, AddressDetails, AddressTitle } from './style'
import { deleteAddress } from 'src/pages/api/address/deleteAddress'
import toast from 'react-hot-toast'

const AddressList = ({ addresses, setAddresses }: AddressListProps) => {
  const [open, setOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)

  useEffect(() => {
    getAllAddress().then(
      (response: PostAddressResponseType[] | null | undefined) => {
        if (response) {
          setAddresses(response)
        }
      },
    )
  }, [setAddresses])

  const handleClickOpen = (id: string) => {
    setSelectedAddress(id)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedAddress(null)
  }

  const handleDelete = () => {
    if (selectedAddress !== null) {
      deleteAddress(selectedAddress).then(() => {
        const newAddresses = addresses.filter(
          (address) => address.id !== selectedAddress,
        )
        setAddresses(newAddresses)
        handleClose()
        toast.success('Address deleted successfully', {
          position: 'bottom-right',
        })
      })
    }
  }
  if (addresses.length > 0) {
    return (
      <Card>
        <CardHeader title='Saved Addresses' />
        <CardContent>
          <Grid container spacing={4}>
            {addresses.map((address, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <AddressBox>
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <AddressTitle variant='h6' gutterBottom>
                      Address {index + 1}
                    </AddressTitle>
                    <IconButton
                      color='secondary'
                      onClick={() => handleClickOpen(address.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <AddressDetails variant='body1'>
                    {address.address}
                  </AddressDetails>
                  <AddressDetails variant='body1'>
                    {address.city}, {address.state}
                  </AddressDetails>
                  <AddressDetails variant='body1'>
                    {address.zipCode}
                  </AddressDetails>
                  <AddressDetails variant='body1'>
                    {address.country}
                  </AddressDetails>
                </AddressBox>
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Delete Address</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Are you sure you want to delete this address?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleDelete} color='primary' autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    )
  } else {
    return <></>
  }
}

export default AddressList
