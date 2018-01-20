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
