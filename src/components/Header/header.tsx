import React from 'react';
import AlbacrossLogo from './logo-color.png';
import myCss from './header.module.css';

export const Header = (): JSX.Element => (
  <div className={myCss.header}>
    <img src={AlbacrossLogo} alt="Albacross" height="80%" />
  </div>
);
