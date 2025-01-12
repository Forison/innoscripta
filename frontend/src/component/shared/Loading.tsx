import React, { memo } from 'react'
import Spinner from 'react-bootstrap/Spinner'

const Loading: React.FC = () => {
  return <Spinner animation="grow" />
}
export default memo(Loading)