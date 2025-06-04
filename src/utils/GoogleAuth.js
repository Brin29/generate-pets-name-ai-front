import { googleSdkLoaded } from "vue3-google-login";

const googleAuth = (callback) => {
  googleSdkLoaded((google) => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      ux_mode: 'popup',
      callback: callback
    })
    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      {
        'theme': "outline",
        'size': 'large',
        'width': 300,
        'height': 70
      }
    )
  })
}

export default googleAuth;