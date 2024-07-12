import "./Search.scss";
import SearchButton from "../SearchButton/SearchButton";
import { useState } from "react";

const Search = (props) => {
  const [searchInput, setSearchInput] = useState("");

  function handleSearchInput(event) {
    const searchTerm = event.target.value;
    setSearchInput(searchTerm.toLowerCase());
    event.target.value = "";
  }

  return (
    <section className="search">
      <header className="search__header">
        <h4 className="search__heading heading">Search Bookings</h4>
      </header>
      <form
        className="search__form"
        onSubmit={(e) => {
          e.preventDefault();
          props.search(searchInput);
          setSearchInput("");
        }}
      >
        <label className="search__label" htmlFor="customerName">
          &rarr;
        </label>
        <input
          type="search"
          id="customerName"
          className="search__input"
          placeholder="Search by Customer name"
          value={searchInput}
          onChange={handleSearchInput}
        />
        <SearchButton />
        <button
          onClick={(e) => {
            e.preventDefault();
            props.loading();
          }}
        >
          Refresh
        </button>
      </form>
    </section>
  );
};
export default Search;
