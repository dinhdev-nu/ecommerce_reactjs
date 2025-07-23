import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./index.module.scss";
import { FiSearch } from "react-icons/fi";
import { debounce } from "lodash";
import callApi from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState(
    () => JSON.parse(localStorage.getItem("searchHistory")) || []
  );
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchBarRef = useRef(null);
  const inputRef = useRef(null);

  // Debounce API call để tránh spam request
  const handleSearch = useCallback(
    debounce(async (term) => {
      if (!term.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        const response = await callApi.get(`/product/search?q=${term}`);
        setSuggestions(response.data.metadata || []);
      } catch {
        setSuggestions([]);
      }
    }, 700),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
    setSelectedIndex(-1);
  };

  const updateSearchHistory = (term) => {
    setSearchHistory((prev) => {
      const newHistory = [term, ...prev.filter((item) => item !== term)];
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      updateSearchHistory(searchTerm);
      setSuggestions([]);
    }
  };

  const navigate = useNavigate();
  const handleSuggestionClick = (suggestion) => {
    const term = typeof suggestion === "string" ? suggestion : suggestion.product_name;
    typeof suggestion === "object" && navigate(`/product/${suggestion._id}`);
    setSearchTerm(term);
    setSuggestions([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      handleSuggestionClick(suggestions[selectedIndex]);
    } else if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className={styles.searchBar} ref={searchBarRef}>
      <div className={styles.searchBox}>
        <FiSearch className={styles.icon} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
      </div>

      {isFocused && (
        <div className={styles.suggestionsContainer}>
          {suggestions.length > 0 ? (
            <div className={styles.suggestionSection}>
              <h3 className={styles.sectionTitle}>Suggestions</h3>
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id || `suggestion-${index}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`${styles.suggestionItem} ${index === selectedIndex ? styles.selected : ""}`}
                >
                  <img src={suggestion.product_thumb} alt={suggestion.product_name} className={styles.image} />
                  <div className={styles.content}>
                    <div className={styles.name}>{suggestion.product_name}</div>
                    <div className={styles.price}>{suggestion.product_price}</div>
                  </div>
                </button>
              ))}
            </div>
          ) : searchHistory.length > 0 ? (
            <div className={styles.historySection}>
              <h3 className={styles.sectionTitle}>Search History</h3>
              {searchHistory.map((term) => (
                <button key={term} onClick={() => setSearchTerm(term)} className={styles.suggestionItem}>
                  {term}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
