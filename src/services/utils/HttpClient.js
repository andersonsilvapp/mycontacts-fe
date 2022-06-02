import delay from '../../utils/delay';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    await delay();

    const response = await fetch(`${this.baseURL}${path}`);

    let body = null;
    const contenType = response.headers.get('Content-Type');
    if (contenType.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new Error(body?.error || `${response.status} - ${response.statusText}`);
  }
}

export default HttpClient;
