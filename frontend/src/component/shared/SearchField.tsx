import React, { useState } from 'react'
import { InputGroup, FormControl, Col, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { FaSearch } from 'react-icons/fa'
import { setArticles } from '../redux/articleSlice'
import { useNavigate } from 'react-router-dom'

const SearchField: React.FC = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [sourceName, setSourceName] = useState<string>('')
  const [publishedAt, setPublishedAt] = useState<string>('')
  const dispatch = useDispatch()

  const handleSearch = async () => {
    const filters = {
      keyword: query,
      category: selectedCategory,
      source_name: sourceName,
      publishedAt,
    }

    const queryParams = new URLSearchParams(
      Object.entries(filters).filter(([, value]) => value)
    ).toString()

    try {
      const response = await fetch(`http://localhost:8000/api/v1/search?${queryParams}`, {
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
      navigate('/newsfeed')
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

        <Form.Select
          aria-label='Category'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value=''>Select Category</option>
          <option value='Technology'>Technology</option>
          <option value='Health'>Health</option>
          <option value='Business'>Business</option>
        </Form.Select>

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
