import { GlobalStateProvider } from '../context/themePreferencesContext'
import '../styles/global.css'

export default function App({ Component, pageProps }) {
  return (
    <GlobalStateProvider>
      <Component {...pageProps} />
    </GlobalStateProvider>
  )
}
