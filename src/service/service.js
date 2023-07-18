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
    return response_1.results.slice(0, 10);
  } catch (err) {
    return console.error(err);
  }
};

const getGenres = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      options
    );
    const response_1 = await response.json();
    return response_1.genres;
  } catch (err) {
    return console.error(err);
  }
};

const get = {
  getMovie,
  getGenres,
};

export { get };
