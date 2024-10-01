import '../styles/menu.scss';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { MenuContextProps, MenuProps, MenuTriggerProps, MenuWrapperProps } from "../interfaces/Menu";
import { createID } from "./handlers";

// @ts-ignore
export const MenuContext = createContext<MenuContextProps>();


/** Menu container */
export const Menu: React.FC<MenuProps> = ({ className, children }) => {
  const [ID, setID] = useState('');
  const [isOpen, setIsOpen] = useState(false);



  useMemo(() => {
    setID(createID());
  }, []);

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);



  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <MenuContext.Provider value={{
      isOpen,
      toggleMenu
    }}>
      <div className={`fkw-menu ${isOpen ? 'fkw-menu--active' : ''} ${className ? className : ''}`} id={`fkw-menu--${''}`}>
        {children}
      </div>
    </MenuContext.Provider>
  );
};

/** Menu trigger */
export const MenuTrigger: React.FC<MenuTriggerProps> = ({ className, children, callback }) => {
  const { toggleMenu, isOpen } = useContext(MenuContext);

  return (
    <button className={`fkw-menu_trigger ${isOpen ? 'fkw-menu_trigger--active' : ''} ${className ? className : ''}`} tabIndex={0} onClick={() => { toggleMenu(); callback ? callback() : null; }}>
      {children}
    </button>
  );
};

/** Menu content wrapper */
export const MenuWrapper: React.FC<MenuWrapperProps> = ({ className, children }) => {
  const { isOpen } = useContext(MenuContext);

  return (
    <div className={`fkw-menu_wrapper ${isOpen ? 'fkw-menu_wrapper--active' : ''} ${className ? className : ''}`}>
      {children}
    </div>
  );
};