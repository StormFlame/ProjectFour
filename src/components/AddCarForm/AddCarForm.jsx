import React, {useState, useEffect} from 'react';
import { Form, Grid, Header, Segment, Divider } from 'semantic-ui-react'


export default function AddCarForm(props){
    const [makes, setMakes] = useState([])
    const [models, setModels] = useState([])
    const [selectedFile, setSelectedFile] = useState('')
    const [car, setCar] = useState({
        name: '',
        make: '',
        model: '',
        submodel: '',
        year: new Date().getFullYear(),
        imageURL: '',
    })

    useEffect(() => {
        const carsURL = 'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'

        const makeApiCall = () => {
            fetch(carsURL)
                .then((res) => res.json())
                .then((data) => {
                    const appendedData = [{MakeName: ''}, ...data.Results]
                    setMakes(appendedData)
            })
        }
        makeApiCall()
    }, [])

    useEffect(() => {
        if(car.make !== ''){
            const modelsURL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${car.make}/modelyear/${car.year ? car.year : Date().year}?format=json`
            const makeApiCall = () => {
                fetch(modelsURL)
                    .then((res) => res.json())
                    .then((data) => {
                        setModels(data.Results)
                })
            }
            
            makeApiCall()
        }
    }, [car])


    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData()
        formData.append('photo', selectedFile)
        formData.append('name', car.name)
        formData.append('year', car.year)
        formData.append('make', car.make)
        formData.append('model', car.model)
        formData.append('submodel', car.submodel)

        props.handleAddCar(formData)
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
        <Grid centered>
            <Grid.Column>
                <Segment>
                    <Header as='h3'>Add a Vehicle</Header>
                    <Form onSubmit={handleSubmit}>
                        <label>Name(Optional)</label>
                        <input onChange={handleChange} name="name" type="text" placeholder="Name"/>
                        <Divider hidden/>
                        <label>Year</label>
                        <input required onChange={handleChange} name="year" type="number" value={car.year}/>
                        <Divider hidden/>

                        <label>Make</label>
                        {makes.length <= 1 ?
                            <input onChange={handleChange} name="make" type="text" placeholder="Make"/>
                        :
                            <select required onChange={handleChange} name="make" value={car.make}>
                                {makes.map((make) => {
                                    return(<option key={make.MakeName} value={make.MakeName}>{make.MakeName}</option>)
                                    })
                                }
                            </select>
                        }
                        <Divider hidden/>

                        <label>Model</label>
                        {models.length <= 1 ?
                            <input onChange={handleChange} name="model" type="text" placeholder="Model"/>
                        : 
                            <select required onChange={handleChange} name="model" value={car.model}>
                                {models.map((model) => {
                                        return (<option value={model.Model_Name} key={model.Model_Name}>{model.Model_Name}</option>)
                                    })                    
                                }
                            </select>
                        }

                        <Divider hidden/>

                        <label>Submodel</label>
                        <input onChange={handleChange} name="submodel" type="text" placeholder="Submodel"/>
                        <Divider hidden/>

                        <label>Image(Optional)</label>
                        <Divider hidden/>

                        <input type="file" name="photo" onChange={handleFileInput}/>
                        <Divider/>

                        <input required type="submit" value="Add Car"/>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}