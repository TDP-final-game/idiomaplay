// import * as React from "react";
import React, { useState } from 'react';
import {Card} from '@material-ui/core';
import { Row, Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { getDailyAccessData, getUserAccessData } from '../../dataProvider/userLoginData';


import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
} from 'chart.js';
import {Chart, Pie} from 'react-chartjs-2';
import faker from 'faker';

const styles = {

    container: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row'
    },
    dashboard: {
        margin: '4px',
        width: '70%',
        padding: '5px',
        borderRadius: '7pt',
        // background: 'red',
        order: 1,
        alignItems: 'stretch'
    },
    secondDash: {
        width: '25%',
        flexDirection: 'row',
        // borderRadius: '7pt',
        // background: 'blue',
        order: 2,
    }
}


ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
);

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

ChartJS.register(ArcElement, Tooltip, Legend);

const labels = range(1, 30);

export const dataPrincipal = {
    labels,
    datasets: [
        {
            type: 'line',
            label: 'Dataset 1',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false,
            data: await getDailyAccessData(),
        },
        // {
        //     type: 'bar',
        //     label: 'Dataset 2',
        //     backgroundColor: 'rgb(75, 192, 192)',
        //     data: labels.map(() => faker.datatype.number({min: 0, max: 100})),
        //     borderColor: 'white',
        //     fill: false,
        //     borderWidth: 2,
        // }
    ],
};

export const dataSecondary = {
    labels: ['Semanal', 'Diario', 'Mensual'],
    datasets: [
        {
            label: '# of Votes',
            data: await getUserAccessData(),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
        },
    ],
};


const options = {
    plugins: {
        legend: {
            display: true,
            position: 'right'
        }
    }
}

const Dashboard = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    return (
            <Card>
                <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    isClearable={true}
                />
                <Row style={styles.container}>
                    <Col style={styles.dashboard}>
                        <Chart type='bar' data={dataPrincipal}/>
                    </Col>
                    <Col style={styles.secondDash}>

                        <Row>
                        {/*    Missing chart */}
                        </Row>
                        <Row>
                            <Pie data={dataSecondary} options={options}/>
                        </Row>
                    </Col>
                </Row>
            </Card>
    );
}

export default Dashboard