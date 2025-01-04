import './styles.scss';

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { IMenuContextProps, IMenuProps, IMenuSettings, IMenuTriggerProps, IMenuWrapperProps, TMenuAlign, TMenuDirection } from "./Interfaces";
import { createStringID, EFKW } from "../components/handlers";
import cn from 'classnames';

// @ts-ignore
export const MenuContext = createContext<IMenuContextProps>();


/** Menu container */
export const Menu: React.FC<IMenuProps> = ({ className, children, settings: sets, gap: gapRaw, disabled, state, stateSetter, id }) => {
  const settings = (sets !== undefined ? sets : {}) as Required<IMenuSettings>;

  const [isOpen, setIsOpen] = useState(false);
  const [ID] = useState(id ?? `fkw-${createStringID(6)}`);

  const parentRef = useRef<HTMLDivElement>(null);

  const gap = gapRaw ?? 16;
  settings.align = sets?.align ?? 'center';
  settings.direction = sets?.direction ?? 'bottom';
  settings.verbose = sets?.verbose ?? false;
  settings.animation = sets?.animation ?? 'fade';
  settings.closeOn = sets?.closeOn ?? 'outMenu';




  // Init
  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) throw new EFKW(`Menu ref is not found`);

    const wrapper = parent.querySelector(`.fkw-menu_wrapper`) as HTMLDivElement | undefined;
    if (!wrapper) throw new EFKW(`MenuWrapper must be present inside Menu component`);

    const triggers = parent.querySelectorAll(`.fkw-menu_trigger--anchor`) as NodeListOf<HTMLButtonElement>;
    if (!triggers.length) throw new EFKW(`Anchor (anchor={true}) MenuTrigger must be present inside Menu component`);
    if (triggers.length > 1) throw new EFKW(`Anchor (anchor={true}) MenuTrigger must be only one inside Menu component`);

    const trigger = triggers[0];
    const { align, direction } = settings;

    const calcDirs = () => calculateDirection(direction, gap, wrapper, trigger);
    const calcAlign = () => calculateAlignment({ align, direction, wrapper, trigger });

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        calcDirs();
        calcAlign();
      });
    }

    calcDirs();
    calcAlign();
  }, []);

  // Handle states
  useEffect(() => {
    const parent = parentRef.current as HTMLDivElement;
    const wrapper = parent.querySelector(`.fkw-menu_wrapper`) as HTMLDivElement;

    const { animation, direction } = settings;

    //* Handle animation
    if (animation === 'slide') {
      if (direction === 'bottom') wrapper.style.transform = `translateY(${isOpen ? '0px' : `-${gap}px`})`;
      if (direction === 'top') wrapper.style.transform = `translateY(${isOpen ? '0px' : `${gap}px`})`;
      if (direction === 'left') wrapper.style.transform = `translateX(${isOpen ? '0px' : `${gap}px`})`;
      if (direction === 'right') wrapper.style.transform = `translateX(${isOpen ? '0px' : `-${gap}px`})`;
    }



    //* Handle click
    function handleClick(e: MouseEvent) {
      const self = e.target as HTMLElement | null;
      if (!self) return toggleMenu();

      const parent = self.closest(`#${ID}`);

      // Close menu if parent not found (outside menu)
      if (settings.closeOn === 'outMenu' && !parent) toggleMenu();
      // Close menu when clicked anywhere (also if inside menu)
      if (settings.closeOn === 'both') toggleMenu();
    }



    if (isOpen && typeof window !== 'undefined') window.addEventListener('click', handleClick);

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('click', handleClick);
      }
    };
  }, [isOpen]);

  //* Sync inner state when out changed
  useEffect(() => {
    if (state === undefined) return;

    setIsOpen(state);
  }, [state]);



  function toggleMenu() {
    if (disabled) return;

    const to = !isOpen;

    if (stateSetter !== undefined && state !== undefined) {
      //* Sync only out state with inner
      stateSetter(to);
    } else if (stateSetter !== undefined && state === undefined) {
      //* Sync both states
      stateSetter(to);
      setIsOpen(to);
    } else {
      //* Sync only inner state with out
      setIsOpen(to);
    }
  }

  function calculateDirection(direction: TMenuDirection, gap: number, wrapper: HTMLDivElement, trigger: HTMLButtonElement) {
    if (direction === 'bottom') wrapper.style.top = `${trigger.offsetHeight + gap}px`;
    if (direction === 'top') wrapper.style.bottom = `${trigger.offsetHeight + gap}px`;
    if (direction === 'left') wrapper.style.left = `-${wrapper.offsetWidth + gap}px`;
    if (direction === 'right') wrapper.style.right = `-${wrapper.offsetWidth + gap}px`;
  }

  function calculateAlignment({ align, direction, trigger, wrapper }: { align: TMenuAlign, direction: TMenuDirection, wrapper: HTMLDivElement, trigger: HTMLButtonElement }) {
    const alignX = direction === 'bottom' || direction === 'top';
    const alignY = direction === 'left' || direction === 'right';

    if (alignX) {
      if (align === 'center') {
        wrapper.style.left = '50%';
        wrapper.style.transform = 'translateX(-50%)';
      }

      if (align === 'start') wrapper.style.left = '0';
      if (align === 'end') wrapper.style.right = '0';
      if (align === 'stretch') wrapper.style.width = '100%';
    }

    if (alignY) {
      if (align === 'center') wrapper.style.top = `-${(wrapper.offsetHeight / 2) - (trigger.offsetHeight / 2)}px`;
      if (align === 'start') wrapper.style.top = '0';
      if (align === 'end') wrapper.style.bottom = '0';
      if (align === 'stretch') throw new EFKW(`Align ${align} does not work with ${direction} direction`);
    }
  }



  return (
    <MenuContext.Provider value={{
      isOpen,
      parentRef,
      toggleMenu
    }}>
      <div className={cn(`fkw-menu`, settings.verbose && 'fkw-menu--verbose', isOpen && 'fkw-menu--active', className)} id={ID} ref={parentRef}>
        {children}
      </div>
    </MenuContext.Provider>
  );
};

/** Menu trigger */
export const MenuTrigger: React.FC<IMenuTriggerProps> = ({ className, children, callback, anchor, disabled }) => {
  const { toggleMenu, isOpen } = useContext(MenuContext);

  return (
    <button className={cn(`fkw-menu_trigger`, anchor && 'fkw-menu_trigger--anchor', isOpen && 'fkw-menu_trigger--active', className)} tabIndex={0} onClick={() => { toggleMenu(); callback ? callback() : null; }} disabled={Boolean(disabled)}>
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