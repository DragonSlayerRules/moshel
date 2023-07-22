import React, { useEffect, useState } from "react";
import { get } from "../../services/service";
import MovieCard from "../atoms/movieCard";
import SectionWrap from "../organisms/sectionWrap";
function Content({ param }) {
  const [movieData, setMovieData] = useState();

  useEffect(() => {
    get
      .getMovie(param)
      .then((results) => {
        setMovieData(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [param]);

  return (
    <SectionWrap param={param}>
      <MovieCard data={movieData} type="movie" location="front" />
    </SectionWrap>
  );
}

export default Content;
