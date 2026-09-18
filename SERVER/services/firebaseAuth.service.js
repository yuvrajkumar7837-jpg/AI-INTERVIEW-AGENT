import axios from 'axios'

export async function verifyFirebaseIdToken(idToken) {
  const apiKey = process.env.FIREBASE_API_KEY

  if (!apiKey) {
    throw new Error('FIREBASE_API_KEY is not configured')
  }

  if (!idToken) {
    throw new Error('Missing Firebase ID token')
  }

  try {
    const { data } = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      { idToken }
    )

    const firebaseUser = data.users?.[0]
    if (!firebaseUser?.email) {
      throw new Error('Invalid Firebase ID token')
    }

    return {
      email: firebaseUser.email,
      name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
    }
  } catch (error) {
    const message = error.response?.data?.error?.message || error.message
    throw new Error(`Firebase token verification failed: ${message}`)
  }
}
