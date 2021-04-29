import React, {useState, useEffect} from 'react';
import { Button, Form, Grid, Header, Image,  Segment, Dropdown } from 'semantic-ui-react'


export default function AddCarForm(props){
    const [selectedFile, setSelectedFile] = useState('')
    const [car, setCar] = useState({
        name: '',
        imageURL: '',
    })

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData()
        formData.append('photo', selectedFile ? selectedFile : props.car.imageURL)
        formData.append('name', car.name ? car.name : props.car.name)
        props.handleUpdateCar(formData)
    }

    function handleChange(e) {
        setCar({
            ...car,
            [e.target.name]: e.target.value
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
                        <input required type="submit" value="Update Car"/>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}