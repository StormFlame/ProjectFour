import React from 'react';
import {Link} from 'react-router-dom';
import { Header, Segment } from 'semantic-ui-react';

export default function PageHeader(){
    return (
        <Segment clearing>
            <Header as='h2' >
                <Link to="/">Home</Link>
            </Header>
        </Segment>
    )
}