import { Auth } from '@supabase/auth-ui-react'
import supabase from '../utils/supabase'
const customTheme = {
  default: {
    colors: {
      brand: 'hsl(153 60.0% 53.0%)',
      brandAccent: 'hsl(154 54.8% 45.1%)',
      brandButtonText: 'white',
    },
  },
  dark: {
    colors: {
      brandButtonText: 'white',
      defaultButtonBackground: '#2e2e2e',
      defaultButtonBackgroundHover: '#3e3e3e',
    },
  },

  evenDarker: {
    colors: {
      brandButtonText: 'white',
      defaultButtonBackground: '#1e1e1e',
      defaultButtonBackgroundHover: '#2e2e2e',
    },
  },
}


export default function AuthForm() {

  async function signInWithAzure() 
  {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: 'email',
      },
    })
  }

  return (
    <div className="container">
      <img src="/logo.png" alt="logo" />
      <fieldset className="form-container">
        <button onClick={signInWithAzure}>Click me</button>
    {/* <Auth
      view="magic_link"
      appearance={{ theme: customTheme}}
      theme="dark"
      showLinks={false}
      providers={["azure"]}
      redirectTo="http://localhost:3000/dashboard"
      /> */}
      </fieldset>
      </div>   
  )
}