export class UserRepository {
  constructor(url) {
    this.url = url;
  }
  async register(item) {
    try {
      const response = await fetch(this.url + '/user/register', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(this.url + '/user/register');
      return response.json();
    } catch (e) {
      console.log('error: ', e);
    }
  }
  async login(item) {
    const response = await fetch(this.url + '/user/login', {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error in login process');
    return response.json();
  }
}
