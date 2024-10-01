import { ReactNode } from "react";

export interface MenuContextProps {
  isOpen: boolean
  toggleMenu: () => void
}



export interface MenuProps {
  className?: string
  children: ReactNode
}

export interface MenuTriggerProps {
  className?: string
  children: ReactNode

  /** Onclick callback */
  callback?: () => void
}

export interface MenuWrapperProps {
  className?: string
  children: ReactNode
}