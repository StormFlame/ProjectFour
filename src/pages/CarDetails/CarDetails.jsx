import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import * as carApi from '../../utils/car-api';
import * as serviceApi from '../../utils/service-api';
import CarCard from '../../components/CarCard/CarCard';
import UpdateCarFrom from '../../components/UpdateCarForm/UpdateCarForm';
import AddServiceForm from '../../components/AddServiceForm/AddServiceForm';
import ServicesTable from '../../components/ServicesTable/ServicesTable';
import { Grid } from "semantic-ui-react";
import PageHeader from '../../components/Header/Header';

export default function CarDetails(){
    const {id} = useParams()
    const[services, setServices] = useState([])
    const [car, setCar] = useState({
        name: '',
        make: '',
        model: '',
        year: '',
        imaegURL: '',
    })
    
    useEffect(() => {
        getCar()
        getService()
    }, [])

    async function getCar(){
        try{
            const data = await carApi.getOne(id)
            setCar(data.car)
        }catch(err){
            console.log(err)
        }
    }

    async function updateCar(carForm){
        try{
            const data = await carApi.update(carForm, id)
            getCar()
        }catch(err){
            console.log(err)
        }
    }

    async function handleAddService(newService){
        try{
            const fullService = {
                car: car,
                name: newService.name,
                cost: newService.cost,
                date: newService.date
            }
            const data = await serviceApi.create(fullService)
            setServices([...services, data.service])
        }catch(err){
            console.log(err)
        }
    }

    async function getService(){
        try{
            const data = await serviceApi.getAll(id)
            setServices([...data.services])
        }catch(err){
            console.log(err)
        }
    }

    return(
        <Grid centered >
            <Grid.Row>
                <Grid.Column>
                    <PageHeader />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <CarCard car={car}/>
                    <UpdateCarFrom car={car} handleUpdateCar={updateCar}/>
                    <AddServiceForm handleAddService={handleAddService}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={9}>
                    <ServicesTable services={services} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}