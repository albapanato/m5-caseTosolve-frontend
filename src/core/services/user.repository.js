export class UserRepository {
  constructor(url) {
    this.url = url;
  }
  async register(item) {
    const response = await fetch(this.url + 'user/register', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  }
  async login(item) {
    const response = await fetch(this.url + 'user/login', {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error in login process');
    return response.json();
  }
}
