export const parseRequestUrl = function () {
  const path = window.location.hash.slice(1).toLowerCase() || "/";

  const params = path.split("/");
  console.log(path);
  console.log(path.split("/"));

  const request = {
    resource: params[0] || null,
    id: params[1] || null,
    verb: params[2] || null,
  };

  console.log(request);

  return request;
};
