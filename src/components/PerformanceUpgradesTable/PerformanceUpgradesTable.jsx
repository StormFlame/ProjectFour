import React, {useState} from 'react';
import { Table } from 'semantic-ui-react'

export default function PerformanceUpgradesTable({performanceUpgrades, handleDeleteUpgrade, isUser}){

    const [showUpdateUpgrade, setShowUpdateUpgrade] = useState(false)

    const toggleUpdateUpgrade = () =>{
        showUpdateUpgrade ? setShowUpdateUpgrade(false) : setShowUpdateUpgrade(true)
    }

    return(
        <>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Part</Table.HeaderCell>
                        <Table.HeaderCell>Brand</Table.HeaderCell>
                        <Table.HeaderCell>Cost</Table.HeaderCell>
                        {showUpdateUpgrade ? <Table.HeaderCell>Delete</Table.HeaderCell>: undefined}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {performanceUpgrades.map((upgrade) => {
                        return(
                            <Table.Row key={upgrade._id}>
                                <Table.Cell>{upgrade.part}</Table.Cell>
                                <Table.Cell>{upgrade.brand}</Table.Cell>
                                <Table.Cell>${upgrade.cost}</Table.Cell>
                                {showUpdateUpgrade ? <Table.Cell><button className="ui button" onClick={()=>handleDeleteUpgrade(upgrade._id)}>X</button></Table.Cell>: undefined}
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            {isUser ?
            <button className="ui button" onClick={toggleUpdateUpgrade}>Update Parts</button>
            : undefined}
        </>
    )
}