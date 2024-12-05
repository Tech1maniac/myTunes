import React from "react";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import './Header.css'

const Header = ({ searchInput, setSearchInput, search }) => {
    return (
        <header className="app-header">
            <Container>
                <InputGroup className="mb-3" size="">
                    <FormControl
                        className="search-bar"
                        placeholder="Search for Track..."
                        type="input"
                        value={searchInput}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") search();
                        }}
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                    <Button onClick={search} className="btn">Search</Button>
                </InputGroup>
            </Container>
        </header>
    );
};

export default Header;
