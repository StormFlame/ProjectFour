import React, {useState, useEffect} from 'react';
import { Button, Form, Grid, Header, Image,  Segment, Dropdown, PopupHeader } from 'semantic-ui-react'


export default function AddServiceForm(props){
    const [service, setService] = useState({
        name: '',
        cost: '',
        date: '',
    })

    function handleSubmit(e) {
        e.preventDefault();

        const newService = {
            name: service.name,
            cost: service.cost,
            date: service.date
        }

        props.handleAddService(newService)
    }

    function handleChange(e) {
        setService({
            ...service,
            [e.target.name]: e.target.value
        })
    }


    return(
        <Grid>
            <Grid.Column>
                <Segment>
                    <label>Add a Service</label>
                    <Form onSubmit={handleSubmit}>
                        <label>Name of Service</label>
                        <input onChange={handleChange} name="name" type="text" placeholder="Name"/>
                        <label>Cost of Service</label>
                        <input onChange={handleChange} name="cost" type="number" min="0.01" step="0.01" max="100000" placeholder="Cost"/>
                        <label>Date of Service</label>
                        <input onChange={handleChange} name="date" type="date" placeholder="Cost"/>
                        <input required type="submit" value="Add Service"/>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}