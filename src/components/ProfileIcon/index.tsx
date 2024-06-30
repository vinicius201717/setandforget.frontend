import { ReactNode } from 'react'
import { Photo } from './style'

interface ProfileIconProps {
  children: ReactNode
}

export default function ProfileIcon({ children }: ProfileIconProps) {
  return <Photo>{children}</Photo>
}
