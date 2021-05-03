import React, {useState, useEffect} from 'react';
import * as carApi from '../../utils/car-api';
import CarGrid from '../../components/CarGrid/CarGrid';
import {  Grid } from 'semantic-ui-react'
import PageHeader from '../../components/Header/Header';

export default function CarBuilds({user, handleLogout}){

    const [cars, setCars] = useState([])

    async function getCars(){
        try{
            const data = await carApi.getBuilds();
            console.log(data.cars)
            setCars([...data.cars])
        }catch(err){
            console.log(err, ' error')
        }
    }
    
    useEffect(() => {
        getCars()
    }, [])

    return(
        <>
            <Grid centered>
                <Grid.Row>
                    <Grid.Column>
                        <PageHeader handleLogout={handleLogout} user={user}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={9}>
                        <CarGrid cars={cars} isProfile={true}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}