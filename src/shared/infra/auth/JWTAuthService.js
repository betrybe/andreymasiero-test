const { sign, verify } = require('jsonwebtoken');
const AuthError = require('../../errors/AuthError');

class JWTAuthService {
  constructor() {
    this.SECRET = '7704ff94993d69f9c12f59a24a3c085e';
  }

  extract(token) {
    if (!token) throw new AuthError('missing auth token');

    return verify(token, this.SECRET, (err, decoded) => {
      if (err) throw new AuthError('jwt malformed');

      return {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };
    });
  }

  generate({ id, email, role }) {
    return sign({ id, email, role }, this.SECRET, { expiresIn: '1d' });
  }
}

module.exports = JWTAuthService;
