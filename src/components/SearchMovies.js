import React, { useState } from "react";
import FormComponent from "./FormComponent";
export default function SearchMovies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [apiCalled, setApicall] = useState(false);

  async function SearchMovies(e) {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=65b2d4a08fc4519f762f7531fe791385&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      if (validateForm(query)) {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results);
        setApicall(true);
      }
    } catch (err) {
      console.error(err);
    }
  }
  function validateForm(query) {
    if (query === "") {
      alert("Please check your input again");
      return false;
    }
    return true;
  }

  return (
    <div>
      <form onSubmit={SearchMovies} className="form">
        <label htmlFor="label" className="label">
          {" "}
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          value={query}
          placeholder="serach your movies"
          onChange={(event) => setQuery(event.target.value)}
          required
        />
        <button className="button"> submit</button>
      </form>

      {showlist()}
    </div>
  );
  function showlist() {
    if (movies.length) {
      return (
        <div>
          <div className="card-list">
            {movies
              .filter((movie) => movie.poster_path)
              .map((movie) => (
                <FormComponent movie={movie} key={movie.id} />
              ))}
          </div>
          <br />
          <br />
          <br />
          <footer className="foot">Thank you for visiting!!</footer>
        </div>
      );
    } else if (!movies.length && apiCalled) {
      return (
        <div>
          <div className="not-found">
            <h1>movie {query} not found on data </h1>
          </div>
          <div className="foot">
            <h1>thank you for searching!</h1>
          </div>
        </div>
      );
    }
  }
}
