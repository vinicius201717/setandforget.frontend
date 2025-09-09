// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'
import GoodGameLogo from 'src/@core/components/logo'

interface Props {
  hidden: LayoutProps['hidden']
  settings: LayoutProps['settings']
  saveSettings: LayoutProps['saveSettings']
  appBarContent: NonNullable<
    NonNullable<LayoutProps['horizontalLayoutProps']>['appBar']
  >['content']
  appBarBranding: NonNullable<
    NonNullable<LayoutProps['horizontalLayoutProps']>['appBar']
  >['branding']
}

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8),
}))

const AppBarContent = (props: Props) => {
  // ** Props
  const {
    appBarContent: userAppBarContent,
    appBarBranding: userAppBarBranding,
  } = props

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {userAppBarBranding ? (
        userAppBarBranding(props)
      ) : (
        <LinkStyled href='/'>
          <GoodGameLogo />
          <Typography
            variant='h6'
            sx={{
              ml: 3,
              fontWeight: 600,
              lineHeight: 'normal',
              textTransform: 'uppercase',
            }}
          >
            {themeConfig.templateName}
          </Typography>
        </LinkStyled>
      )}
      {userAppBarContent ? userAppBarContent(props) : null}
    </Box>
  )
}

export default AppBarContent
