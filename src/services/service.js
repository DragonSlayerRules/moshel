const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWNjZjI2NDlhZmUzMmM2NWZhNWMwMGE2NDFlYmYwNyIsInN1YiI6IjY0YWJiOGFhOGEwZTliMDEwMGMzODhkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WzLmOCYKYl4YPdAmlcDMiT1ad-HfU7lAY1iTP4gPpFQ",
  },
};

const getMovie = async (param) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${
        param === "popular"
          ? "popular"
          : param === "topRated"
          ? "top_rated"
          : param === "nowPlaying"
          ? "now_playing"
          : "upcoming"
      }?language=en-US&page=1`,
      options
    );
    const response_1 = await response.json();
    return response_1.results;
  } catch (err) {
    return console.error(err);
  }
};

const getGenres = async (param) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/${
        param === "movie" ? "movie" : "tv"
      }/list?language=en`,
      options
    );
    const response_1 = await response.json();
    return response_1.genres;
  } catch (err) {
    return console.error(err);
  }
};

const getDiscover = async (filter, params) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/${
        params.type ? params.type : "movie"
      }?include_adult=false&include_video=false&language=en-US&page=${
        params.page
      }&sort_by=${filter?.sort ? filter.sort : "popularity.desc"}${
        filter?.genreId ? "&with_genres=" + filter.genreId : ""
      }`,
      options
    );
    const response_1 = await response.json();
    return response_1;
  } catch (err) {
    return console.error(err);
  }
};

const getSearch = async (params) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/${params.type}?query=${params.query}&page=${params.page}`,
      options
    );
    const response_1 = await response.json();
    return response_1;
  } catch (err) {
    return console.error(err);
  }
};

const getPersonDetails = async (params, type) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${params.userId}${
        type === "credits"
          ? "/movie_credits"
          : type === "link"
          ? "/external_ids"
          : ""
      }`,
      options
    );
    const response_1 = await response.json();
    return response_1;
  } catch (err) {
    return console.error(err);
  }
};

const getMovieDetails = async (params, type) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${params.type}/${params.userId}${
        type === "casts"
          ? "/credits"
          : type === "recommendations"
          ? "/recommendations"
          : type === "link"
          ? "/videos"
          : ""
      }`,
      options
    );
    const response_1 = await response.json();
    return response_1;
  } catch (error) {
    console.error(error);
  }
};

const get = {
  getMovie,
  getGenres,
  getDiscover,
  getSearch,
  getPersonDetails,
  getMovieDetails,
};

export { get };
