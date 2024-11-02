import React, { useState } from "react";
import MoviesRepo from "../api_client/movies_repo";

const ReferMovieModal = ({ movie, modalRef, closeModal }) => {
  const initialValues = {
    name: "",
    friendName: "",
    friendEmail: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const referMovie = async () => {
    var response = await MoviesRepo.shareMovie(
      formValues.name,
      formValues.friendName,
      formValues.friendEmail,
      movie
    );
    if (response.data.status) {
      closeModal();
      alert(response.data.msg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.keys(validate(formValues)).length === 0) {
      referMovie();
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.friendName) {
      errors.friendName = "Name is required";
    }
    if (!values.friendEmail) {
      errors.friendEmail = "Email is required";
    }
    return errors;
  };

  return (
    <div id="myModal" className="modal" ref={modalRef}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <div className="ui form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname" className="black">
              Enter your name :
            </label>
            <input
              type="text"
              id="movieName"
              className="field"
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
            <p className="red">{formErrors.name}</p>
            <label htmlFor="fname" className="black">
              Friends Name :
            </label>
            <input
              type="text"
              id="movieName"
              className="field"
              name="friendName"
              value={formValues.friendName}
              onChange={handleChange}
            />
            <p className="red">{formErrors.friendName}</p>
            <label htmlFor="lname" className="black">
              Friend's Email :
            </label>
            <input
              type="text"
              id="movieSummary"
              className="field"
              name="friendEmail"
              value={formValues.friendEmail}
              onChange={handleChange}
            />
            <p className="red">{formErrors.friendEmail}</p>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReferMovieModal;
