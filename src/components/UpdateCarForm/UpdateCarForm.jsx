import React, {useState, useEffect} from 'react';
import { Button, Form, Grid, Header, Image,  Segment, Dropdown } from 'semantic-ui-react'


export default function AddCarForm(props){
    const [selectedFile, setSelectedFile] = useState('')
    const [checked, setChecked] = useState(props.car.performance)
    console.log(props.car.performance)
    const [car, setCar] = useState({
        name: '',
        imageURL: '',
        performance: false
    })

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData()
        formData.append('photo', selectedFile ? selectedFile : props.car.imageURL)
        formData.append('name', car.name ? car.name : props.car.name)
        formData.append('performance', checked)
        props.handleUpdateCar(formData)
    }

    function handleChange(e) {
        if(e.target.name === 'performance'){
            setChecked(checked ? false : true)
        }

        setCar({
            ...car,
            [e.target.name]: e.target.value,
        })
    }

    function handleFileInput(e){
        setSelectedFile(e.target.files[0])
      }

    return(
        <Grid>
            <Grid.Column>
                <Segment>
                    <Form onSubmit={handleSubmit}>
                        <label>Update Name</label>
                        <input onChange={handleChange} name="name" type="text" placeholder="Name"/>
                        <label>Update Image</label>
                        <input type="file" name="photo" onChange={handleFileInput}/>
                        <label>Is this car a performance build? </label>
                        <input onChange={handleChange} name="performance" type="checkbox" value={checked} checked={checked}/>
                        <br/>
                        <input required type="submit" value="Update Car"/>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}