// src/layouts/GuestGuard.tsx
/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import { GUEST_ROUTES } from 'src/configs/routes'

// Defina o tipo explícito para as rotas
export type GuestRoute = (typeof GUEST_ROUTES)[number]

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = ({ children, fallback }: GuestGuardProps) => {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady || auth.loading) {
      return
    }

    if (auth.user || window.localStorage.getItem('userData')) {
      router.replace('/')
    }
  }, [auth.user, auth.loading, router.isReady, router.route])

  if (auth.loading) {
    return fallback
  }

  if (
    auth.user !== null &&
    GUEST_ROUTES.includes(router.pathname as GuestRoute)
  ) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
