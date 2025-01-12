import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Badge, Button } from 'react-bootstrap'
import { Formik, Field, Form as FormikForm } from 'formik'
import { getCookie } from '../../helper/tokenHandler'
import { setArticles } from '../redux/articleSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

interface Preference {
  authors: string[]
  sources: string[]
}

const initialValues: Preference = {
  authors: [],
  sources: [],
}

const Preferences: React.FC = () => {
  const navigate = useNavigate()
  const [myPreferences, setMyPreferences] = useState<Preference>({ authors: [], sources: [] })
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const dispatch = useDispatch()

  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null)

  // Fetch mypreferences on mount
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/preferences')
      .then(response => response.json())
      .then(data => {
        setMyPreferences(data.preference)
      })
      .catch(error => console.error('Error fetching preferences:', error))
  }, [])

  // Fetch my current preferences
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/myPreference', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getCookie()}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        setSelectedAuthors(data.authors || [])
        setSelectedSources(data.sources || [])
      })
      .catch(error => console.error('Error fetching preferences:', error))
  }, [])

  const handleAddBadge = (value: string, type: 'authors' | 'sources') => {
    if (!value) return

    if (type === 'authors' && !selectedAuthors.includes(value)) {
      setSelectedAuthors([...selectedAuthors, value])
    } else if (type === 'sources' && !selectedSources.includes(value)) {
      setSelectedSources([...selectedSources, value])
    }
  }

  const handleRemoveBadge = (value: string, type: 'authors' | 'sources') => {
    if (type === 'authors') {
      setSelectedAuthors(selectedAuthors.filter(author => author !== value))
    } else if (type === 'sources') {
      setSelectedSources(selectedSources.filter(source => source !== value))
    }
  }

  const handleSubmit = async (values: Preference) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie()}`,
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error submitting preferences:', error)
    }
  }

  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer)
    setDebounceTimer(
      setTimeout(() => {
        handleSubmit({ authors: selectedAuthors, sources: selectedSources })
      }, 500)
    )
  }, [selectedAuthors, selectedSources, debounceTimer])


  const handleApplyFilter = async () => {
    const filters = {
      authors: selectedAuthors.join(','),
      sources: selectedSources.join(',')
    }

    const queryParams = new URLSearchParams(
      Object.entries(filters).filter(([, value]) => value)
    ).toString()

    try {
      const response = await fetch(`http://localhost:8000/api/v1/getPersonalizedFeed?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie()}`
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      console.log(data)
      dispatch(setArticles(data))
      navigate('/newsfeed')
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  }
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <FormikForm className='p-4'>
          <h3 className='mb-4'>Preferences</h3>
          <Row className='mb-3'>
            <Col xs={12}>
              <Form.Group controlId='sources' className='mb-3'>
                <Form.Label className='small'>Source</Form.Label>
                <Field
                  as='select'
                  name='sources'
                  className='form-select small'
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const value = e.target.value
                    setFieldValue('sources', value)
                    handleAddBadge(value, 'sources')
                  }}
                >
                  <option value=''>Select a Source</option>
                  {myPreferences.sources.map((source, idx) => (
                    <option key={idx} value={source}>
                      {source}
                    </option>
                  ))}
                </Field>
                <div className='mt-2'>
                  {selectedSources.map((source, idx) => (
                    <Badge
                      key={idx}
                      pill
                      bg='info'
                      className='me-2'
                      onClick={() => handleRemoveBadge(source, 'sources')}
                      style={{ cursor: 'pointer' }}
                    >
                      {source} <span>x</span>
                    </Badge>
                  ))}
                </div>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group controlId='authors' className='mb-3'>
                <Form.Label className='small'>Author</Form.Label>
                <Field
                  as='select'
                  name='authors'
                  className='form-select small'
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const value = e.target.value
                    setFieldValue('authors', value)
                    handleAddBadge(value, 'authors')
                  }}
                >
                  <option value=''>Select an Author</option>
                  {myPreferences.authors.map((author, idx) => (
                    <option key={idx} value={author}>
                      {author}
                    </option>
                  ))}
                </Field>
                <div className='mt-2'>
                  {selectedAuthors.map((author, idx) => (
                    <Badge
                      key={idx}
                      pill
                      bg='info'
                      className='me-2'
                      onClick={() => handleRemoveBadge(author, 'authors')}
                      style={{ cursor: 'pointer' }}
                    >
                      {author} <span>x</span>
                    </Badge>
                  ))}
                </div>
              </Form.Group>
              <Button
                variant='light'
                type='button'
                className='w-100 border'
                onClick={handleApplyFilter}
              >
                Apply Filters
              </Button>
            </Col>
          </Row>
        </FormikForm>
      )}
    </Formik>
  )
}

export default Preferences
