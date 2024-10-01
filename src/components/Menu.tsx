import '../styles/menu.scss';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { IMenuContentProps, IMenuContextProps, IMenuProps, IMenuSettings, IMenuTriggerProps, IMenuWrapperProps, TMenuAlign, TMenuDirection } from "../interfaces/Menu";
import { createID } from "./handlers";

// @ts-ignore
export const MenuContext = createContext<IMenuContextProps>();


/** Menu container */
export const Menu: React.FC<IMenuProps> = ({ className, children, settings: sets, gap }) => {
  const [ID, setID] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const settings = (sets === undefined ? {} : sets) as Required<IMenuSettings>;
  settings.align = settings.align === undefined ? 'center' : settings.align;
  settings.direction = settings.direction === undefined ? 'bottom' : settings.direction;
  gap = gap == undefined ? 16 : gap;



  // Create ID
  useMemo(() => {
    setID(createID());
  }, []);

  useEffect(() => {
    const parent = document.querySelector(`#fkw-menu--${ID}`);
    if (!parent) return console.error(`[fkw-menu]: Parent is not found`);

    const wrapper = parent.querySelector(`.fkw-menu_wrapper`) as HTMLDivElement;
    const trigger = parent.querySelector(`.fkw-menu_trigger--primary`) as HTMLButtonElement;
    if (!wrapper || !trigger) return console.error(`[fkw-menu]: Menu wrapper or trigger are not found`);

    const { align, direction } = settings;

    window.addEventListener('resize', () => {
      calculateDirection(direction, gap, wrapper, trigger);
      calculateAlignment(align, direction, wrapper, trigger);
    });

    calculateDirection(direction, gap, wrapper, trigger);
    calculateAlignment(align, direction, wrapper, trigger);

  }, [])

  // Handle state
  useEffect(() => {
    // const parent = document.querySelector(`#${ID}`);

    // if (!parent) return console.error(`[fkw-menu]: Parent is not found`);

    // const wrapper = parent.querySelector(`.fkw-menu_wrapper`) as HTMLDivElement;
    // const triggers = parent.querySelectorAll(`.fkw-menu_trigger`) as NodeListOf<HTMLButtonElement>;

    // if (!wrapper || !triggers.length) return console.error(`[fkw-menu]: Menu wrapper or triggers are not found`);

    // const {align, direction} = settings;

    console.log(isOpen);

    if (isOpen) {

    } else {

    }
  }, [isOpen]);



  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function calculateDirection(direction: TMenuDirection, gap: number, wrapper: HTMLDivElement, trigger: HTMLButtonElement) {
    switch (direction) {
      case 'bottom': {
        wrapper.style.top = `${trigger.offsetHeight + gap}px`;

        break;
      }

      case 'top': {
        wrapper.style.bottom = `${trigger.offsetHeight + gap}px`;

        break;
      }

      case 'left': {
        wrapper.style.left = `${trigger.offsetWidth + gap}px`;

        break;
      }

      case 'right': {
        wrapper.style.right = `${trigger.offsetWidth + gap}px`;

        break;
      }
    }
  }

  function calculateAlignment(align: TMenuAlign, direction: TMenuDirection, wrapper: HTMLDivElement, trigger: HTMLButtonElement) {
    switch (align) {
      case 'center': {
        if (direction === 'left' || direction === 'right') {
          wrapper.style.top = `-${(wrapper.offsetHeight / 2) - (trigger.offsetHeight / 2)}px`;
        } else {
          wrapper.style.left = `${(trigger.offsetWidth / 2) - (wrapper.offsetWidth / 2)}px`;
        }

        break;
      }

      case 'stretch': {
        if (direction === 'left' || direction === 'right') {
          console.warn(`[fkw-menu]: Align ${align} does not work with ${direction} direction`);
        } else {
          wrapper.style.width = '100%';
        }

        break;
      }

      case 'left': {
        if (direction === 'left' || direction === 'right') {
          // Align by top side of trigger
          wrapper.style.top = '0';
        } else {
          wrapper.style.left = '0';
        }

        break;
      }

      case 'right': {
        if (direction === 'left' || direction === 'right') {
          // Align by bottom side of trigger
          wrapper.style.bottom = '0';
        } else {
          wrapper.style.right = '0';
        }

        break;
      }
    }
  }

  return (
    <MenuContext.Provider value={{
      isOpen,
      toggleMenu
    }}>
      <div className={`fkw-menu ${isOpen ? 'fkw-menu--active' : ''} ${className ? className : ''}`} id={`fkw-menu--${ID}`}>
        {children}
      </div>
    </MenuContext.Provider>
  );
};

/** Menu trigger */
export const MenuTrigger: React.FC<IMenuTriggerProps> = ({ className, children, callback, primary }) => {
  const { toggleMenu, isOpen } = useContext(MenuContext);

  return (
    <button className={`fkw-menu_trigger ${primary ? 'fkw-menu_trigger--primary' : ''} ${isOpen ? 'fkw-menu_trigger--active' : ''} ${className ? className : ''}`} tabIndex={0} onClick={() => { toggleMenu(); callback ? callback() : null; }}>
      {children}
    </button>
  );
};

/** Menu content wrapper */
export const MenuWrapper: React.FC<IMenuWrapperProps> = ({ className, children }) => {
  const { isOpen } = useContext(MenuContext);

  return (
    <div className={`fkw-menu_wrapper ${isOpen ? 'fkw-menu_wrapper--active' : ''} ${className ? className : ''}`}>
      {children}
    </div>
  );
};

/** Menu content */
export const MenuContent: React.FC<IMenuContentProps> = ({ className, children }) => {
  return (
    <div className='fkw-menu_content'>
      {children}
    </div>
  );
};