import React from 'react';
// import './SearchEngine.scss';
// import Gallery from '../Gallery';
// import { connect } from 'react-redux';
// import MenuActions from './actions';
// import GalleryActions from '../Gallery/actions';
// import { Button } from 'primereact/button';
// import { Dropdown } from 'primereact/dropdown';
import { Navbar, Nav, Form , FormControl, Button  } from 'react-bootstrap'


function Menu (){
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home" text="white">Home</Nav.Link>
                        <Nav.Link href="#link" text="white">Link</Nav.Link>

                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search user" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}


export default Menu;
