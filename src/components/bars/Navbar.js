import "./Navbar.css";
import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";

import { useAuthentication } from "../../hooks/useAuthentication";

import { useAuthValue } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const navigate = useNavigate();

  const goToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const getOut = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <abbr title="menu">
              <FaIcons.FaBars onClick={showSidebar} />
            </abbr>
          </Link>
          {!user ? (
            <button className="navbar-button" onClick={goToLogin}>
              Entrar
            </button>
          ) : (
            <button className="navbar-button" onClick={getOut}>
              Sair
            </button>
          )}
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
