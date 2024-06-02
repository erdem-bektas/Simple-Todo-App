import { z } from 'zod';

const registerSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters long')
        .regex(/\d/, 'Password must contain a number')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain a special character')
});

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().nonempty('Password cannot be empty'),
});

export default class UserValidator {
    public static register = registerSchema;
    public static login = loginSchema;
}
