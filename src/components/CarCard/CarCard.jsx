import Raect from 'react';
import { Card,  Image, } from 'semantic-ui-react'

export default function CarCard({car, deleteCar}){
    return(
        <Card key={car._id}>
            <Card.Content>
                <Card.Header>{car.name ? car.name : 'Untitled'}</Card.Header>
                <Card.Description>{car.year} {car.make} {car.model} </Card.Description>

                <Image src={car.imageURL ? `${car.imageURL}` : 'https://react.semantic-ui.com/images/wireframe/square-image.png'} />
                
                <div className="ui divider"></div>
                
                <button className="ui button" onClick={()=>deleteCar(car._id)}>Delete</button>
            </Card.Content>
        </Card>
    )
}