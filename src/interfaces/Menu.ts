import { ReactNode } from "react";

export type TMenuDirection = 'top' | 'bottom' | 'left' | 'right';
export type TMenuAlign = 'center' | 'left' | 'right' | 'stretch';
export type TMenuAnimation = 'fade' | 'slide';
export type TMenuCloseOn = 'outMenu' | 'both';
export type TMenuStyles = 'none' | 'verbose' | 'pretty';

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

  /** Menu default styles
   * - Verbose - will show hitboxes
   * - Pretty - will show pretty design
   * @default 'none'
   */
  styles?: TMenuStyles

  /** Menu appearance animation
   * @default 'fade'
   */
  animation?: TMenuAnimation

  /** Close menu when clicked out of menu or out and inside
   * @default 'outMenu'
   */
  closeOn?: TMenuCloseOn
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