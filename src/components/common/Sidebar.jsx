import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Sun, Moon, Settings, Eye } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useRole } from '../../context/RoleContext';
import { ROLES } from '../../constants/constants';
import './Sidebar.css';

const NAV_ITEMS = [
  { path: '/',             label: 'Dashboard',    icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight  },
  { path: '/insights',     label: 'Insights',     icon: Lightbulb       },
];

export default function Sidebar({ mobileOpen, onClose }) {
  const { theme, toggleTheme } = useTheme();
  const { role, setRole } = useRole();
  const isAdmin = role === ROLES.ADMIN;

  return (
    <>
      {mobileOpen && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>

        {/* Logo */}
        <div className="sidebar__logo">
          <div className="sidebar__logo-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="2" width="7" height="7" rx="2" fill="#fff" opacity="0.9"/>
              <rect x="11" y="2" width="7" height="7" rx="2" fill="#fff" opacity="0.5"/>
              <rect x="2" y="11" width="7" height="7" rx="2" fill="#fff" opacity="0.5"/>
              <rect x="11" y="11" width="7" height="7" rx="2" fill="#fff" opacity="0.25"/>
            </svg>
          </div>
          <span className="sidebar__logo-text">Fintrack</span>
        </div>

        {/* Nav */}
        <nav className="sidebar__nav">
          <div className="sidebar__nav-label">Menu</div>
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar__link-icon"><Icon size={17} /></span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer controls */}
        <div className="sidebar__footer">

          {/* Role */}
          <div>
            <div className="sidebar__section-label">Role</div>
            <div className="role-toggle">
              <button
                className={`role-toggle__btn ${role === ROLES.ADMIN ? 'role-toggle__btn--active' : ''}`}
                onClick={() => setRole(ROLES.ADMIN)}
              >Admin</button>
              <button
                className={`role-toggle__btn ${role === ROLES.VIEWER ? 'role-toggle__btn--active' : ''}`}
                onClick={() => setRole(ROLES.VIEWER)}
              >Viewer</button>
            </div>
          </div>

          {/* Theme */}
          <div className="theme-toggle-wrap">
            <div className="sidebar__section-label">Theme</div>
            <button className="theme-toggle" onClick={toggleTheme}>
              <span className={`theme-toggle__opt ${theme === 'light' ? 'theme-toggle__opt--active' : ''}`}>
                <Sun size={13} /> Light
              </span>
              <span className={`theme-toggle__opt ${theme === 'dark' ? 'theme-toggle__opt--active' : ''}`}>
                <Moon size={13} /> Dark
              </span>
            </button>
          </div>

          {/* User */}
          <div className="sidebar__user">
            <div className="sidebar__avatar">
              {isAdmin ? <Settings size={16} /> : <Eye size={16} />}
            </div>
            <div>
              <div className="sidebar__user-name">{isAdmin ? 'Admin User' : 'Viewer'}</div>
              <div className="sidebar__user-role">{role} access</div>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
}