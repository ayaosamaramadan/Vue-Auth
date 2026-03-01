import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from './firebase'

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  try {
    const result = await signInWithPopup(auth, provider)
    return result.user
  } catch (err) {
    throw err
  }
}

export default { signInWithGoogle }
