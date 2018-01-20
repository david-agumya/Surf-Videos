import React from 'react'
import SearchForm from './SearchForm'
import {
    PageHeader
} from 'react-bootstrap'
import PropTypes from 'prop-types'

function Header(props){
    return (
        <div>
            <PageHeader>
                Surf's App
                <small className="subText">Search for surfing related videos</small>
            </PageHeader>
            <SearchForm search={props.search}/>
        </div>
    )
}


Header.propTypes = {
    search: PropTypes.func.isRequired,
};


export default Header;
