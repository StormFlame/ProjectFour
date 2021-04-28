import React, {useState, useEffect} from 'react';
import { Button, Form, Grid, Header, Image,  Segment, Dropdown } from 'semantic-ui-react'


export default function AddServiceForm(props){
    const [service, setService] = useState({
        name: '',
        cost: '',
        date: '',
    })

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData()
        formData.append('name', service.name);
        formData.append('cost', service.cost);
        formData.append('date', service.date);
        props.handleAddService(formData)
    }

    function handleChange(e) {
        setService({
            ...service,
            [e.target.name]: e.target.value
        })
    }


    return(
        <Grid>
            <Grid.Column style={{maxWidth: 450}}>
                <Segment>
                    <label>Add a Vehicle</label>
                    <Form onSubmit={handleSubmit}>
                        <label>Name of Service</label>
                        <input onChange={handleChange} name="name" type="text" placeholder="Name"/>
                        <label>Cost of Service</label>
                        <input onChange={handleChange} name="service" type="text" placeholder="Cost"/>
                        <label>Date of Service</label>
                        <input onChange={handleChange} name="date" type="date" placeholder="Cost"/>
                        <input required type="submit" value="Add Service"/>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}