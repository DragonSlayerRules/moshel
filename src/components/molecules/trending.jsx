import React, { useEffect, useState } from "react";
import TrendingCard from "../atoms/trendingCard";
import { get } from "../../services/service";
import SectionWrap from "../organisms/sectionWrap";

function Trending() {
  const [flag, setFlag] = useState("day");
  const [trendingData, setTrendingData] = useState();
  useEffect(() => {
    get
      .getTrending(flag)
      .then((results) => {
        setTrendingData(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [flag]);
  return (
    <SectionWrap param="trending">
      <TrendingCard data={trendingData?.results} />
    </SectionWrap>
  );
}

export default Trending;
