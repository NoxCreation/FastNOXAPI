import argon2 from 'argon2';

export async function checkPassword(password: string, hashedPassword: string) {
  try {
    const match = await argon2.verify(hashedPassword, password);
    return match;
  } catch (error) {
    console.error('Error verifying password:', error);
    throw error;
  }
}

export async function generateHash(password: string) {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
}



