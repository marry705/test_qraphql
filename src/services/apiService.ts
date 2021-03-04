export function getRequest<T>(url: string): Promise<T> {
  return fetch(url)
    .then((response) => {
      if (response.status !== 200) throw new Error('Request failed');
      return response.json();
    })
    .then((response) => response.bpi)
    .catch((error: Error) => error);
}
