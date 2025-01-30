import React, { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <div className="shadow-top dark:shadow-top-dark p-2 flex justify-between items-center h-[10vh]">
      Footer
    </div>
  );
};

export default Footer;
