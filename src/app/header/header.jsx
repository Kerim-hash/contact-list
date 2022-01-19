import React, { useState } from "react";
import { useDebounce } from "../../hook/useDebounce";
import "./index.css";
const Header = ({ handleChange, search ,setSort, sort}) => {
  // State and state setter for the search query
  const [displayValue, setDisplayValue] = useState(search);
  //  Hook will return only the last value (which we passed) ...
  // if more than 500ms has passed since last call.
  // Otherwise, it will return the previous value of search.
  //  The goal is to call filter only after the user has stopped
  //  typing so we don't end up calling the filter too often.
  const debounceChange = useDebounce(handleChange, 500);
  // handleChangeSearch to change displayValue and search
  const handleChangeSearch = (e) => {
    debounceChange(e.target.value);
    setDisplayValue(e.target.value);
  };
  return (
    <header className="header">
      <img
        className="header__logo"
        src="https://cdn-icons-png.flaticon.com/512/2648/2648554.png"
        alt="logo"
      />
      <div className="header__items">
      <div className="header__checkbox" >
      <label>
        <input type="checkbox" value={sort} onChange={e => setSort(e.target.checked)}/>
         <div className="icon-box">
            <img src="https://www.pngrepo.com/png/310152/512/text-sort-ascending.png" alt="sort" />
        </div>
      </label>
      </div>

      <input
        className="header__search"
        type="search"
        placeholder="Поиск контактов"
        value={displayValue}
        onChange={handleChangeSearch}
        />
        </div>
    </header>
  );
};

export default Header;
