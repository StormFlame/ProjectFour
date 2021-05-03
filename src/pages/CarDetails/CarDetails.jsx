import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import * as carApi from '../../utils/car-api';
import * as performanceUpgradesApi from '../../utils/performanceUpgradesService';
import * as serviceApi from '../../utils/service-api';
import CarCard from '../../components/CarCard/CarCard';
import UpdateCarFrom from '../../components/UpdateCarForm/UpdateCarForm';
import AddServiceForm from '../../components/AddServiceForm/AddServiceForm';
import ServicesTable from '../../components/ServicesTable/ServicesTable';
import { Grid, Menu } from "semantic-ui-react";
import PageHeader from '../../components/Header/Header';
import './CarDetails.css'
import AddPerformanceUpgradeForm from '../../components/AddPerformanceUpgradeForm/AddPerformanceUpgradeForm';
import PerformanceUpgradesTable from '../../components/PerformanceUpgradesTable/PerformanceUpgradesTable';
import PerformanceStatistics from '../../components/PerformanceStatistics/PerformanceStatistics';
import userService from '../../utils/userService'

export default function CarDetails({user, handleLogout}){
    const {id} = useParams()
    const [isUser, setIsUser] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [showServicesTable, setShowServicesTable] = useState(true)
    const[services, setServices] = useState([])
    const[performanceUpgrades, setperformanceUpgrades] = useState([])
    const [car, setCar] = useState({
        name: '',
        make: '',
        model: '',
        year: '',
        imaegURL: '',
        performance: false
    })
    useEffect(() => {
        getCar()
        getService()
    }, [])

    useEffect(()=>{
        setIsUser(userService.isUser(car.user))
        if(!userService.isUser(car.user)){
            setShowServicesTable(false)
        }else{
            setShowServicesTable(true)
        }
    },[car])

    async function getCar(){
        try{
            const data = await carApi.getOne(id)
            setCar(data.car)
            setperformanceUpgrades([...data.car.performanceUpgrades])
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

    async function handleUpdatePerfStats(newPerfStats){
        try{
            const data = await carApi.updatePerfStats(newPerfStats, id)
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

    async function handleAddPerformanceUpgrade(newPerformanceUpgrade){
        try{
            const data = await performanceUpgradesApi.create(newPerformanceUpgrade, id)
            getCar()
        }catch(err){
            console.log(err)
        }
    }

    async function handleRemovePerformanceUpgrade(performanceUpgradeId){
        try{
            const data = await performanceUpgradesApi.removePerformanceUpgrade(performanceUpgradeId)
            getCar()
        }catch(err){
            console.log(err)
        }
    }

    const toggleUpdateForm = () =>{
        showUpdateForm ? setShowUpdateForm(false) : setShowUpdateForm(true)
    }

    const handleShowServicesTable = (show) =>{
        show ? setShowServicesTable(false) : setShowServicesTable(true)
    }

    return(
        <>
                <Grid centered divided>
                    <Grid.Row>
                        <Grid.Column>
                            <PageHeader handleLogout={handleLogout} user={user}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={car.performance ? 3 : 2}>
                       {car.performance ? 
                        <Grid.Column width={5} textAlign='center'>
                            <PerformanceStatistics car={car} handleUpdatePerfStats={handleUpdatePerfStats} isUser={isUser}/>
                        </Grid.Column>
                        : undefined}
                        <Grid.Column width={5} textAlign='center'>
                            <CarCard car={car} isProfile={true}/>

                            {isUser ?                             
                            <button className="ui button" onClick={toggleUpdateForm}>Update</button>
                            : undefined }
                            {showUpdateForm ? <UpdateCarFrom car={car} handleUpdateCar={updateCar}/> : ""}

                        </Grid.Column>
                        {isUser ?
                            <Grid.Column width={5}>
                                {showServicesTable ?
                                    <AddServiceForm handleAddService={handleAddService}/>
                                    :
                                    <AddPerformanceUpgradeForm handleAddPerformanceUpgrade={handleAddPerformanceUpgrade}/>
                                }
                            </Grid.Column>
                        : undefined}   
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={10} textAlign='center'>
                        {car.performance && isUser ?
                            <Menu pointing secondary>
                                <Menu.Item name='Services' onClick={()=>handleShowServicesTable(false)}/>
                                <Menu.Item name='Performance' onClick={()=>handleShowServicesTable(true)}/>
                            </Menu>
                            : undefined}
                            {showServicesTable ? 
                                <ServicesTable services={services} handleDeleteService={handleDeleteService} />
                                :
                                <PerformanceUpgradesTable performanceUpgrades={performanceUpgrades} handleDeleteUpgrade={handleRemovePerformanceUpgrade} isUser={isUser}/>
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        </>
    )
}