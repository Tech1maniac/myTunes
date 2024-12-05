import React, { useState, useEffect } from 'react';
import './Sidebar.css';  // Import the CSS

const Sidebar = ({
  token,
  setShowLikedModal,
  setShowPlaylistsModal,
  fetchPlaylists,
  logout,
  authenticateSpotify,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  // Toggle the collapsed state for sidebar
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Toggle the menu active state
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  useEffect(() => {
    // Handle window resize for responsiveness
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCollapsed(false); // Ensure the sidebar is fully expanded on larger screens
      } else {
        setMenuActive(false); // Reset menu toggle on smaller screens
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // html start


  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Sidebar header */}
      <header className="sidebar-header">
        <a href="#" className="header-logo">
          <img id="icon" src="/logo.jpg" alt="" />
        </a>
        <button className="toggler sidebar-toggler" onClick={toggleSidebar}>
          <span className="material-symbols-rounded">
            {collapsed ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>
        <button className="toggler menu-toggler" onClick={toggleMenu}>
          <span className="material-symbols-rounded">{menuActive ? 'close' : 'menu'}</span>
        </button>
      </header>

      <nav className="sidebar-nav">
        {/* Primary top nav */}
        <ul className="nav-list primary-nav">
          <li className="nav-item">
            <a href="http://localhost:3000/" className="nav-link">
              <span className="nav-icon material-symbols-rounded">home</span>
              <span className="nav-label">Home</span>
            </a>
          </li>
          {/* <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-icon material-symbols-outlined">favorite</span>
              <span className="nav-label">Liked song</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-icon material-symbols-rounded">playlist_add</span>
              <span className="nav-label">Playlist</span>
            </a>
          </li> */}
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={() => setShowLikedModal(true)}>
              <span className="nav-icon material-symbols-outlined">favorite</span>
              <span className="nav-label">Liked Songs</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={() => { setShowPlaylistsModal(true); fetchPlaylists(); }}>
              <span className="nav-icon material-symbols-rounded">playlist_add</span>
              <span className="nav-label">Playlists</span>
            </a>
          </li>

          {/* <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-icon material-symbols-rounded">group</span>
              <span className="nav-label">Team</span>
            </a>
          </li> */}

          <li className="nav-item">
            <a href="http://localhost:3000/profile" className="nav-link">
              <span className="nav-icon material-symbols-rounded">account_circle</span>
              <span className="nav-label">Profile</span>
            </a>
          </li>
          {/* <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-icon material-symbols-rounded" >logout</span>
              <span className="nav-label">Logout</span>
            </a>
          </li> */}
          <li className="nav-item">
            {token ? (
              <a href="#" className="nav-link" onClick={logout}>
                <span className="nav-icon material-symbols-rounded">logout</span>
                <span className="nav-label">Logout</span>
              </a>
            ) : (
              <a href="#" className="nav-link" onClick={authenticateSpotify}>
                <span className="nav-icon material-symbols-rounded">login</span>
                <span className="nav-label">Login</span>
              </a>
            )}
          </li>



        </ul>

        {/* Secondary bottom nav */}
        {/* <ul className="nav-list secondary-nav">
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-icon material-symbols-rounded">account_circle</span>
              <span className="nav-label">Profile</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-icon material-symbols-rounded">logout</span>
              <span className="nav-label">Logout</span>
            </a>
          </li>
        </ul> */}
      </nav>
    </aside>
  );
};

export default Sidebar;
