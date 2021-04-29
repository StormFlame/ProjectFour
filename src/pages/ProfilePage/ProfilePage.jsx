import React, {useState, useEffect} from 'react';
import { Grid, Image } from 'semantic-ui-react'
import userService from '../../utils/userService';
import PageHeader from '../../components/Header/Header';
import { useLocation } from 'react-router-dom';
import BubbleChart from '../../components/BubbleChart/BubbleChart';

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
            <h1>{profileUser.username}</h1>
            <Image src={profileUser.photoUrl ? `${profileUser.photoUrl}` : 'https://react.semantic-ui.com/images/wireframe/square-image.png'} />
            <Grid.Row>
                <Grid.Column width={3}>
                    <BubbleChart width={150} height={77} radius={40}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}