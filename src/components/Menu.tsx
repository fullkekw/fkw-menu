import '../styles/menu.scss';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { IMenuContextProps, IMenuProps, IMenuSettings, IMenuTriggerProps, IMenuWrapperProps, TMenuAlign, TMenuDirection } from "../interfaces/Menu";
import { createID } from "./handlers";
import cn from 'classnames';

// @ts-ignore
export const MenuContext = createContext<IMenuContextProps>();


/** Menu container */
export const Menu: React.FC<IMenuProps> = ({ className, children, settings: sets, gap, disabled, state, stateSetter }) => {
  const [ID, setID] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const settings = (sets !== undefined ? sets : {}) as Required<IMenuSettings>;

  settings.align = settings.align !== undefined ? settings.align : 'center';
  settings.direction = settings.direction !== undefined ? settings.direction : 'bottom';
  settings.styles = settings.styles !== undefined ? settings.styles : 'none';
  settings.animation = settings.animation !== undefined ? settings.animation : 'fade';
  settings.closeOn = settings.closeOn !== undefined ? settings.closeOn : 'outMenu';

  gap = gap !== undefined ? gap : 16;



  // Create ID
  useMemo(() => {
    setID(createID());
  }, []);

  useEffect(() => {
    const parent = document.querySelector(`#fkw-menu--${ID}`) as HTMLDivElement | undefined;
    if (!parent) return console.error(`[fkw-menu]: Parent is not found`);

    const wrapper = parent.querySelector(`.fkw-menu_wrapper`) as HTMLDivElement | undefined;
    const trigger = parent.querySelector(`.fkw-menu_trigger--primary`) as HTMLButtonElement | undefined;
    if (!wrapper || !trigger) return console.error(`[fkw-menu]: Menu wrapper or primary trigger are not found`);

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
    const parent = document.querySelector(`#fkw-menu--${ID}`);

    if (!parent) return console.error(`[fkw-menu]: Parent is not found`);

    const wrapper = parent.querySelector(`.fkw-menu_wrapper`) as HTMLDivElement;
    const triggers = parent.querySelectorAll(`.fkw-menu_trigger`) as NodeListOf<HTMLButtonElement>;

    if (!wrapper || !triggers.length) return console.error(`[fkw-menu]: Menu wrapper or triggers are not found`);

    const { animation, direction } = settings;

    // Handle animation
    if (animation === 'fade') {
      return;
    } else if (animation === 'slide') {
      switch (direction) {
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

    // Handle click
    function handleClick(e: MouseEvent) {
      const self = e.target as HTMLElement | null;
      if (!self) return toggleMenu();

      // Close when clicked out of menu
      const parent = self.closest(`#fkw-menu--${ID}`);
      if (!parent) return toggleMenu();

      // Close when clicked inside menu
      if (settings.closeOn === 'both' && !self.classList.contains('fkw-menu_trigger')) return toggleMenu();
    }

    if (isOpen) window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  // Sync outer state
  useEffect(() => {
    if (stateSetter && state === undefined) stateSetter(isOpen);
  }, [isOpen]);

  // Sync inner state
  useEffect(() => {
    if (stateSetter && state !== undefined) setIsOpen(state === isOpen ? !state : state);
  }, [state]);



  function toggleMenu() {
    if (!disabled) setIsOpen(!isOpen);
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



  return (
    <MenuContext.Provider value={{
      isOpen,
      toggleMenu
    }}>
      <div className={cn(`fkw-menu`, settings.styles === 'verbose' && 'fkw-menu--verbose', settings.styles === 'pretty' && 'fkw-menu--pretty', isOpen && 'fkw-menu--active', className)} id={`fkw-menu--${ID}`}>
        {children}
      </div>
    </MenuContext.Provider>
  );
};

/** Menu trigger */
export const MenuTrigger: React.FC<IMenuTriggerProps> = ({ className, children, callback, primary, disabled }) => {
  const { toggleMenu, isOpen } = useContext(MenuContext);

  return (
    <button className={cn(`fkw-menu_trigger`, primary && 'fkw-menu_trigger--primary', isOpen && 'fkw-menu_trigger--active', className)} tabIndex={0} onClick={() => { toggleMenu(); callback ? callback() : null; }} disabled={Boolean(disabled)}>
      {children}
    </button>
  );
};

/** Menu content wrapper */
export const MenuWrapper: React.FC<IMenuWrapperProps> = ({ className, children }) => {
  const { isOpen } = useContext(MenuContext);

  return (
    <div className={cn(`fkw-menu_wrapper`, isOpen && 'fkw-menu_wrapper--active', className)} aria-hidden={!isOpen} role='menu'>
      {children}
    </div>
  );
};