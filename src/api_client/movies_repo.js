import axiosClient from "./client";

const MoviesRepo = {
  getAllMovies: async () => {
    return await axiosClient.get("movies/getMovies");
  },

  getMovieById: async (id) => {
    return await axiosClient.get(`movies/getMovieById/${id}`);
  },

  searchMovie: async (name) => {
    return await axiosClient.get(`movies/searchMovie/${name}`);
  },

  addNewMovie: async function (name, poster, rating, summary, trailer) {
    var id = Number((Math.random() * 100).toFixed(0));
    return await axiosClient.post("movies/addMovie", {
      id,
      name,
      poster,
      rating,
      summary,
      trailer,
    });
  },

  deleteMovieById: async (id) => {
    return await axiosClient.delete(`movies/deleteMovieById/${id}`);
  },
  shareMovie: async (referrer_name, referred_name, referred_email, movie) => {
    return await axiosClient.post("movies/shareMovie/", {
      referrer_name,
      referred_name,
      referred_email,
      movie,
    });
  },
  order: async ({ amount, currency, receipt, notes }) => {
    return await axiosClient.post("movies/order/", {
      amount,
      currency,
      receipt,
      notes,
    });
  },
};

export default MoviesRepo;
