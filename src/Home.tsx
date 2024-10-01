import React from "react";
import { Menu, MenuTrigger, MenuWrapper } from "./components/Menu";

const Home: React.FC = () => {
  return (
    <div className="Home w-screen h-full min-h-screen bg-slate-500">
      <Menu>
        <MenuTrigger>Trigger</MenuTrigger>

        <MenuWrapper>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
        </MenuWrapper>
      </Menu>

      <Menu>
        <MenuTrigger>Trigger</MenuTrigger>

        <MenuWrapper>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
        </MenuWrapper>
      </Menu>
    </div>
  );
};

export default Home;