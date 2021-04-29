import React from 'react'
import { Card  } from 'semantic-ui-react'
import CarCard from '../CarCard/CarCard';

export default function CarGrid({cars, deleteCar, isProfile}){
    return(
        <Card.Group>
            {cars.map((car) => {
                return(
                    <CarCard key={car._id} car={car} deleteCar={deleteCar} isProfile={isProfile}/>
                )
            })}
        </Card.Group>
    )
}