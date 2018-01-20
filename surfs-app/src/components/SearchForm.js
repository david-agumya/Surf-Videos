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
import PropTypes from 'prop-types'


export default class SearchForm extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            searchText: ' '
        };

    };

    handleChange(e){
        this.setState({
            searchText: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        let searchTerm = this.state.searchText;
        this.props.search(searchTerm);
        this.setState({
            searchText : ''
        })
    }


    render () {
        return(
            <Form inline onSubmit={this.handleSubmit}>
                <FormGroup controlId="formInLine">
                    <ControlLabel>Search: </ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.searchText}
                        placeholder="Surf + search Term"
                        name="Search"
                        onChange={this.handleChange}
                        bsStyle="searchInput"
                    />
                    <Button bsStyle="success"> Search </Button>
                    <FormControl.Feedback />
                    <HelpBlock>Please enter a category of surf videos you want to view.</HelpBlock>
                </FormGroup>
            </Form>
        )
    }
}

SearchForm.propTypes = {
    search : PropTypes.func.isRequired,
};
