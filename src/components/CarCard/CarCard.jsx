import Raect from 'react';
import { Card,  Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom';

export default function CarCard({car, deleteCar}){
    return(
            <Card centered key={car._id}>
                <Card.Content>
                    <Card.Header>{car.name ? car.name : 'Untitled'}</Card.Header>
                    <Card.Description>{car.year} {car.make} {car.model} </Card.Description>

                    <Link to={`/cars/${car._id}`}>
                        <Image src={car.imageURL ? `${car.imageURL}` : 'https://react.semantic-ui.com/images/wireframe/square-image.png'} />
                    </Link>
                    
                    <div className="ui divider"></div>
                    
                    <button className="ui button" onClick={()=>deleteCar(car._id)}>Delete</button>
                </Card.Content>
            </Card>
    )
}