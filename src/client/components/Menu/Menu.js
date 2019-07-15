import React from 'react';
// import './SearchEngine.scss';
// import Gallery from '../Gallery';
// import { connect } from 'react-redux';
// import MenuActions from './actions';
// import GalleryActions from '../Gallery/actions';
// import { Button } from 'primereact/button';
// import { Dropdown } from 'primereact/dropdown';
import { Navbar, Nav, Form , FormControl, Button  } from 'react-bootstrap'
import LoginActions from "../Login/actions";
import GalleryActions from "../Gallery/actions";
import {connect} from "react-redux";
// import {NavLink} from "react-router-dom";

class Menu extends React.Component {
    render = () => (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Restr</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/" text="white">Home</Nav.Link>
                        <Nav.Link href="/err" text="white">Link</Nav.Link>
                        <Nav.Link
                            onSelect={this.props.disconnectEventHandler}
                            eventKey="disconnect"
                        >Disconnect</Nav.Link>
                    </Nav>
                    {/*<Form inline>*/}
                    {/*    <FormControl type="text" placeholder="Search user" className="mr-sm-2" />*/}
                    {/*    <Button variant="outline-success">Search</Button>*/}
                    {/*</Form>*/}
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}



const mapStateToProps = (state) => {
    return {
        username: state['login'].get('username'),
        password: state['login'].get('password'),
        message: state['login'].get('message'),
        token: state['login'].get('token')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        disconnectEventHandler: () =>{
            dispatch(LoginActions.disconnectAction());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);