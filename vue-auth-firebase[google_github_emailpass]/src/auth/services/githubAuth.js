import { GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from './firebase'

export async function signInWithGithub() {
  try {
    const provider = new GithubAuthProvider()
    const result = await signInWithPopup(auth, provider)
    return result.user
  } catch (err) {
    console.error('GitHub sign-in error', err)
    throw err
  }
}

export async function signUpWithGithub() {
  const provider = new GithubAuthProvider()
  provider.setCustomParameters({ allow_signup: 'true' })
  try {
    const result = await signInWithPopup(auth, provider)
    return result.user
  } catch (err) {
    throw err
  }
}

export default { signInWithGithub, signUpWithGithub }

