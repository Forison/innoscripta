import React, { useState, useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FaTrash } from 'react-icons/fa'
import { getCookie } from '../../helper/tokenHandler'

interface Props {
  id: number
}

const DeleteArticle: React.FC<Props> = ({ id }) => {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('Are you sure you want to remove this article permanently?')

  const handleClose = useCallback(() => setShow(false), [])
  const handleShow = useCallback(() => setShow(true), [])

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie()}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        setMessage(data.message)
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
      .catch(error => console.error('Error:', error))
  }

  return (
    <>
      <FaTrash
        className='text-danger cursor-pointer'
        onClick={handleShow}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete News Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='danger' onClick={handleDelete}>
            Delete Article
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteArticle
