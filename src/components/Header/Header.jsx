import React from 'react';
import {Link} from 'react-router-dom';
import { Header, Segment } from 'semantic-ui-react';

export default function PageHeader({user, handleLogout}){
    return (
        <Segment clearing>
            <Header as='h2' floated='left'>
                <Link to="/">Dashboard</Link>
            </Header>
            <Header as='h2' floated='right'> 
                <Link to={`/${user.username}`}>Profile </Link>          
                <Link to='' onClick={handleLogout}>Logout</Link>
            </Header>
        </Segment>
    )
}