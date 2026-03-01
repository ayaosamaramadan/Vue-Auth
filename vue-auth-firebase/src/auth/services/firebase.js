import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

if (!firebaseConfig.apiKey) {
  console.warn('VITE_FIREBASE_API_KEY is not set — Firebase may not initialize correctly')
}

let firebaseApp
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig)
} else {
  try {
    firebaseApp = getApp()
  } catch (e) {
    firebaseApp = initializeApp(firebaseConfig)
  }
}

const auth = getAuth(firebaseApp)

export { firebaseApp, auth }
export default { firebaseApp, auth }
