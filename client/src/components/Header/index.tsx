import React from 'react'
import "./Header.scss"
import CarbonLogout from '../../assets/Icons/CarbonLogout';
import Cookies from "universal-cookie";
import { UserContext } from '../../App';
const cookies = new Cookies();

const Header = () => {
  const disconnectUser = () => {
    cookies.remove("TOKEN")
    window.location.href = "/login"
  }
  const value = React.useContext(UserContext);

  return (
    <div className='Header'>
      <div className='header-wrapper container'>
        <div>
          <h3>Bienvenue {value.name}</h3>
        </div>
        <div className='menu-right'>
          <div className='btn-disconnect' onClick={() => disconnectUser()}>
            <CarbonLogout height={16} width={16} />
            Se déconnecter
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;