import React, { memo } from 'react'
import Alert from 'react-bootstrap/Alert'

interface Props {
  variant: string
  message: string | React.ReactNode
}
const AlertBanner: React.FC<Props> = ({ message, variant }) => {
  return (
    <Alert variant={variant} className='mt-3 text-center'>
      {message}
    </Alert>
  )
}

export default memo(AlertBanner)