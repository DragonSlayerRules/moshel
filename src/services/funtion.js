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

const handleCalculateAge = (birthDate, deathDate) => {
  if (!birthDate) {
    return;
  }
  const birthDateObj = new Date(birthDate);
  const currentDate = new Date();

  // If deathDate is provided, calculate age based on the difference between birth and death dates
  if (deathDate) {
    const deathDateObj = new Date(deathDate);
    const ageDiff = deathDateObj - birthDateObj;
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  // If deathDate is not provided, calculate age based on the difference between birth date and current date
  const ageDiff = currentDate - birthDateObj;
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const handleSortPopular = (data) => {
  return data?.sort((a, b) => b.popularity - a.popularity);
};

const handleClearDotsAndUnderscore = (sortList) => {
  return sortList.map((sortString) =>
    sortString.replace(/_/g, " ").replace(/\./g, " ")
  );
};

const execute = {
  handleFilter,
  handleScrollToTop,
  handleCalculateAge,
  handleSortPopular,
  handleClearDotsAndUnderscore,
};

export { execute };
