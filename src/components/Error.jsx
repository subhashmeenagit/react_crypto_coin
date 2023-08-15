import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const Error = ({ message = 'something is Wrong' }) => {
  return (
    <Alert
      status="error"
      position={"fixed"}
      bottom={"4"}
      left={'4'}
      w={"container.lg"}
    >
      <AlertIcon />
      {message}
    </Alert>
  )
}

export default Error