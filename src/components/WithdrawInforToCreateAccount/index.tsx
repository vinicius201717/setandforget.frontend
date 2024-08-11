import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { InfoContainer, StyledLink } from './style'

export const WithdrawInfoToCreateAccount = () => {
  return (
    <InfoContainer>
      <Typography variant='body1' gutterBottom>
        No bank accounts available. Please add a bank account to proceed with
        the withdrawal. The link takes you to the page to add a withdrawal bank
        account with instructions. When the page opens, the options{' '}
        <Box component='span' fontWeight='fontWeightBold'>
          Credit/Debit/ATM
        </Box>{' '}
        Card will be selected. Change the selection to{' '}
        <Box component='span' fontWeight='fontWeightBold'>
          Withdraw
        </Box>
        . Follow these steps:
        <ol>
          <li>
            Click on the{' '}
            <Box component='span' fontWeight='fontWeightBold'>
              Withdraw
            </Box>{' '}
            dropdown menu.
          </li>
          <li>
            Fill in your bank account details, including account number and
            routing number.
          </li>
          <li>
            Ensure all provided information is accurate to avoid any issues with
            transactions.
          </li>
          <li>
            Click on the{' '}
            <Box component='span' fontWeight='fontWeightBold'>
              Submit
            </Box>{' '}
            button to save your bank account details.
          </li>
          <li>
            After submitting and completing the addition of the account, return
            here and try again.
          </li>
        </ol>
      </Typography>
      <StyledLink href='/pages/account-settings/billing'>
        Add Bank Account
      </StyledLink>
    </InfoContainer>
  )
}
