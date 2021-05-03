import React, {useState, useEffect} from 'react';
import { Form, Grid, Segment, Divider, Header } from 'semantic-ui-react'


export default function AddServiceForm(props){
    const [service, setService] = useState({
        name: '',
        cost: '',
        date: '',
        servicer: ''
    })

    function handleSubmit(e) {
        e.preventDefault();

        const newService = {
            name: service.name,
            cost: service.cost,
            date: service.date,
            servicer: service.servicer
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
                    <Header as='h3'>Add a Service</Header>
                    <Form onSubmit={handleSubmit}>
                        <label>Name of Service</label>
                        <input required onChange={handleChange} name="name" type="text" placeholder="Name"/> 
                        <Divider hidden/>
                        <label>Serviced By</label>
                        <input required onChange={handleChange} name="servicer" type="text" placeholder="Serviced By"/>
                        <Divider hidden/>

                        <label>Cost of Service</label>
                        <input required onChange={handleChange} name="cost" type="number" min="0.01" step="0.01" max="100000" placeholder="Cost"/>
                        <Divider hidden/>

                        <label>Date of Service</label>
                        <input required onChange={handleChange} name="date" type="date" placeholder="Cost"/>
                        <Divider />

                        <input required type="submit" value="Add Service"/>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}