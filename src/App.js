// icons 
import {ReactComponent as MessengerIcon} from './icons/messenger.svg'; 
import {ReactComponent as BellIcon} from './icons/bell.svg'; 
import {ReactComponent as PlusIcon} from './icons/plus.svg'; 
import {ReactComponent as ArrowIcon} from './icons/arrow.svg'; 
import {ReactComponent as AddPhotoIcon} from './icons/addPhoto.svg'; 
import {ReactComponent as SettingsIcon} from './icons/settings.svg'; 
import {ReactComponent as AccountIcon} from './icons/account.svg'; 
import {ReactComponent as BackIcon} from './icons/back.svg'; 
import {ReactComponent as MoreIcon} from './icons/more.svg'; 
import {ReactComponent as LoremIcon} from './icons/lorem.svg'; 
import {ReactComponent as IpsumIcon} from './icons/ipsum.svg'; 

import React, {useState} from 'react'; 
import { CSSTransition } from 'react-transition-group'; 


function App() {
  return (
    <Navbar>
      <NavItem icon={<PlusIcon />} /> 
      <NavItem icon={<BellIcon />} /> 
      <NavItem icon={<MessengerIcon />} /> 
      <NavItem icon={<ArrowIcon />}>
        <DropdownMenu />
      </NavItem>
    </Navbar>
  );
}

 
function Navbar(props) {
  return (
    <nav className="navbar">
      <h1>Simple Multi Dropdown</h1>
      <ul className="navbar-nav">
        {props.children}
      </ul>
    </nav>
  );
}


function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(null);   

  function calcHeight(e) {
    const height = e.offsetHeight;
    setMenuHeight(height);   
  }
  
  function DropdownItem(props) {
    return (
      <a href="#" className='menu-item' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className='icon-button'>{props.leftIcon}</span>
        {props.children}
        <span className='icon-right'>{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className='dropdown' style={{height: menuHeight}}>
      <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} classNames='menu-primary' onEnter={calcHeight}>
        <div className='menu'>
          <DropdownItem leftIcon={<AccountIcon />} rightIcon={<MoreIcon />} goToMenu='settings'>Profile</DropdownItem>
          <DropdownItem leftIcon={<AddPhotoIcon />}>Lorem</DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition in={activeMenu === 'settings'} unmountOnExit timeout={500} classNames='menu-secondary' onEnter={calcHeight}>
        <div className='menu'>
           <DropdownItem leftIcon={<BackIcon />} goToMenu='main' />
           <DropdownItem leftIcon={<SettingsIcon />}>Settings</DropdownItem>
           <DropdownItem leftIcon={<LoremIcon />}>Lorem</DropdownItem>
           <DropdownItem leftIcon={<IpsumIcon />}>Ipsum</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  ); 
}


function NavItem(props) {
  const [open, setOpen] = useState(false); 

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
         {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}


export default App;