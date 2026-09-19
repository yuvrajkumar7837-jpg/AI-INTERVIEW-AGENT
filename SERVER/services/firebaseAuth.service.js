import axios from 'axios'

export async function verifyFirebaseIdToken(idToken) {
  if (!idToken) {
    throw new Error('Missing Firebase ID token')
  }

  try {
    const apiKey = process.env.FIREBASE_API_KEY
    if (!apiKey) {
      const { data } = await axios.get('https://oauth2.googleapis.com/tokeninfo', { params: { id_token: idToken } })
      if (!data?.email || data.email_verified === 'false') throw new Error('Invalid Google ID token')
      return { email: data.email, name: data.name || data.email.split('@')[0] }
    }
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
