import React, { useEffect, useState } from "react";
import { Menu, MenuTrigger, MenuWrapper, IMenuSettings } from "../index";

const Home: React.FC = () => {
  const [state, setState] = useState(true);

  // useEffect(() => console.log(state), [state]);

  return (
    <div className="Home w-screen h-full min-h-screen bg-slate-500 p-[50px]">
      <button onClick={() => setState(prev => !prev)}>fsdfsdf</button>

      <Menu settings={{ direction: 'left', align: 'start', animation: 'slide', verbose: true, closeOn: 'both' }} state={state} stateSetter={setState}>
        <MenuTrigger className="px-[24px]" anchor>Trigger</MenuTrigger>
        {/* <MenuTrigger className="w-full px-[24px]">Trigger</MenuTrigger> */}

        <MenuWrapper className=" flex flex-col">
          {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis ducimus maxime cumque deserunt tempora dolorem accusamus laudantium ipsum quod distinctio.</p> */}
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
        </MenuWrapper>
      </Menu>

      {/* <Menu settings={{ verbose: true, align: 'right' }}>
        <MenuTrigger anchor>Trigger</MenuTrigger>

        <MenuWrapper>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
        </MenuWrapper>
      </Menu> */}
    </div>
  );
};

export default Home;