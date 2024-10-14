import { ReactNode } from "react";

export interface IMenuContextProps {
  isOpen: boolean
  toggleMenu: () => void
}

export type TMenuDirection = 'top' | 'bottom' | 'left' | 'right';
export type TMenuAlign = 'center' | 'left' | 'right' | 'stretch';
export type TMenuAnimation = 'fade' | 'slide';
export type TMenuCloseOn = 'outMenu' | 'both';
export type TMenuStyles = 'none' | 'verbose' | 'pretty';

/** Menu settings */
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



/** Menu component props */
export interface IMenuProps {
  children: ReactNode

  className?: string
  settings?: IMenuSettings
  disabled?: boolean
  instanceId?: string

  /** Gap between primary trigger and menu
   * @default 16
   */
  gap?: number

  /** Sync out state with current menu state */
  state?: boolean

  /** Sync out state with current menu state */
  stateSetter?: (state: boolean) => void
}

/** MenuTrigger component props */
export interface IMenuTriggerProps {
  children: ReactNode

  className?: string
  disabled?: boolean

  /** Onclick callback */
  callback?: () => void

  /** Defines main element for positioning menu */
  primary?: boolean
}

/** MenuWrapper component props */
export interface IMenuWrapperProps {
  className?: string
  children: ReactNode
}