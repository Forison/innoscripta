import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Badge } from 'react-bootstrap'
import { Formik, Field, Form as FormikForm } from 'formik'
import { getCookie } from '../../helper/tokenHandler'
import { setArticles, setPersonalize } from '../redux/articleSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'

interface Preference {
  authors: string[]
  sources: string[]
}

const initialValues: Preference = {
  authors: [],
  sources: [],
}

const Preferences: React.FC = () => {
  const [preferences, setPreferences] = useState<Preference>({ authors: [], sources: [] })
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const dispatch = useDispatch()
  const isPersonalize = useSelector((state: RootState) => state.articles.isPersonalize)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/preferences`)
      .then((response) => response.json())
      .then((data) => setPreferences(data.preference))
      .catch((error) => console.error('Error fetching preferences:', error))

    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/myPreference`, {
      headers: {
        Authorization: `Bearer ${getCookie()}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedAuthors(data.authors || [])
        setSelectedSources(data.sources || [])
      })
      .catch((error) => console.error('Error fetching my preferences:', error))
  }, [dispatch])

  useEffect(() => {
    const fetchArticles = async () => {
      const filters = {
        authors: selectedAuthors.join(','),
        sources: selectedSources.join(',')
      }
      const queryParams = new URLSearchParams(
        Object.entries(filters).filter(([, value]) => value)
      ).toString()

      const url = isPersonalize
        ? `${process.env.REACT_APP_BASE_URL}/api/v1/getPersonalizedFeed?${queryParams}`
        : `${process.env.REACT_APP_BASE_URL}/api/v1/articles`

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${getCookie()}`,
          },
        })

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

        const data = await response.json()
        dispatch(setArticles(data))
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    }

    fetchArticles()
  }, [isPersonalize, selectedAuthors, selectedSources, dispatch])

  const handleBadgeToggle = (value: string, type: 'authors' | 'sources') => {
    if (type === 'authors') {
      setSelectedAuthors((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      )
    } else {
      setSelectedSources((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      )
    }
  }

  const updatePreferences = async (values: Preference) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/savePreference`, {
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
    setTimeout(() => {
      updatePreferences({ authors: selectedAuthors, sources: selectedSources })
    }, 500)
  }, [selectedAuthors, selectedSources])

  return (
    <Formik initialValues={initialValues} onSubmit={() => { }}>
      {({ setFieldValue }) => (
        <FormikForm className='p-4'>
          <h3 className='mb-4'>Personalize Feed</h3>
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
                    handleBadgeToggle(value, 'sources')
                  }}
                >
                  <option value=''>Select a Source</option>
                  {preferences.sources.map((source, idx) => (
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
                      onClick={() => handleBadgeToggle(source, 'sources')}
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
                    handleBadgeToggle(value, 'authors')
                  }}
                >
                  <option value=''>Select an Author</option>
                  {preferences.authors.map((author, idx) => (
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
                      onClick={() => handleBadgeToggle(author, 'authors')}
                      style={{ cursor: 'pointer' }}
                    >
                      {author} <span>x</span>
                    </Badge>
                  ))}
                </div>
              </Form.Group>
              <Form.Check
                type='switch'
                label='Personalize Feed'
                className='w-100 text-center'
                checked={isPersonalize}
                onChange={(event) => dispatch(setPersonalize(event.target.checked))}
              />
            </Col>
          </Row>
        </FormikForm>
      )}
    </Formik>
  )
}

export default Preferences
