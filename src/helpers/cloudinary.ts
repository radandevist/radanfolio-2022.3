// // * helper function for v1660190042
// // * I wrote this function today: 2022 August 12.
// const setFilter = (url: string, filter: string) => {
//   const urlSplit = url.substring(url.indexOf("/") + 2).split("/");
//   const uploadIndex = urlSplit.indexOf("upload");
//   const versionIndex = urlSplit.indexOf("v1660190042");

//   urlSplit.splice(
//     uploadIndex + 1,
//     (versionIndex === uploadIndex + 2) ? 1 : 0,
//     filter);
  
//   return `https://${urlSplit.join("/")}`;
// };

// const getCloudinaryThumbnail = (url: string) => setFilter(url, "c_thumb,w_200");

// const getCloudinaryOpenGraphImage = (url: string) => setFilter(url, "c_limit,h_680,w_1300");
