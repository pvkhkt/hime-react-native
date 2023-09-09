const API_DOMAIN = "https://f7e0-18-163-152-142.ngrok-free.app/v1"; // python
const apiUpload = API_DOMAIN + "/upload";
const apiGetBaiHoc = API_DOMAIN + "/getbaihoc";
const apiGetCauChuyen = API_DOMAIN + "/getcauchuyen";
const apiSearch = API_DOMAIN + "/search";

// const API_DOMAIN = "https://88b3-115-79-193-205.ngrok-free.app"; // main
// const apiUpload = API_DOMAIN + "/upload";
// const apiGetBaiHoc = API_DOMAIN + "/lesson";
// const apiGetCauChuyen = API_DOMAIN + "/story";
// const apiSearch = API_DOMAIN + "/search";

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");
// myHeaders.append("Access-Control-Allow-Origin", "*");
// myHeaders.append("ngrok-skip-browser-warning", "true");

export const doSearch = async (keyword) => {
  var raw = JSON.stringify({
    keyword: keyword,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(apiSearch, requestOptions).then((response) =>
    response.text(),
  );

  return JSON.parse(response);
};

export const getCauChuyen = async (from = 1, limit = 3) => {
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const endpoint = `${apiGetCauChuyen}`;
  const response = await fetch(endpoint, requestOptions).then((response) =>
    response.text(),
  );

  return JSON.parse(response);
};

export const getBaiHoc = async (from = 1, limit = 3) => {
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const endpoint = `${apiGetBaiHoc}`;
  const response = await fetch(endpoint, requestOptions).then((response) =>
    response.text(),
  );

  return JSON.parse(response);
};

export const upload = async (path) => {
  const filepath = "file:///" + path.split("file:/").join("");
  const file = {
    uri: filepath, // e.g. 'file:///path/to/file/image123.jpg'
    name: filepath.split("/").pop(),
    type: "image/jpg",
  };

  const formdata = new FormData();
  formdata.append("image", file);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
    headers: {
      Accept: "*/*",
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await fetch(apiUpload, requestOptions)
    .then((response) => response.text())
    .catch((error) => {
      console.log("upload error", error);
    });

  console.log(response);

  return JSON.parse(response);
};
