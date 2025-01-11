import React, { useState } from 'react';
import { InputGroup, FormControl, Button, Col, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { setArticles } from '../redux/articleSlice';

const SearchField: React.FC = () => {
  const [query, setQuery] = useState<string>(''); // Search keyword
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Filter: Category
  const [sourceName, setSourceName] = useState<string>(''); // Filter: Source name
  const [startDate, setStartDate] = useState<string>(''); // Filter: Start date
  const [endDate, setEndDate] = useState<string>(''); // Filter: End date
  const dispatch = useDispatch();

  const handleSearch = async () => {
    // Build query parameters
    const filters = {
      keyword: query,
      category: selectedCategory,
      source_name: sourceName,
      startDate,
      endDate,
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
      console.log('Search results:', data);
      dispatch(setArticles(data)); // Dispatch results to Redux store
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <Col xs={12} className="p-0 mb-3">
      <InputGroup className="mb-3">
        {/* Keyword search input */}
        <FormControl
          placeholder="Search by keyword"
          aria-label="Search by keyword"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Category filter dropdown */}
        <Form.Select
          aria-label="Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Business">Business</option>
          {/* Add more categories as needed */}
        </Form.Select>

        {/* Source name filter */}
        <FormControl
          placeholder="Source Name"
          aria-label="Source Name"
          value={sourceName}
          onChange={(e) => setSourceName(e.target.value)}
        />

        {/* Date range filters */}
        <FormControl
          type="date"
          placeholder="Start Date"
          aria-label="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <FormControl
          type="date"
          placeholder="End Date"
          aria-label="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        {/* Search button */}
        <InputGroup.Text as="button" onClick={handleSearch}>
          <FaSearch />
        </InputGroup.Text>
      </InputGroup>
    </Col>
  );
};

export default SearchField;
