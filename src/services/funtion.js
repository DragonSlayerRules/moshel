const handleFilter = (ids, genres) => {
  const output = [];
  genres &&
    ids.map((id) =>
      genres.forEach((genre) => genre.id === id && output.push(genre.name))
    );
  return output.slice(0, 3);
};

const execute = {
  handleFilter,
};

export { execute };
