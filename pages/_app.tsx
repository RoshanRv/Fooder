import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import Store from '../components/Context'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Store>
        <Navbar/>
        <Component {...pageProps} />
        <Footer/>
      </Store>
    </>
    )
}

export default MyApp
