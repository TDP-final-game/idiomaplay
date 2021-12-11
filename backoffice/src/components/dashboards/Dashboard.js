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
    },
    
    datepickerContainer: {
        display: 'flex',
        // textAlign: 'center',
    },
    
    datepickerRow: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        textAlign: 'center',
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

const getDailyAccessDataset = (data) => ({
    labels,
    datasets: [
        {
            type: 'line',
            label: 'Dataset 1',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false,
            data
        }
    ],
});

const getUserAccessDataset = (data) => ({
    labels: ['Semanal', 'Diario', 'Mensual'],
    datasets: [
        {
            label: 'Ingreso de los usuarios',
            data,
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
});


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
    const [dailyAccessData, setDailyAccessData] = useState([]);
    const [userAccessData, setUserAccessData] = useState([]);

    getDailyAccessData(startDate).then(data => setDailyAccessData(data));
    getUserAccessData(startDate).then(data => setUserAccessData(data));

    const dailyAccessDataset = getDailyAccessDataset(dailyAccessData);
    const userAccessDataset = getUserAccessDataset(userAccessData);

    return (
        <Card>
            <Row style={styles.datepickerRow}>
                <div style={styles.datepickerContainer}>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        showFullMonthYearPicker
                    />
                </div>
            </Row>
            <Row style={styles.container}>
                <Col style={styles.dashboard}>
                    <Chart type='bar' data={dailyAccessDataset}/>
                </Col>
                <Col style={styles.secondDash}>

                    <Row>
                    {/*    Missing chart */}
                    </Row>
                    <Row>
                        <Pie data={userAccessDataset} options={options}/>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
}

export default Dashboard