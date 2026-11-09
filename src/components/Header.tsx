
import { useEffect, useState } from "react";
import "../styles/Header.css";

type HeaderProps = {
  onNavigate: (view: "home" | "work" | "contact") => void;
};

export default function Header({ onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const navigateTo = (view: "home" | "work" | "contact") => {
    onNavigate(view);
    setOpen(false);
  };

  return (
    <header
      className={`brina-header brina-header--glass ${
        scrolled ? "brina-header--scrolled" : ""
      } ${open ? "brina-header--open" : ""}`}
    >
      <nav className="brina-header__nav" aria-label="Main navigation">
        <button
          type="button"
          className="brina-header__brand"
          aria-label="Brina home"
          onClick={() => navigateTo("home")}
        >
          <img
            src="/Brina.png"
            alt="Brina"
            className="brina-header__logo"
          />
          <span>Brina</span>
        </button>

        <div className="brina-header__desktop-links">
          <button
            type="button"
            className="brina-header__link"
            onClick={() => navigateTo("home")}
          >
            Home
          </button>

          <button
            type="button"
            className="brina-header__link"
            onClick={() => navigateTo("work")}
          >
            Work
          </button>

          <button
            type="button"
            className="brina-header__cta"
            onClick={() => navigateTo("contact")}
          >
            Let's build <span aria-hidden="true">↗</span>
          </button>
        </div>

        <button
          type="button"
          className={`brina-header__toggle ${
            open ? "brina-header__toggle--open" : ""
          }`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="brina-mobile-menu"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div
        id="brina-mobile-menu"
        className={`brina-header__mobile-menu ${
          open ? "brina-header__mobile-menu--open" : ""
        }`}
        aria-hidden={!open}
      >
        <button onClick={() => navigateTo("home")}>Home</button>
        <button onClick={() => navigateTo("work")}>Work</button>
        <button onClick={() => navigateTo("contact")}>
          Let's build ↗
        </button>
      </div>
    </header>
  );
}
