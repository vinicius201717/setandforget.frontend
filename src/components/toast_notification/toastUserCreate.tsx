import toast from 'react-hot-toast'

export const notify = (response: boolean) => {
  if (response) {
    toast.success('User created successfully!', {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#48BB78',
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: '16px',
        padding: '16px',
        border: '1px solid #FFFFFF',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      },
      iconTheme: {
        primary: '#FFFFFF',
        secondary: '#48BB78',
      },
    })
  } else {
    toast.error('User creation failed!', {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#E53E3E',
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: '16px',
        padding: '16px',
        border: '1px solid #FFFFFF',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      },
      iconTheme: {
        primary: '#FFFFFF',
        secondary: '#E53E3E',
      },
    })
  }
}
