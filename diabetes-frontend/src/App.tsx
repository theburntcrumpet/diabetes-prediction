import * as React from 'react'
import { ChakraProvider, Container, Heading, Text } from '@chakra-ui/react'
import Questions from './components/Questions'
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'


const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ config })


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW={"xl"}>
        <Heading>Diabetes Test</Heading>
        <Text fontSize="xl">Uses machine learning to predict the likeliehood of you testing positive for diabetes</Text>
        <Questions />
      </Container>
    </ChakraProvider>
  )
}

export default App;