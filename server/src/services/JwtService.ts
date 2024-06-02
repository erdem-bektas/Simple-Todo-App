import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

class JWTService {
  private privateKey: Buffer;
  private publicKey: Buffer;

  constructor() {
    this.privateKey = fs.readFileSync(path.resolve(__dirname, '../../keys/private.key'));
    this.publicKey = fs.readFileSync(path.resolve(__dirname, '../../keys/public.key'));
  }

  public sign(payload: object, expiresIn: string | number): string {
    return jwt.sign(payload, this.privateKey, {
      algorithm: 'RS256',
      expiresIn: expiresIn,
    });
  }

  public verify(token: string): any {
    try {
      return jwt.verify(token, this.publicKey, { algorithms: ['RS256'] });
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  public signRefreshToken(payload: object, expiresIn: string | number): string {
    return jwt.sign(payload, this.privateKey, {
      algorithm: 'RS256',
      expiresIn: expiresIn,
    });
  }

  public verifyRefreshToken(token: string): any {
    try {
      return jwt.verify(token, this.publicKey, { algorithms: ['RS256'] });
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}

export default new JWTService();
