import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import * as carApi from '../../utils/car-api';
import * as serviceApi from '../../utils/service-api';
import CarCard from '../../components/CarCard/CarCard';
import UpdateCarFrom from '../../components/UpdateCarForm/UpdateCarForm';
import AddServiceForm from '../../components/AddServiceForm/AddServiceForm';
import ServicesTable from '../../components/ServicesTable/ServicesTable';
import { Grid, Button } from "semantic-ui-react";
import PageHeader from '../../components/Header/Header';
import './CarDetails.css'

export default function CarDetails({handleLogout}){
    const {id} = useParams()
    const [showUpdateForm, setShowUpdateForm] = useState(false)
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
                servicer: newService.servicer,
                cost: newService.cost,
                date: newService.date
            }
            const data = await serviceApi.create(fullService)
            setServices([...services, data.service])
        }catch(err){
            console.log(err)
        }
    }

    async function handleDeleteService(serviceId){
        try{
            const data = await serviceApi.deleteService(serviceId)
            getService()
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

    const toggleUpdateForm = () =>{
        showUpdateForm ? setShowUpdateForm(false) : setShowUpdateForm(true)
    }

    return(
        <>
                <Grid centered divided>
                    <Grid.Row>
                        <Grid.Column>
                            <PageHeader handleLogout={handleLogout}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column width={5} textAlign='center'>
                            <CarCard car={car}/>
                            <button className="ui button" onClick={toggleUpdateForm}>Update</button>
                            {showUpdateForm ? <UpdateCarFrom car={car} handleUpdateCar={updateCar}/> : ""}
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <AddServiceForm handleAddService={handleAddService}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={10} textAlign='center'>
                            <ServicesTable services={services} handleDeleteService={handleDeleteService}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        </>
    )
}