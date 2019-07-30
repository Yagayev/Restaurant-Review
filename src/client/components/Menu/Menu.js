import React from 'react';
// import './SearchEngine.scss';
// import Gallery from '../Gallery';
// import { connect } from 'react-redux';
// import MenuActions from './actions';
// import GalleryActions from '../Gallery/actions';
// import { Button } from 'primereact/button';
// import { Dropdown } from 'primereact/dropdown';
// import GalleryActions from "../Gallery/actions";
// import {NavLink} from "react-router-dom";

import { Navbar, Nav, Form , FormControl, Button  } from 'react-bootstrap'
import LoginActions from "../Login/actions";
import {connect} from "react-redux";

class Menu extends React.Component {
    render = () => (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Restr</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/" text="white">Home</Nav.Link>
                        <Nav.Link href={"/user/"+this.props.username}
                                  text="white">My profile</Nav.Link>

                        <Nav.Link href={"/submitRest"}
                                  text="white">Submit restaurant</Nav.Link>
                        <Nav.Link href={"/userSearch"}
                                  text="white">User search</Nav.Link>

                        <Nav.Link
                            onSelect={()=>this.props.disconnectEventHandler(this.props.username, this.props.token)}
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
        token: state['login'].get('token')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        disconnectEventHandler: (username, token) =>{
            dispatch(LoginActions.disconnectAction(username, token));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);