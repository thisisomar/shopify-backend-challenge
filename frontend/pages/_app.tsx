import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import urqlConfig from '../utils/urqlConfig'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default withUrqlClient(urqlConfig, { ssr: true })(MyApp)
