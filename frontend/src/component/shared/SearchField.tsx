import React, { useState } from 'react'
import { InputGroup, FormControl, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { FaSearch } from 'react-icons/fa'
import { setArticles } from '../redux/articleSlice'

const SearchField: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const [sourceName, setSourceName] = useState<string>('')
  const [publishedAt, setPublishedAt] = useState<string>('')
  const dispatch = useDispatch()

  const handleSearch = async () => {
    const filters = {
      keyword: query,
      source_name: sourceName,
      publishedAt,
    }

    const queryParams = new URLSearchParams(
      Object.entries(filters).filter(([, value]) => value)
    ).toString()

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/search?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      dispatch(setArticles(data))
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  }

  return (
    <Col xs={12} md={12} lg={10} className='p-0'>
      <InputGroup className='mb-3'>
        <FormControl
          placeholder='Search by keyword'
          aria-label='Search by keyword'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <FormControl
          placeholder='Source Name'
          aria-label='Source Name'
          value={sourceName}
          onChange={(e) => setSourceName(e.target.value)}
        />

        <FormControl
          type='date'
          placeholder='Published At'
          aria-label='Start Date'
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
        />

        <InputGroup.Text as='button' onClick={handleSearch}>
          <FaSearch />
        </InputGroup.Text>
      </InputGroup>
    </Col>
  )
}

export default SearchField
