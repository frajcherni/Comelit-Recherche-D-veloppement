
import React, { useState, useEffect } from 'react';
import { NavLink} from 'react-router-dom';
import { logout } from '../auth/auth';
import './Nav.modules.css';
import logo from '../pages/comelit.png'
import axios from 'axios';
import CurrentUser from '../pages/CurrentUser';
import { NavDropdown } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Nav = ({ children }) => {
  const [sidebarItems, setSidebarItems] = useState([]);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const currentUser = CurrentUser({ setUser }); // pass setUser function as prop to CurrentUser component

  const showSideBar = () => {
    setShow(!show);

  };
  const location = useLocation();
  const mot = new URLSearchParams(location.search).get('mot');
 
  useEffect(() => {
    if (user) {
      // Fetch sidebar items from API based on user's role and permissions
      axios.get(`http://localhost:5000/sidebar/${user.role}`).then((response) => {
        // Filter sidebar items based on user's permissions
        const filteredItems = response.data.filter(item => item.permission === true);
        setSidebarItems(filteredItems);
      });
    }
  }, [user]);

<div onMouseLeave={() => console.log('Mouse left the element')}>
  This is a div that will trigger the onMouseLeave function when the mouse leaves it.
</div>



  const [activeDropdown, setActiveDropdown] = useState(null);
  if (user) { 
  return (
    <> 
    
    
      <header className={`header ${show ? 'add_body_padding' : ' '}`} id="admin-dash-header">
        <div className="header_toggle">
          <i className={`bx bx-menu ${show ? 'bx-x' : ' '}`} id="header-toggle" onClick={showSideBar}></i>
        </div>

        <div className="dropdown sidebar-profile">
          <span
            className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser3"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src={`http://localhost:5000/${user.Image}` } alt="avatar" className="avatar rounded-circle" />
          </span>
          <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
            <li>
              <a className="dropdown-item" href="/app/profile">
                
                          <span>{user.email}</span>

              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item" onClick={() => logout()}>
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </header>

      <aside className={`sidebar ${show ? 'review' : ' '}`} id="admin-dash-nav">
        <nav className="admin-dash-nav">
          <div>
            
             
              <img className='logo-image' src={logo} style={{width: "186px", height: "110px",marginBottom: "-30px" ,marginTop: "-20px"}} />
             
            {user.role === "Administrateur" && (
            <div className="nav_item">
  
       
      
            {sidebarItems.map((link) =>
            
    link.dropdown  ? (
    link.dropdownOptions.some((option) => option.permission && option.role === user.role  && link.iden === mot ) ? (
      <div key={link._id }>
        <a
          className={`nav_link ${activeDropdownId === link._id ? 'active' : ''}`}
          onClick={() => setActiveDropdownId(activeDropdownId === link._id ? null : link._id)}
        >
          <i className={`${link.icon} nav_icon`}></i> <span>{link.title}</span>
        </a>
        <ul
          id={`menu_item_${link._id}`}
          className={`submenu collapse ${activeDropdownId === link._id ? 'show' : ''}`}
        >
          <hr></hr>
          {link.dropdownOptions
            .filter((option) => option.permission && option.role === user.role && link.iden === mot)
            .map((option) => ( 
              <li className='aa' key={option.value}>
                <NavLink 
                  to={`${option.value}`}
                  className="dropdown-option"
                  onClick={() => setActiveDropdownId(link._id)}
                >
                  <i className={`${option.icon} mr-2 nav_icon_submenu`}></i>
                  <span className='mr-2' > &nbsp; &nbsp;{option.label}</span>
                </NavLink>
              </li>
            ))}
          <hr></hr>
        </ul>
      </div>
    ) : null
  ) : link.iden === mot ? (
    <NavLink
      key={link._id}
      exact={link.exact}
      to={link.path}
      className="nav_link"
      activeClassName="active"
    >
      <i className={`${link.icon} nav_icon`}></i> <span>{link.title}</span>
    </NavLink>
  ) : null
)}

</div>
)}

{user.role !== "Administrateur"  && (
            <div className="nav_item">
  
       
      
            {sidebarItems.map((link) =>
    link.dropdown ? (
    link.dropdownOptions.some((option) => option.permission && option.role === user.role  ) ? (
      <div key={link._id}>
        <a
          className={`nav_link ${activeDropdownId === link._id ? 'active' : ''}`}
          onClick={() => setActiveDropdownId(activeDropdownId === link._id ? null : link._id)}
        >
          <i className={`${link.icon} nav_icon`}></i> <span>{link.title}</span>
        </a>
        <ul
          id={`menu_item_${link._id}`}
          className={`submenu collapse ${activeDropdownId === link._id ? 'show' : ''}`}
        >
          <hr></hr>
          {link.dropdownOptions
            .filter((option) => option.permission && option.role === user.role )
            .map((option) => (
              <li className='aa' key={option.value}>
                <NavLink 
                  to={`${option.value}`}
                  className="dropdown-option"
                  onClick={() => setActiveDropdownId(link._id)}
                >
                  <i className={`${option.icon} mr-2 nav_icon_submenu`}></i>
                  <span className='mr-2' > &nbsp; &nbsp;{option.label}</span>
                </NavLink>
              </li>
            ))}
          <hr></hr>
        </ul>
      </div>
    ) : null
  
    ) : (
      <NavLink
        key={link._id}
        exact={link.exact}
        to={link.path}
        className="nav_link"
        activeClassName="active"
      >
        <i className={`${link.icon} nav_icon`}></i> <span>{link.title}</span>
      </NavLink>
    )
)}

</div>
)}
</div>
      
        
          <span className="nav_link" onClick={() => logout()}>
                        {" "}
                        <i className="bx bx-log-out bx-sm nav_icon"  ></i> <span className="nav_name">SignOut</span>{" "}
                    </span>
                    
                </nav>
            </aside>

                <main className={` ${show ? "add_body_padding" : "main"} `}> {children} </main> 
   
   </>
  )
} }

export default Nav