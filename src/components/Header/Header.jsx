import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion as m, AnimatePresence } from "framer-motion";
import Logo from "../../assets/VMh-vertical.svg";
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show header when scrolling up or at top
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 250);
      setIsScrolled(currentScrollY > 250);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleMouseEnter = (dropdown) => setActiveDropdown(dropdown);
  const handleMouseLeave = () => setActiveDropdown(null);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") handleMenuToggle();
  };
  const isActive = (path) => location.pathname === path;

  const handleSupportClick = () => {
    setIsButtonClicked(true);
    setTimeout(() => setIsButtonClicked(false), 300); // Reset after animation
  };

  const isEventActive = () => {
    return (
      isActive("/events/gallamiddag-2025") ||
      isActive("/events/torveevent-2025")
    );
  };

  const isProjectActive = () => {
    const projectPaths = [
      "/projekter",
      "/projekter/projekt-2025",
      "/projekter/projekt-2023",
      "/projekter/projekt-2022",
      "/projekter/projekt-2019",
      "/projekter/projekt-2018",
      "/projekter/projekt-2017",
    ];
    return projectPaths.some((path) => isActive(path));
  };

  const isAboutActive = () => isActive("/om-os") || isActive("/kontakt");

  const activeIndicatorProps = {
    className: styles['active-indicator'],
    initial: { scaleY: 0 },
    animate: { scaleY: 1 },
    exit: { scaleY: 0 },
    transition: { duration: 0.25 },
  };

  const renderActiveIndicator = (isActiveCondition) =>
    isActiveCondition &&
    window.innerWidth > 768 && <m.div {...activeIndicatorProps} />;

  const renderNavLink = (
    to,
    label,
    isActiveCondition,
    children,
    showIndicator = true
  ) => (
    <Link
      to={to}
      tabIndex={0}
      aria-label={label}
      className={styles['nav-link']}
      style={{ color: isActiveCondition ? "#E0A619" : "" }}
    >
      {children}
      <AnimatePresence>
        {showIndicator && renderActiveIndicator(isActiveCondition)}
      </AnimatePresence>
    </Link>
  );

  const renderDropdownItem = (to, text) => (
    <li key={to}>{renderNavLink(to, text, isActive(to), text, false)}</li>
  );

  const handleMobileMenuClick = () => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false);
      setActiveDropdown(null);
    }
  };

  return (
    <header 
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out'
      }}
    >
      <div className={styles['header-content']}>
        {renderNavLink(
          "/",
          "Go to homepage",
          isActive("/"),
          <img 
            src={Logo} 
            alt="Vejle mod hudcancer"
            className={styles['logo-image']}
          />
        )}

        <button
          className={styles['menu-toggle']}
          onClick={handleMenuToggle}
          onKeyDown={handleKeyDown}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          tabIndex={0}
        >
          <span className={styles['menu-icon']}></span>
        </button>

        <nav 
          className={`${styles.nav} ${isMenuOpen ? styles['nav-open'] : ''}`}
          onClick={handleMobileMenuClick}
        >
          <ul className={styles['nav-list']}>
            <li
              className={styles.dropdown}
              onMouseEnter={() => handleMouseEnter("events")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                aria-expanded={activeDropdown === "events"}
                className={`${styles['dropdown-toggle']} ${styles['nav-link']}`}
                tabIndex={0}
                style={{ color: isEventActive() ? "#E0A619" : "" }}
              >
                Events
                <AnimatePresence>
                  {renderActiveIndicator(isEventActive())}
                </AnimatePresence>
              </button>
              {activeDropdown === "events" && (
                <ul className={styles['dropdown-menu']}>
                  {renderDropdownItem(
                    "/events/gallamiddag-2025",
                    "Gallamiddag 2025"
                  )}
                  {renderDropdownItem(
                    "/events/torveevent-2025",
                    "Torveevent 2025"
                  )}
                </ul>
              )}
            </li>

            <li
              className={styles.dropdown}
              onMouseEnter={() => handleMouseEnter("projects")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/projekter"
                aria-expanded={activeDropdown === "projects"}
                className={`${styles['dropdown-toggle']} ${styles['nav-link']}`}
                tabIndex={0}
                style={{ color: isProjectActive() ? "#E0A619" : "" }}
              >
                Projekter
                <AnimatePresence>
                  {renderActiveIndicator(isProjectActive())}
                </AnimatePresence>
              </Link>
              {activeDropdown === "projects" && (
                <ul className={styles['dropdown-menu']}>
                  {[2025, 2023, 2022, 2019, 2018, 2017].map((year) =>
                    renderDropdownItem(
                      `/projekter/projekt-${year}`,
                      `Projekt ${year}`
                    )
                  )}
                </ul>
              )}
            </li>

            <li>
              {renderNavLink(
                "/sponsorer",
                "Go to sponsors",
                isActive("/sponsorer"),
                "Sponsorer"
              )}
            </li>

            <li>
              {renderNavLink(
                "/om-hudcancer",
                "Learn about skin cancer",
                isActive("/om-hudcancer"),
                "Hvad er hudcancer"
              )}
            </li>

            <li
              className={styles.dropdown}
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/om-os"
                aria-expanded={activeDropdown === "about"}
                className={`${styles['dropdown-toggle']} ${styles['nav-link']}`}
                tabIndex={0}
                style={{ color: isAboutActive() ? "#E0A619" : "" }}
              >
                Hvem er vi
                <AnimatePresence>
                  {renderActiveIndicator(isAboutActive())}
                </AnimatePresence>
              </Link>
              {activeDropdown === "about" && (
                <ul className={styles['dropdown-menu']}>
                  {renderDropdownItem("/kontakt", "Kontakt")}
                </ul>
              )}
            </li>

            <li>
              {renderNavLink(
                "/galleri",
                "View gallery",
                isActive("/galleri"),
                "Galleri"
              )}
            </li>
          </ul>
        </nav>
        <m.div
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <Link 
            to="/stoet-nu" 
            className={`${styles['support-button']} ${isButtonClicked ? styles['button-clicked'] : ''}`}
            onClick={handleSupportClick}
          >
            Støt nu
          </Link>
        </m.div>
      </div>
    </header>
  );
};

export default Header;
