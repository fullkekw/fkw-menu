![cover](https://github.com/fullkekw/fkw-menu/raw/main/cover.png)

React menu (dropdown) component written on Typescript. Compatible with Next & Vite!

## Features
- Simple usage
- Manipulating menu state out of component
- Flexible settings


## Examples
Import component & styles
```ts
import '@fullkekw/fkw-menu/css';
import { Menu, MenuTrigger, MenuWrapper } from "@fullkekw/fkw-menu";
```

Default usage, will listen menu state changes
```tsx
import '@fullkekw/fkw-menu/css';
import React, { useEffect, useState } from "react";
import { Menu, MenuTrigger, MenuWrapper } from "@fullkekw/fkw-menu";

const Home: React.FC = () => {
  const [state, setState] = useState(true);

  useEffect(() => console.log(state), [state]);

  return (
    <div className="Home w-screen h-full min-h-screen bg-slate-500 p-[50px]">
      <Menu stateSetter={setState}>
        {/* At least one trigger must be anchor. Menu will be positioned relatively this element */}
        <MenuTrigger anchor>Trigger</MenuTrigger>
        <MenuTrigger>Trigger</MenuTrigger>

        <MenuWrapper>
          <p>Item_1</p>
          <p>Item_2</p>
          <p>Item_3</p>
        </MenuWrapper>
      </Menu>
    </div>
  );
};

export default Home;
```

Menu will appear at top-right corner of **anchor** trigger in **verbose** mode and **slide** animation
```tsx
import '@fullkekw/fkw-menu/css';
import React, { useEffect, useState } from "react";
import { Menu, MenuTrigger, MenuWrapper } from "@fullkekw/fkw-menu";

const Home: React.FC = () => {
  const [state, setState] = useState(true);

  useEffect(() => console.log(state), [state]);

  return (
    <div className="Home w-screen h-full min-h-screen bg-slate-500 p-[50px]">
      <button onClick={() => setState(prev => !prev)}>Change state out of component</button>

      <Menu settings={{ direction: 'top', align: 'end', animation: 'slide', verbose: true }} state={state} stateSetter={setState}>
        <MenuTrigger anchor>Trigger</MenuTrigger>

        <MenuWrapper>
          <p>Item_1</p>
          <p>Item_2</p>
          <p>Item_3</p>
        </MenuWrapper>
      </Menu>
    </div>
  );
};

export default Home;
```

## API
```ts
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
```


## Installation
Using npm
```
npm install @fullkekw/fkw-menu
```

Using pnpm
```
pnpm install @fullkekw/fkw-menu
```

Using yarn
```
yatn add @fullkekw/fkw-menu
```

Licensed under MIT <br>
fullkekw © 2023 - 2025