// * helper function for v1660190042
// * I wrote this function today: 2022 August 12.
export const getCloudinaryThumbnail = (url: string) => {
  const urlSplit = url.substring(url.indexOf("/") + 2).split("/");
  const uploadIndex = urlSplit.indexOf("upload");
  const versionIndex = urlSplit.indexOf("v1660190042");

  urlSplit.splice(
    uploadIndex + 1,
    (versionIndex === uploadIndex + 2) ? 1 : 0,
    "c_thumb,w_200");
  
  return `https://${urlSplit.join("/")}`;
};
