import React from 'react'
import SearchForm from './SearchForm'
import {
    PageHeader
} from 'react-bootstrap'

function Header(props){
    return (
        <div>
            <PageHeader>
                Surf's App
                <small className="subText">Search for surfing related videos</small>
            </PageHeader>
            <SearchForm/>
        </div>
    )
}

export default Header;
