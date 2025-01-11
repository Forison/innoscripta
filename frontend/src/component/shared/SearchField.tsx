import React, { useState } from 'react';
import { InputGroup, FormControl, Button, Col, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { setArticles } from '../redux/articleSlice';

const SearchField: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sourceName, setSourceName] = useState<string>('');
  const [publishedAt, setPublishedAt] = useState<string>('');
  const dispatch = useDispatch();

  const handleSearch = async () => {
    // Build query parameters
    const filters = {
      keyword: query,
      category: selectedCategory,
      source_name: sourceName,
      publishedAt,
    };

    const queryParams = new URLSearchParams(
      Object.entries(filters).filter(([, value]) => value) // Include only non-empty filters
    ).toString();

    try {
      const response = await fetch(`http://localhost:8000/api/v1/search?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(setArticles(data));
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <Col xs={12} md={12} lg={10} className='p-0 mb-3'>
      <InputGroup className='mb-3'>
        <FormControl
          placeholder='Search by keyword'
          aria-label='Search by keyword'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Category filter dropdown */}
        <Form.Select
          aria-label='Category'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value=''>Select Category</option>
          <option value='Technology'>Technology</option>
          <option value='Health'>Health</option>
          <option value='Business'>Business</option>
          {/* Add more categories as needed */}
        </Form.Select>

        {/* Source name filter */}
        <FormControl
          placeholder='Source Name'
          aria-label='Source Name'
          value={sourceName}
          onChange={(e) => setSourceName(e.target.value)}
        />

        {/* Date range filters */}
        <FormControl
          type='date'
          placeholder='Published At'
          aria-label='Start Date'
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
        />

        {/* Search button */}
        <InputGroup.Text as='button' onClick={handleSearch}>
          <FaSearch />
        </InputGroup.Text>
      </InputGroup>
    </Col>
  );
};

export default SearchField;
