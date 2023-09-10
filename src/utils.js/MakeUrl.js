export const MakeUrl = (queryObject) => {
  console.log(queryObject);

  const dataUrl = `${queryObject.bookApiUrl}?q=intitle:${
    queryObject.searchValue
  }${queryObject.categoryUrl}&langRestrict=ru&startIndex=${String(
    queryObject.paginationIndex
  )}&maxResults=${String(queryObject.paginationCount)}&orderBy=${
    queryObject.sortValue
  }&key=${queryObject.apiKey}`;

  return dataUrl;
};
