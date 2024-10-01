import { ReactNode } from "react";

export type TMenuDirection = 'top' | 'bottom' | 'left' | 'right'
export type TMenuAlign = 'center' | 'left' | 'right' | 'stretch'

export interface IMenuContextProps {
  isOpen: boolean
  toggleMenu: () => void
}

export interface IMenuSettings {
  /** Menu direction from trigger
   * @default 'bottom'
   */
  direction?: TMenuDirection

  /** Menu alignment to trigger
   * @default 'center'
   */
  align?: TMenuAlign

  /** Verbose mode will color elements offsets
   * @default false
   */
  verbose?: boolean
}



export interface IMenuProps {
  className?: string
  children: ReactNode
  settings?: IMenuSettings

  /** Gap between primary trigger and menu
   * @default 16
   */
  gap?: number
}

export interface IMenuTriggerProps {
  className?: string
  children: ReactNode

  /** Onclick callback */
  callback?: () => void

  /** Defines main element for positioning menu */
  primary: boolean
}

export interface IMenuWrapperProps {
  className?: string
  children: ReactNode
}

export interface IMenuContentProps {
  className?: string
  children: ReactNode
}