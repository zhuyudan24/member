import { fetch,fetchqs } from "./fetch";
export function doFetch(url,option) {
  return fetch(url+'?requestProject=member',option);
}

export function doFetchqs(url,option) {
  return fetchqs(url+'?requestProject=member',option);
}
