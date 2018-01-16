/*
 import React, { Component } from 'react';

 export default class SearchForm extends Component {

 state = {
 searchText: ''
 };

 onSearchChange = e => {
 this.setState({ searchText: e.target.value });
 };

 handleSubmit = e => {
 e.preventDefault();
 this.props.onSearch(this.state.searchText);
 e.currentTarget.reset();
 };

 render() {
 return (
 <form className="search-form" onSubmit={this.handleSubmit} >
 <label className="is-hidden" htmlFor="search">Search</label>
 <input type="search"
 onChange={this.onSearchChange}
 name="search"
 placeholder="Search..." />
 <button type="submit" id="submit" className="search-button"><i className="material-icons icn-search">search</i></button>
 </form>
 );
 }
 }

 import {
 Form,
 FormGroup,
 FormControl,
 Button
 } from 'react-bootstrap'

 function SearchForm(props){
 return(
 <Form inline>
 <FormGroup controlId="formInLineEmail">
 <FormControl type="search" placeholder="surf + ...." />
 </FormGroup>
 {' '}
 <Button type="submit">
 Search
 </Button>
 </Form>
 )
 }

 */

import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel,
    HelpBlock
} from 'react-bootstrap'
import '../App.css'

export default class SearchForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText: ' '
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(e){
        this.setState({
            value: e.target.value
        });
    }


    render () {
        return(
            <Form inline>
                <FormGroup controlId="formInLine">
                    <ControlLabel>Search: </ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.searchText}
                        placeholder="Search Surf + search Term"
                        name="Search"
                        onChange={this.handleChange}
                    />
                    <button type="submit" id="submit" className="search-button">Search</button>
                    <FormControl.Feedback />
                    <HelpBlock>Please enter a category of surf videos you want to view.</HelpBlock>
                </FormGroup>
            </Form>
        )
    }
}
