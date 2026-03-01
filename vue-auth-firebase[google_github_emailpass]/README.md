run 
npm install vue-router vuex axios firebase @firebase/auth

npm install -g @vue/cli

copy src/auth for nav ((login,signup:google or github or email&pass),logout)

copy router

copy store 

check imports in main.js


setup:

Create a new Firebase project>add app>web>
put val in .env:
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain

go to authintcation on project>setup(google,github(Developer Settings>OAuth),emailpass) providers

note: marge routers in one file