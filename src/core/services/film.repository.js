export class FilmRepository {
  constructor(url, token) {
    this.url = url;
    this.token = token;
    this.url += '/film';
  }
  async getAll(url = this.url, genre) {
    let urlToSend = '';
    !genre ? (urlToSend = url) : (urlToSend = `${url}/film?${genre}`);
    console.log('url', urlToSend);
    const response = await fetch(urlToSend);
    console.log('response', response);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }
    const answer = await response.json();
    return answer;
  }
  async create(item) {
    console.log('CREATE ', item);
    const response = await fetch(this.url + '', {
      method: 'POST',
      body: item,
      headers: { Authorization: 'Bearer ' + this.token },
    });
    return response.json();
  }
  async update(id, item) {
    const response = await fetch(this.url + '/' + id, {
      method: 'PATCH',
      body: item,
      headers: { Authorization: 'Bearer ' + this.token },
    });
    const updatedFilm = await response.json();
    return updatedFilm;
  }
  async delete(id) {
    const response = await fetch(this.url + '/' + id, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + this.token },
    });
    return response.ok;
  }
  async addComment(id, item) {
    const response = await fetch(this.url + '/addcomment/' + id, {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: { Authorization: 'Bearer ' + this.token },
    });
    const updated = await response.json();
    return updated;
  }
}
