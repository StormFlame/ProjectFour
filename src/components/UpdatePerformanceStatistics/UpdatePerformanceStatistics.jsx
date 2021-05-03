import React, {useState, useEffect} from 'react';
import { Form, Grid, Segment, Divider} from 'semantic-ui-react'


export default function UpdatePerformanceStatistics(props){
    const [perfStats, setPerfStats] = useState({
        hp: 0,
        torque: 0,
        topSpeed: 0,
        zeroSixty: 0,
    })

    function handleSubmit(e) {
        e.preventDefault();

        const newPerfStats = {
            hp: perfStats.hp ? perfStats.hp : props.car.hp,
            torque: perfStats.torque ? perfStats.torque : props.car.torque,
            topSpeed: perfStats.topSpeed ? perfStats.topSpeed : props.car.topSpeed,
            zeroSixty: perfStats.zeroSixty ? perfStats.zeroSixty : props.car.zeroSixty,
        }
        props.handleUpdatePerfStats(newPerfStats)
    }

    function handleChange(e) {
        setPerfStats({
            ...perfStats,
            [e.target.name]: e.target.value,
        })
    }

    return(
        <Grid>
            <Grid.Column>
                <Segment>
                    <Form onSubmit={handleSubmit}>
                        <label>Update Hp</label>
                        <input onChange={handleChange} name="hp" type="number" placeholder="Hp"/>
                        <Divider hidden/>
                        <label>Update Torque</label>
                        <input onChange={handleChange} name="torque" type="number" placeholder="Torque"/>
                        <Divider hidden/>
                        <label>Update Top Speed</label>
                        <input onChange={handleChange} name="topSpeed" type="number" placeholder="Top Speed"/>
                        <Divider hidden/>
                        <label>Update 0-60</label>
                        <input onChange={handleChange} name="zeroSixty" type="number" step='0.1' placeholder="0-60"/>
                        <Divider/>
                        <input required type="submit" value="Update Performance Stats"/>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}