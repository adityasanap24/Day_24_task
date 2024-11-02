import React from "react";
import { useState } from "react";
import "../components/css/common.css";
import "../components/css/add-movie.css";
import MoviesRepo from "../api_client/movies_repo";

const AddMoviePage = () => {
  const initialValues = {
    name: "",
    rating: "0.0",
    summary: "",
    poster: "",
    trailer: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const addMovie = async () => {
    var response = await MoviesRepo.addNewMovie(
      formValues.name,
      formValues.poster,
      formValues.rating,
      formValues.summary,
      formValues.trailer
    );
    if (response.data.status) {
      alert(response.data.msg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.keys(validate(formValues)).length === 0) {
      addMovie();
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Movie Name is required!";
    }
    if (!values.rating) {
      errors.rating = "Movie rating is required";
    } else if (!Number(values.rating)) {
      errors.rating = "Movie rating must be a number";
    }
    if (!values.summary) {
      errors.summary = "Summary is required";
    }
    if (!values.poster) {
      errors.poster = "Poster is required";
    }
    if (!values.trailer) {
      errors.trailer = "Trailer is required";
    }
    return errors;
  };

  return (
    <>
      <div className="safeArea">
        <h1 className="pageTitle">Add Movie Page</h1>
        <div className="center">
          <div className="ui form">
            <form onSubmit={handleSubmit}>
              <label htmlFor="fname">Movie Name</label>
              <input
                type="text"
                id="movieName"
                className="field"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
              <p>{formErrors.name}</p>
              <label htmlFor="lname">Movie Rating</label>
              <input
                type="text"
                id="movieRating"
                className="field"
                name="rating"
                value={formValues.rating}
                onChange={handleChange}
              />
              <p>{formErrors.rating}</p>
              <label htmlFor="lname">Summary</label>
              <input
                type="text"
                id="movieSummary"
                className="field"
                name="summary"
                value={formValues.summary}
                onChange={handleChange}
              />
              <p>{formErrors.summary}</p>

              <label htmlFor="lname">Poster</label>
              <input
                type="url"
                id="posterUrl"
                className="field"
                name="poster"
                value={formValues.poster}
                onChange={handleChange}
              />
              <p>{formErrors.poster}</p>

              <label htmlFor="lname">Trailer</label>
              <input
                type="url"
                id="trailerUrl"
                className="field"
                name="trailer"
                value={formValues.trailer}
                onChange={handleChange}
              />
              <p>{formErrors.trailer}</p>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMoviePage;
