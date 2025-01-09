import React, { useState } from 'react';
import { InputGroup, FormControl, Button, Col } from 'react-bootstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchField: React.FC = () => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <Col xs={12} lg={7} className="p-0 offset-lg-3 mb-3">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search"
          aria-label="Search"
          value={query}
          onChange={handleInputChange}
        />
        <InputGroup.Text>
          {!query ? (
            <FaSearch />
          ) : (
            <Button variant="link" onClick={clearSearch} className="p-0">
              <FaTimes />
            </Button>
          )}
        </InputGroup.Text>
      </InputGroup>
    </Col>
  );
};

export default SearchField;
