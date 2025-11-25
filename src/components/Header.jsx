import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Recycle, Menu, X, ChevronDown } from 'lucide-react';
import { riversData } from '../data/rivers-data';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const riverLinks = Object.keys(riversData).map(key => ({
    id: key,
    name: riversData[key].name
  }));

  return (
    <header className="sticky top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-border-color">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center text-2xl font-bold text-text-dark">
            <Recycle className="text-primary mr-2" />
            <span>ReFlow.AI</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-8">
            <li><a href="/#how-it-works" className="nav-link">How It Works</a></li>
            <li className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
              <button className="nav-link flex items-center">
                Rivers <ChevronDown size={16} className={`ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <ul className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                  {riverLinks.map(river => (
                    <li key={river.id}><NavLink to={`/rivers/${river.id}`} className="dropdown-link">{river.name}</NavLink></li>
                  ))}
                </ul>
              )}
            </li>
            <li><NavLink to="/integration" className="nav-link">Our Project</NavLink></li>
            <li><NavLink to="/complaint" className="nav-link">Raise Complaint</NavLink></li>
            <li><a href="/#team" className="nav-link">Team</a></li>
          </ul>

          <div className="hidden lg:flex items-center">
            <Link to="/join-team" className="btn-primary">Join Team</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-text-dark">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white shadow-md">
          <ul className="flex flex-col items-center p-4 space-y-4">
            <li><a href="/#how-it-works" className="nav-link-mobile">How It Works</a></li>
            <li className="w-full text-center">
                <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="nav-link-mobile flex items-center justify-center w-full">
                    Rivers <ChevronDown size={16} className={`ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                    <ul className="bg-gray-50 rounded-lg mt-2 py-2">
                         {riverLinks.map(river => (
                            <li key={river.id}><NavLink to={`/rivers/${river.id}`} className="dropdown-link">{river.name}</NavLink></li>
                        ))}
                    </ul>
                )}
            </li>
            <li><NavLink to="/integration" className="nav-link-mobile">Our Project</NavLink></li>
            <li><NavLink to="/complaint" className="nav-link-mobile">Raise Complaint</NavLink></li>
            <li><a href="/#team" className="nav-link-mobile">Team</a></li>
            <li className="pt-4"><Link to="/join-team" className="btn-primary w-full">Join Team</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

// Add some base styles in a utility file or here for simplicity
const styles = `
.nav-link {
    @apply font-medium text-text-light hover:text-primary transition-colors;
}
.nav-link-mobile {
    @apply font-semibold text-lg text-text-dark hover:text-primary transition-colors w-full block py-2;
}
.dropdown-link {
    @apply block w-full text-left px-4 py-2 text-text-light hover:bg-background-grey hover:text-primary;
}
.btn-primary {
    @apply inline-block bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-primary-hover transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


export default Header;
