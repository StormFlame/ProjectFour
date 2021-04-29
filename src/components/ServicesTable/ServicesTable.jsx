import React, {useState} from 'react';
import { Table } from 'semantic-ui-react'

export default function ServicesTable({services, handleDeleteService}){

    const [showUpdateService, setShowUpdateService] = useState(false)

    const toggleUpdateService = () =>{
        showUpdateService ? setShowUpdateService(false) : setShowUpdateService(true)
    }

    return(
        <>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Service</Table.HeaderCell>
                        <Table.HeaderCell>Serviced By</Table.HeaderCell>
                        <Table.HeaderCell>Cost</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        {showUpdateService ? <Table.HeaderCell>Delete</Table.HeaderCell>: undefined}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {services.map((service) => {
                        return(
                            <Table.Row key={service._id}>
                                <Table.Cell>{service.name}</Table.Cell>
                                <Table.Cell>{service.servicer}</Table.Cell>
                                <Table.Cell>${service.cost}</Table.Cell>
                                <Table.Cell>{service.date.slice(0,9)}</Table.Cell>
                                {showUpdateService ? <Table.Cell><button className="ui button" onClick={()=>handleDeleteService(service._id)}>X</button></Table.Cell>: undefined}
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            <button className="ui button" onClick={toggleUpdateService}>Update History</button>
        </>
    )
}