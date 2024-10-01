import '../styles/menu.scss';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { IMenuContentProps, IMenuContextProps, IMenuProps, IMenuSettings, IMenuTriggerProps, IMenuWrapperProps, TMenuAlign, TMenuDirection } from "../interfaces/Menu";
import { createID } from "./handlers";
import cn from 'classnames';

// @ts-ignore
export const MenuContext = createContext<IMenuContextProps>();


/** Menu container */
export const Menu: React.FC<IMenuProps> = ({ className, children, settings: sets, gap }) => {
  const [ID, setID] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const settings = (sets === undefined ? {} : sets) as Required<IMenuSettings>;
  settings.align = settings.align === undefined ? 'center' : settings.align;
  settings.direction = settings.direction === undefined ? 'bottom' : settings.direction;
  settings.verbose = settings.verbose === undefined ? false : settings.verbose;
  settings.animation = settings.animation === undefined ? 'fade' : settings.animation;
  gap = gap == undefined ? 16 : gap;



  // Create ID
  useMemo(() => {
    setID(createID());
  }, []);

  useEffect(() => {
    const parent = document.querySelector(`#fkw-menu--${ID}`) as HTMLDivElement | undefined;
    if (!parent) return console.error(`[fkw-menu]: Parent is not found`);

    const wrapper = parent.querySelector(`.fkw-menu_wrapper`) as HTMLDivElement | undefined;
    const trigger = parent.querySelector(`.fkw-menu_trigger--primary`) as HTMLButtonElement | undefined;
    if (!wrapper || !trigger) return console.error(`[fkw-menu]: Menu wrapper or trigger are not found`);

    const { align, direction } = settings;

    let initialWrapperWidth = wrapper.offsetWidth;

    window.addEventListener('resize', () => {
      calculateDirection(direction, gap, wrapper, trigger);
      calculateAlignment({ align, direction, initialWrapperWidth, wrapper, trigger, parent });
    });

    calculateDirection(direction, gap, wrapper, trigger);
    calculateAlignment({ align, direction, initialWrapperWidth, wrapper, trigger, parent });

  }, []);

  // Handle state
  useEffect(() => {
    const parent = document.querySelector(`#${ID}`);

    if (!parent) return console.error(`[fkw-menu]: Parent is not found`);

    const wrapper = parent.querySelector(`.fkw-menu_wrapper`) as HTMLDivElement;
    const triggers = parent.querySelectorAll(`.fkw-menu_trigger`) as NodeListOf<HTMLButtonElement>;

    if (!wrapper || !triggers.length) return console.error(`[fkw-menu]: Menu wrapper or triggers are not found`);

    // const {align, direction} = settings;

    console.log(isOpen);

    handleAnimation(isOpen);

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

  function calculateAlignment({ align, direction, initialWrapperWidth, trigger, wrapper, parent }: { align: TMenuAlign, direction: TMenuDirection, initialWrapperWidth: number, wrapper: HTMLDivElement, trigger: HTMLButtonElement, parent: HTMLDivElement }) {
    switch (align) {
      case 'center': {
        if (direction === 'left' || direction === 'right') {
          wrapper.style.top = `-${(wrapper.offsetHeight / 2) - (trigger.offsetHeight / 2)}px`;

          break;
        }

        // Stretch menu if it's original width larger than current parent width
        if (parent.offsetWidth < initialWrapperWidth) {
          wrapper.style.left = `0`;
          wrapper.style.width = '100%';

          break;
        } else {
          wrapper.style.width = `${initialWrapperWidth}px`;
        }


        // Check if element can not offset without overflowing viewport
        if ((trigger.offsetWidth / 2) - (initialWrapperWidth / 2) < 0) {
          wrapper.style.left = `0`;

          break;
        }

        wrapper.style.left = `${(trigger.offsetWidth / 2) - (initialWrapperWidth / 2)}px`;

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
          // Stretch menu if it's original width larger than current parent width
          if (parent.offsetWidth < initialWrapperWidth) {
            wrapper.style.left = `0`;
            wrapper.style.width = '100%';

            break;
          } else {
            wrapper.style.left = `0`;
            wrapper.style.width = `${initialWrapperWidth}px`;
          }

        }

        break;
      }

      case 'right': {
        if (direction === 'left' || direction === 'right') {
          // Align by bottom side of trigger
          wrapper.style.bottom = '0';
        } else {
          // Stretch menu if it's original width larger than current parent width
          if (parent.offsetWidth < initialWrapperWidth) {
            wrapper.style.right = `0`;
            wrapper.style.width = '100%';

            break;
          } else {
            wrapper.style.right = `0`;
            wrapper.style.width = `${initialWrapperWidth}px`;
          }

        }

        break;
      }
    }
  }

  /** Animation handler */
  function handleAnimation(isOpen: boolean) {
    const parent = document.querySelector(`#fkw-menu--${ID}`);

    // Pass if parent is undefined
    if (!parent) return;

    const trigger = parent.querySelector('.fkw-menu_trigger') as HTMLButtonElement | undefined;
    const wrapper = parent.querySelector('.fkw-menu_wrapper') as HTMLDivElement | undefined;

    if (!trigger || !wrapper) return console.warn(`[fkw-menu]: Wrapper or menu are not found`);

    if (settings.animation === 'fade') {
      return;
    } else if (settings.animation === 'slide') {
      switch (settings.direction) {
        case 'bottom': {
          wrapper.style.transform = `translateY(${isOpen ? '0px' : `-${gap}px`})`;

          break;
        }

        case 'top': {
          wrapper.style.transform = `translateY(${isOpen ? '0px' : `${gap}px`})`;

          break;
        }

        case 'left': {
          wrapper.style.transform = `translateX(${isOpen ? '0px' : `${gap}px`})`;

          break;
        }

        case 'right': {
          wrapper.style.transform = `translateX(${isOpen ? '0px' : `-${gap}px`})`;

          break;
        }
      }
    }
  }



  return (
    <MenuContext.Provider value={{
      isOpen,
      toggleMenu
    }}>
      <div className={cn(`fkw-menu`, settings.verbose && 'fkw-menu--verbose', isOpen && 'fkw-menu--active', className)} id={`fkw-menu--${ID}`}>
        {children}
      </div>
    </MenuContext.Provider>
  );
};

/** Menu trigger */
export const MenuTrigger: React.FC<IMenuTriggerProps> = ({ className, children, callback, primary }) => {
  const { toggleMenu, isOpen } = useContext(MenuContext);

  return (
    <button className={cn(`fkw-menu_trigger`, primary && 'fkw-menu_trigger--primary', isOpen && 'fkw-menu_trigger--active', className)} tabIndex={0} onClick={() => { toggleMenu(); callback ? callback() : null; }}>
      {children}
    </button>
  );
};

/** Menu content wrapper */
export const MenuWrapper: React.FC<IMenuWrapperProps> = ({ className, children }) => {
  const { isOpen } = useContext(MenuContext);

  return (
    <div className={cn(`fkw-menu_wrapper`, isOpen && 'fkw-menu_wrapper--active', className)}>
      {children}
    </div>
  );
};