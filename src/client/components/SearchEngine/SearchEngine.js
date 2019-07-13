import React from 'react';
import './App.scss';
import RestSearch from '../RestSearch';
import { connect } from 'react-redux';
import SearchEngineActions from './actions';
import RestSearchActions from "../RestSearch/actions";
import { Button } from 'primereact/button';

import {InputText} from 'primereact/inputtext';
import {Password} from "primereact/components/password/Password";

class SearchEngine extends React.Component {
    // componentDidMount() {
    //     // this.props.loadTagsEventHandler();
    // }

    render() {
        console.log('Search Engine props=', this.props);
        //          {/*<div className="search-root">*/}
        //       {/*  <div className="search-header">*/}
        //            <Form
        //               value={this.props.name}
        //               onChange={this.props.updateNameEventHandler}
        //               placeholder="Search"
        //             />
        //           <Button
        //               variant="secondary"
        //               onClick={() => this.props.loadRestsEventHandler(this.props.name)}
        //           >Search</Button>
        return (
            <div className="app-root">

                <div className="app-header">
                    <h2>Rests</h2>
                    <InputText value={this.props.name}
                               onChange={this.props.updateNameEventHandler}/>
                    <br/>
                    <Button
                        label="Search"
                        className="p-button-raised p-button-rounded"
                        onClick={() => this.props.loadRestsEventHandler(this.props.name)}
                    />
                </div>
                <RestSearch/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
  return {
      name: state['searchEngine'].get('name'),
      ratings: state['searchEngine'].get('ratings').toArray(),
      distanceVsScore: state['searchEngine'].get('distanceVsScore')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNameEventHandler: (e) => {
      dispatch(SearchEngineActions.updateNameAction(e.value));
    },
    loadRestsEventHandler: (searchFields) => {
      dispatch(RestSearchActions.loadRestsAction(searchFields))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchEngine);
