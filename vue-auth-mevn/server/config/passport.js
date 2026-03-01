import dotenv from 'dotenv'
dotenv.config() // must run before reading process.env — imports are hoisted in ESM

import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as GitHubStrategy } from 'passport-github2'
import User from '../models/User.model.js'

/**
 * Find an existing user by provider+providerId, or create a new one.
 */
const findOrCreate = async ({ provider, providerId, email, name, avatar }) => {
  let user = await User.findOne({ provider, providerId })
  if (user) return user

  if (email) {
    user = await User.findOne({ email })
    if (user) {
      user.provider = provider
      user.providerId = providerId
      if (!user.avatar) user.avatar = avatar
      await user.save()
      return user
    }
  }

  user = await User.create({ name, email, provider, providerId, avatar })
  return user
}

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000'

// ─── Google Strategy ─────────────────────────── (only if credentials set)
const googleId = process.env.GOOGLE_CLIENT_ID
const googleSecret = process.env.GOOGLE_CLIENT_SECRET

if (googleId && googleId !== 'YOUR_GOOGLE_CLIENT_ID' && googleSecret && googleSecret !== 'YOUR_GOOGLE_CLIENT_SECRET') {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleId,
        clientSecret: googleSecret,
        callbackURL: `${SERVER_URL}/api/auth/google/callback`,
      },
      async (_at, _rt, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value || null
          const user = await findOrCreate({
            provider: 'google',
            providerId: profile.id,
            email,
            name: profile.displayName,
            avatar: profile.photos?.[0]?.value || null,
          })
          done(null, user)
        } catch (err) {
          done(err, null)
        }
      }
    )
  )
  console.log('✅ Google OAuth strategy registered')
} else {
  console.warn('⚠️  Google OAuth not configured — set GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET in server/.env')
}

// ─── GitHub Strategy ─────────────────────────── (only if credentials set)
const githubId = process.env.GITHUB_CLIENT_ID
const githubSecret = process.env.GITHUB_CLIENT_SECRET

if (githubId && githubId !== 'YOUR_GITHUB_CLIENT_ID' && githubSecret && githubSecret !== 'YOUR_GITHUB_CLIENT_SECRET') {
  passport.use(
    new GitHubStrategy(
      {
        clientID: githubId,
        clientSecret: githubSecret,
        callbackURL: `${SERVER_URL}/api/auth/github/callback`,
        scope: ['user:email'],
      },
      async (_at, _rt, profile, done) => {
        try {
          const email =
            profile.emails?.find((e) => e.primary || e.verified)?.value ||
            profile.emails?.[0]?.value ||
            null
          const user = await findOrCreate({
            provider: 'github',
            providerId: String(profile.id),
            email,
            name: profile.displayName || profile.username,
            avatar: profile.photos?.[0]?.value || null,
          })
          done(null, user)
        } catch (err) {
          done(err, null)
        }
      }
    )
  )
  console.log('✅ GitHub OAuth strategy registered')
} else {
  console.warn('⚠️  GitHub OAuth not configured — set GITHUB_CLIENT_ID & GITHUB_CLIENT_SECRET in server/.env')
}

export default passport
