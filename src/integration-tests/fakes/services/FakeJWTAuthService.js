const AuthError = require('../../../shared/errors/AuthError');

class FakeJWTAuthService {
  constructor() {
    this.SECRET = 'a8d0872092fe59115d9e77b7629c3cab';
  }

  extract(token) {
    if (!token) throw new AuthError('missing auth token');

    const [id, secret, email, role] = token;

    if (!id || !secret || !email || !role) throw new AuthError('jwt malformed');
    if (secret !== this.SECRET) throw new AuthError('jwt malformed');

    return {
      id,
      email,
      role,
    };
  }

  generate({ id, email, role }) {
    return `${id}-${this.SECRET}-${email}-${role}`;
  }
}

module.exports = FakeJWTAuthService;
