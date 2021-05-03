import React, {useState} from 'react';
import { Table, Segment } from 'semantic-ui-react'
import UpdatePerformanceStatistics from '../../components/UpdatePerformanceStatistics/UpdatePerformanceStatistics';

export default function PerformanceStatistics({car, handleUpdatePerfStats, isUser}){
    const [showForm, setShowForm] = useState(false)

    const handleShowForm = () =>{
        showForm ? setShowForm(false) : setShowForm(true)
    }

    const handleShareStats = () => {
        car.share ? handleUpdatePerfStats({share: false}) : handleUpdatePerfStats({share: true})
    }

    return(
        <>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell >Performance Stats</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                        <Table.Row >
                            <Table.Cell>Hp: {car.hp ? car.hp : '?'} </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Torque: {car.torque ? car.torque : '?'}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Top Speed: {car.topSpeed ? car.topSpeed : '?'}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>0-60: {car.zeroSixty ? car.zeroSixty : '?'}</Table.Cell>
                        </Table.Row>
                </Table.Body>
            </Table>
            {isUser ?
                <>
                {car.share ? 
                    <button className="ui button" onClick={handleShareStats}>Make Build Privete</button> 
                :
                    <button className="ui button" onClick={handleShareStats}>Make Build Public</button>
                }
                    
                    <div className="ui divider"></div>
                    <button className="ui button" onClick={handleShowForm}>Update Performance Stats</button>
                </>
            : undefined}
            {showForm ?
                <>
                    <div className="ui divider"></div>
                    <UpdatePerformanceStatistics handleUpdatePerfStats={handleUpdatePerfStats} car={car}/>
                </>
            : undefined}
        </>
    )
}