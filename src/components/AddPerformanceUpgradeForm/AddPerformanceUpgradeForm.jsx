import React, {useState, useEffect} from 'react';
import { Form, Grid, Header, Image,  Segment, Divider } from 'semantic-ui-react'


export default function AddPerformanceUpgradeForm(props){
    const [performanceUpgrade, setPerformanceUpgrade] = useState({
        part: '',
        brand: '',
        cost: '',
    })

    function handleSubmit(e) {
        e.preventDefault();

        const newPerformanceUpgrade = {
            part: performanceUpgrade.part,
            brand: performanceUpgrade.brand,
            cost: performanceUpgrade.cost,
        }

        props.handleAddPerformanceUpgrade(newPerformanceUpgrade)
    }

    function handleChange(e) {
        setPerformanceUpgrade({
            ...performanceUpgrade,
            [e.target.name]: e.target.value
        })
    }


    return(
        <Grid>
            <Grid.Column>
                <Segment>
                    <Header as='h3'>Add a Performance Part</Header>
                    <Form onSubmit={handleSubmit}>
                        <label>Part name</label>
                        <input required onChange={handleChange} name="part" type="text" placeholder="Part Name"/> 
                        <Divider hidden/>

                        <label>Part Brand</label>
                        <input required onChange={handleChange} name="brand" type="text" placeholder="Part Brand"/>
                        <Divider hidden/>

                        <label>Part Price</label>
                        <input required onChange={handleChange} name="cost" type="number" min="0.01" step="0.01" max="100000" placeholder="Part Price"/>
                        <Divider/>

                        <input required type="submit" value="Add Part"/>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}