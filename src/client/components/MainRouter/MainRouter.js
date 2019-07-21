import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from '../Login';
import SearchEngine from "../SearchEngine";
import RestPage from "../RestPage";
import PageNotFound from "../PageNotFound/PageNotFound";
import Menu from "../Menu";
import AddReview from "../AddReview";

import LoginActions from "../Login/actions";

import GalleryActions from "../Gallery/actions";
import {connect} from "react-redux";


class MainRouter extends React.Component {

    componentDidMount() {
        this.props.loadUserEventHandler()
    };

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Menu/>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={SearchEngine}
                        />
                        <Route
                            path="/login"
                            component={Login}
                        />
                        <Route
                            path="/rest/:id"
                            component={RestPage}
                        />
                        <Route
                            path="/addreview/:restName"
                            component={AddReview}
                        />
                        <Route
                            component={PageNotFound}
                        />

                    </Switch>
                </div>
            </BrowserRouter>
        )
    };
}
const
mapStateToProps = (state) => {
    return {

    }
};

const
mapDispatchToProps = (dispatch) => {
    return {
        loadUserEventHandler: () => {
            dispatch(LoginActions.loadUserAction());
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(MainRouter);

// export default MainRouter;
