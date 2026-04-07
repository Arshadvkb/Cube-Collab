import { genrateToken } from './tokens.js';
import jwt from 'jsonwebtoken';

describe('tokens utility', () => {
  it('should generate a token and set it in a cookie', async () => {
    // Mock the Express response object
    const res = {
      cookie: vi.fn(),
    };

    process.env.JWT_SECRETE = 'test_secret';
    process.env.NODE_ENV = 'development';

    const token = await genrateToken('user_id_123', res);

    expect(typeof token).toBe('string');
    expect(res.cookie).toHaveBeenCalledWith('token', token, {
      httpOnly: true,
      secure: false, // NODE_ENV is development
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  });
});
