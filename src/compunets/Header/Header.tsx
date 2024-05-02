import removeIcon from "../../assets/icon-remove.svg";
import bannerIMG from "../../assets/bg-header-desktop.svg";
import { useEffect, useState } from "react";
interface HeaderProps {
  activeTags: string[];
  removeTag: (tag: string) => void;
  clearTags: () => void;
}

function Header({ activeTags, removeTag, clearTags }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 100;

      if (scrollPosition > threshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <header>
        <div
          className="banner-image"
          style={{ backgroundImage: `url(${bannerIMG})` }}
        >
          <nav className={`menu ${isSticky ? "sticky" : ""}`}>
            <div className="centerlized">
              <div className="left-container-navbar">
                {activeTags.map((tag, index) => (
                  <div key={index} className="tag">
                    <div className="left-tag">
                      <span>{tag}</span>
                    </div>
                    <div
                      onClick={() => {
                        removeTag(tag);
                      }}
                      className="remove-btn"
                    >
                      <img alt="remove" src={removeIcon}></img>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  clearTags();
                }}
                className="clear"
              >
                clear
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
export default Header;
