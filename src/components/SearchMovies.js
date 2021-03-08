import React, { useState } from "react";
import FormComponent from "./FormComponent";

export default function SearchMovies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [apiCalled, setApiCall] = useState(false);

  const searchMovies = async (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=65b2d4a08fc4519f762f7531fe791385&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
        if(validateForm(query)) {
            const res = await fetch(url);
            const data  = await res.json();
            setMovies(data.results);
            setApiCall(true);
        }
    }
    catch(err){
        console.error(err);
    }
  };
  function showList() {
    if(movies.length) {
        return (
            <div>
                <div className="card-list">
                {
                    movies.filter(movie => movie.poster_path)
                        .map(movie => (
                            <FormComponent movie={movie} key={movie.id} />
                        )
                    )
                }
                </div>
                <br/><br/><br/>
                <footer className = "foot" >Thank you for visiting!!</footer>
            </div>
            
            
        )
    } else if(!movies.length && apiCalled){
        return (
            <div>
                <div className="notFound" >Sorry,there is no movies as {query}</div>
                <br/><br/><br/>
                <footer className = "foot" >Thank you for visiting!!</footer>
            </div>
        )
    }
}


  return (
    <div>
      <form action="" className="form" onSubmit={searchMovies}>
        <label htmlFor="query" className="label">
          movie name{" "}
        </label>
        <input
          type="text"
          className="input"
          name="query"
          placeholder="jurrasic park"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        required/>

        <button className="button " type="submit">
          submit
        </button>
      </form>
      {showList()}
      </div>
      
  )
}

function validateForm(query) {
    if (query === "") {
      alert("Please check your input again")
      return false;
    }
    return true;
}

  
  



// 65b2d4a08fc4519f762f7531fe791385