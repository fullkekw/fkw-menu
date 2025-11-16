import { ReactNode, RefObject } from "react";

export interface IMenuContextProps {
  isOpen: boolean
  parentRef: RefObject<HTMLDivElement | null>
  toggleMenu: () => void
}

export type TMenuDirection = 'top' | 'bottom' | 'left' | 'right';
export type TMenuAlign = 'center' | 'start' | 'end' | 'stretch';
export type TMenuAnimation = 'fade' | 'slide';
export type TMenuCloseOn = 'outMenu' | 'both';

/** Menu settings */
export interface IMenuSettings {
  /** Menu direction from trigger
   * @default 'bottom'
   */
  direction?: TMenuDirection

  /** Menu alignment to trigger
   * @param start Left/top side of anchor
   * @param end Right/bottom side of anchor
   * @default 'center'
   */
  align?: TMenuAlign

  /** Menu appearance animation
   * @default 'fade'
   */
  animation?: TMenuAnimation

  /** Close menu when clicked out of menu or out and inside
   * @default 'outMenu'
   */
  closeOn?: TMenuCloseOn

  /** Verbose mode */
  verbose?: boolean
}


/** Menu component props */
export interface IMenuProps {
  children: ReactNode

  className?: string
  settings?: IMenuSettings
  disabled?: boolean
  id?: string

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

  /** Defines main element for positioning menu. At least one must be present */
  anchor?: boolean
}

/** MenuWrapper component props */
export interface IMenuWrapperProps {
  className?: string
  children: ReactNode
}