import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import Store from '../components/Context'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Store>
        <Navbar/>
        <Component {...pageProps} />
      </Store>
    </>
    )
}

export default MyApp
