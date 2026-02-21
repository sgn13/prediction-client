export const queryGenerator = (query: any) => {
  const queryParams = new URLSearchParams();
  Object.keys(query || {}).forEach((key) => {
    if (query[key]) {
      queryParams.append(key, query[key]);
    }
  });
  return queryParams.toString() ? `?${queryParams.toString()}` : "";
};
