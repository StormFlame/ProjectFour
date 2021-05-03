import React, {useState, useEffect} from 'react';
import { Grid, Image, Card } from 'semantic-ui-react'
import userService from '../../utils/userService';
import PageHeader from '../../components/Header/Header';
import { useLocation } from 'react-router-dom';

export default function ProfilePage({user,handleLogout}){

    const [profileUser, setProfileUser] = useState({})

    const location = useLocation()

    async function getProfile() {
        try {

            const username = location.pathname.substring(1)
            // location.pathname returns /jimbo so we need to cut off the / using the js method substring
            // This gets the username from the url! 
            console.log(username)
            const data = await userService.getProfile(username);
            console.log(data)
            setProfileUser(() => data.user)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getProfile()

    }, [])

    return(
        <Grid centered >
            <Grid.Row>
                <Grid.Column>
                    <PageHeader handleLogout={handleLogout} user={user}/>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={8} textAlign='center'>
                    <Card centered fluid>
                        <Card.Content>
                            <Card.Header>{user.username}</Card.Header>
                        
                            <div className="ui divider"></div>
                            <Image src={profileUser.photoUrl ? `${profileUser.photoUrl}` : 'https://react.semantic-ui.com/images/wireframe/square-image.png'} />
                            
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}