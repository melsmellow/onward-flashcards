import React, { FC } from "react";
import { HeaderLeftItem } from "./header-item";
import { ModeToggle } from "../toggleTheme";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <div className="shadow-bottom dark:shadow-bottom-dark p-2 flex justify-between items-center">
      <div>Logo</div>
      <div>
        <HeaderLeftItem />
      </div>
      <ModeToggle />
    </div>
  );
};

export default Header;
