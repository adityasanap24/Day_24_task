import React from "react";
import "../components/css/common.css";
import MoviesRepo from "../api_client/movies_repo";
import { useState } from "react";

const SearchPage = ({ setSelectedMovie, setIndex }) => {
  const [result, setResult] = useState([]);
  const search = async (e) => {
    let response = await MoviesRepo.searchMovie(e.target.value);
    setResult(response.data.data);
  };

  const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };
  const processChange = debounce((e) => search(e));

  return (
    <>
      <div className="safeArea">
        <h1 className="pageTitle">Search Page</h1>
        <div className="center">
          <label htmlFor="search">Search for movies</label>
          <input
            type="text"
            id="search"
            className="field"
            name="search"
            onChange={processChange}
          />
        </div>
        <div className="movies-container">
          {result ? (
            result.map((e) => (
              <div
                className="safeArea center"
                onClick={() => {
                  setSelectedMovie(e);
                  setIndex(0);
                }}
              >
                {e.poster ? (
                  <img
                    className={"movie-cover"}
                    style={{ width: "200px", height: "250px" }}
                    src={`${e.poster}`}
                    alt=""
                  />
                ) : (
                  <div className={"no-image"}>No Image Found</div>
                )}
                <label key={e._id}>{e.name}</label>
              </div>
            ))
          ) : (
            <div className="center safeArea">No data found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
