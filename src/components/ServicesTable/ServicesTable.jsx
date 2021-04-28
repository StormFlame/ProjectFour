import React from 'react';
import { Table } from 'semantic-ui-react'

export default function ServicesTable({services}){
    return(
        <Table style={{maxWidth: 500}}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Cost</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {services.map((service) => {
                        return(
                            <Table.Row key={service._id}>
                                <Table.Cell>{service.name}</Table.Cell>
                                <Table.Cell>{service.cost}$</Table.Cell>
                                <Table.Cell>{service.date.slice(0,9)}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
    )
}