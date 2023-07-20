const handleFilter = (ids, genres) => {
  const output = [];
  genres &&
    ids.map((id) =>
      genres.forEach((genre) => genre.id === id && output.push(genre.name))
    );
  return output.slice(0, 3);
};

const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Use 'auto' for instant scroll without animation
  });
};

const handleCalculateAge = (birthDate) => {
  const ageDiff = Date.now() - new Date(birthDate);
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const execute = {
  handleFilter,
  handleScrollToTop,
  handleCalculateAge,
};

export { execute };
