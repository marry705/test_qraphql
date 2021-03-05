export function getRequest(url: string, method: string, data: null | FormData): Promise<[] | Error> {
  try {
    const mainResponse = fetch(`api/${url}`, {
      method,
      body: data,
    }).then((response) => {
      if (response.status !== 200) throw new Error('Request failed');
      return response.json();
    });
    return mainResponse;
  } catch (e) {
    throw new Error('Request failed');
  }
}
