import "../App.css";
import MovieCard from "../components/movie-card";
import ReferMovieModal from "../components/ReferMovieModal";
import MoviesRepo from "../api_client/movies_repo";
import { useRef, useState } from "react";

const HomePage = ({ selectedMovie, setSelectedMovie, movies }) => {
  const [boughtMovies, setBoughtMovies] = useState([]);
  const modal = useRef();
  const BACKGROUND_IMAGE_PATH = "https://image.tmdb.org/t/p/w1280/";
  const style = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)) ,url(${BACKGROUND_IMAGE_PATH}${selectedMovie.backdrop})`,
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    const body = {
      amount: selectedMovie.name.length * 3 * 1000,
      currency: "INR",
      notes: {
        description: selectedMovie.summary,
      },
    };
    const order = await MoviesRepo.order(body);
    var options = {
      key: "rzp_test_88Rv0leB7MRlDj",
      send_sms_hash: true,
      image: selectedMovie.poster,
      amount: order.data.amount.toString(),
      currency: "INR",
      name: selectedMovie.name,
      description: order.data.notes.description,
      order_id: order.data.id,
      handler: function (response) {
        setBoughtMovies([...boughtMovies, selectedMovie._id]);
        alert(
          `Thank you for purchasing '${selectedMovie.name}' from our store`
        );
      },
      theme: {
        color: "#090a0e",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();

    if (!res) {
      alert("Razorpay SDK failed to load...");
      return;
    }
  }

  return (
    <>
      <ReferMovieModal
        movie={selectedMovie}
        modalRef={modal}
        closeModal={() => {
          modal.current.style.display = "none";
        }}
      />
      <div className="info" style={style}>
        <header></header>
        <div className={"info-content"}>
          <h1>{selectedMovie.name}</h1>
          {selectedMovie.summary ? <p>{selectedMovie.summary}</p> : null}
          <h5
            className={"movie-title"}
            onClick={async () => {
              modal.current.style.display = "block";
            }}
          >
            Refer Movie 👭🏻
          </h5>
          {boughtMovies.includes(selectedMovie._id) ? (
            <h5 className={"movie-title"}>Purchased 🛒</h5>
          ) : (
            <h5 className={"movie-title"} onClick={displayRazorpay}>
              Buy Movie 🛒
            </h5>
          )}
          <h5
            className={"movie-title"}
            onClick={async () => {
              var response = await MoviesRepo.deleteMovieById(
                selectedMovie._id
              );
              if (response.data.status) {
                alert(response.data.msg);
                // window.location.reload();
              }
            }}
          >
            Delete Movie 🗑️
          </h5>
        </div>
      </div>
      <div className="container">
        {movies.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie._id}
            selectMovie={setSelectedMovie}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;
