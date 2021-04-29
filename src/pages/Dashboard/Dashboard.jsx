import React, {useState, useEffect} from 'react';
import AddCarForm from '../../components/AddCarForm/AddCarForm';
import * as carApi from '../../utils/car-api';
import CarGrid from '../../components/CarGrid/CarGrid';
import {  Grid } from 'semantic-ui-react'
import PageHeader from '../../components/Header/Header';
import './Dashboard.css'

export default function Dashboard({user, handleLogout}){

    const [cars, setCars] = useState([])

    async function handleAddCar(car){
        try{
            const data = await carApi.create(car)
            setCars(cars => [data.car, ...cars])
            console.log(data.car)
        }catch(err){
            console.log(err, 'err')
        }
    }

    async function deleteCar(carID){
        try{
            const data = await carApi.deleteCar(carID)
            getCars()
        }catch(err){
            console.log(err)
        }
    }

    async function getCars(){
        try{
            const data = await carApi.getAll();
            console.log(data)
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
                <Grid centered >
                    <Grid.Row>
                        <Grid.Column>
                            <PageHeader handleLogout={handleLogout} user={user}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <AddCarForm handleAddCar={handleAddCar}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={9}>
                            <CarGrid cars={cars} deleteCar={deleteCar} isProfile={false}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        </>
    )
}