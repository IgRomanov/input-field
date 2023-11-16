export const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email) || 'Incorrect email';

export const validatePassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
        return 'The passwords do not match';
    } else if (password.length < 6) {
        return 'Too short password';
    }
};