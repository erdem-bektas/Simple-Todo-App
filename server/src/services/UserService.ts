import User from '../models/User';
import JwtService from './JwtService';

class UserService {
  public async register(email: string, password: string): Promise<{ status: boolean, message?: string }> {
    const existingUser = await User.exists({ email });
    if (existingUser) {
      return { status: false, message: "User already exist" }
    }

    const user = new User({ email, password });
    const response = await user.save();

    if (response) return { status: true };
    else return { status: false, message: "Something went wrong" }
  }

  public async login(email: string, password: string): Promise<{ token: string | null, refreshToken: string | null, message?: string }> {
    const user = await User.findOne({ email });
    if (!user) {
      return { token: null, refreshToken: null, message: "Invalid credentials" }
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return { token: null, refreshToken: null, message: "Invalid credentials" }
    }

    const token = JwtService.sign({ id: user._id }, '4h');
    const refreshToken = JwtService.signRefreshToken({ id: user._id }, '6h');

    return { token, refreshToken };
  }

  public async refreshToken(_refreshToken: string): Promise<{ token: string | null, refreshToken: string | null, message?: string }> {
    try {
      const decoded = JwtService.verifyRefreshToken(_refreshToken);
      const token = JwtService.sign({ id: decoded.id }, '1h');
      const refreshToken = JwtService.signRefreshToken({ id: decoded._id }, '6h');

      return { token, refreshToken };
    } catch (error) {
      return { token: null, refreshToken: null, message: 'Invalid refresh token' };
    }
  }
}

export default UserService;
