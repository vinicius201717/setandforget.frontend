// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
import Layout from 'src/@core/layouts/Layout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'
import HorizontalNavItems from 'src/navigation/horizontal'

// ** Component Imports
import VerticalAppBarContent from './components/vertical/AppBarContent'
import HorizontalAppBarContent from './components/horizontal/AppBarContent'

// ** Hook Imports
import { useSettings } from 'src/@core/hooks/useSettings'
import { useAuth } from 'src/hooks/useAuth'

// ** Types Imports
import { VerticalNavItemsType } from 'src/@core/layouts/types' // 👈 importante

interface Props {
  children: ReactNode
  contentHeightFixed?: boolean
}

const UserLayout = ({ children, contentHeightFixed }: Props) => {
  const { settings, saveSettings } = useSettings()
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const { user } = useAuth()

  const userRole: string | undefined = user?.role

  // ✅ Carrega o menu
  const allNavItems: VerticalNavItemsType = VerticalNavItems()

  // ✅ Filtro recursivo compatível com VerticalNavItemsType
  const filterByRole = (
    items: VerticalNavItemsType,
    role?: string,
  ): VerticalNavItemsType => {
    return items
      .map((item) => {
        // Se o item não tiver role, mantém
        if (!('role' in item) || !role) return item

        // Se tiver role, verifica permissão
        const hasPermission = Array.isArray(item.role)
          ? item.role.includes(role)
          : item.role === role

        if (!hasPermission) return null

        // Se tiver children, filtra recursivamente
        if ('children' in item && item.children) {
          const filteredChildren = filterByRole(item.children, role)
          return { ...item, children: filteredChildren }
        }

        return item
      })
      .filter((item): item is Exclude<typeof item, null> => Boolean(item))
  }

  const filteredNavItems = filterByRole(allNavItems, userRole)

  // Corrige layout horizontal em telas pequenas
  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical'
  }

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        navMenu: {
          // ✅ Tipagem compatível
          navItems: filteredNavItems,
        },
        appBar: {
          content: (props) => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          ),
        },
      }}
      {...(settings.layout === 'horizontal' && {
        horizontalLayoutProps: {
          navMenu: {
            navItems: HorizontalNavItems(),
          },
          appBar: {
            content: () => (
              <HorizontalAppBarContent
                hidden={hidden}
                settings={settings}
                saveSettings={saveSettings}
              />
            ),
          },
        },
      })}
    >
      {children}
    </Layout>
  )
}

export default UserLayout
