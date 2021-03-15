import React, { useState } from "react";
import { Form, Input, InputGroup } from "reactstrap";
import { FaSearch } from "react-icons/fa";

export default function SearchBox({ cityValue, onSubmit }) {
  const [city, setCity] = useState(cityValue);

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(city);
      }}
    >
      <InputGroup className="bg-white rounded-pill input-group-lg">
        <FaSearch className="my-auto mx-2" color="grey" />
        <Input
          value={city}
          autoFocus={false}
          placeholder="Enter city name"
          onChange={(event) => {
            setCity(event.target.value);
          }}
          className="rounded-pill border-light"
          style={{ backgroundColor: "light" }}
        />
      </InputGroup>
    </Form>
  );
}
