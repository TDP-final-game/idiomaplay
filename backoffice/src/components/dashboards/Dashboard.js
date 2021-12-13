// import * as React from "react";
import React, { useState, useEffect, useMemo } from 'react';
import {Card} from '@material-ui/core';
import { Row, Col} from 'react-bootstrap';
import DatePicker  from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { getDailyAccessData, getUserAccessData, getDailyUnitsFinishedData, getUnitAverageResolutionTime } from '../../dataProvider/userLoginData';
import "./dashboard.css";


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
        order: 2,
    },
    
    datepickerContainer: {
        display: 'flex',
    },
    
    datepickerRow: {
        display: 'flex',
        margin: '5px',
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

const getDailyAccessDataset = (dailyAccessData, dailyUnitsFinishedData) => ({
    labels,
    datasets: [
        {
            type: 'line',
            label: 'Ingreso de los usuarios',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false,
            scaleSteps: 1,
            data: dailyAccessData,
        },
        {
            type: 'bar',
            label: 'Unidades de los usuarios',
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'white',
            borderWidth: 1,
            fill: true,
            scaleSteps: 1,
            data: dailyUnitsFinishedData,
        }
    ],
});

const getUserAccessDataset = data => ({
    labels: ['Diario', 'Semanal', 'Mensual'],
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

const optionsPie = {
    plugins: {
        legend: {
            display: true,
            position: 'bottom'
        }
    }
}

const optionsLine =  {
    responsive: true,
    hover: {
        mode: 'index',
        intersec: false
    },
    scales: {
        x: {
        title: {
            display: true,
            text: 'Día'
        }
        },
        y: {
        title: {
            display: true,
        },
        min: 0,
        ticks: {
            // forces step size to be 50 units
            stepSize: 1
        }
        }
    }
}

const Dashboard = () => {
    const startDate = useMemo(() => {
      return new Date()
    }, []);

    const [dailyAccessData, setDailyAccessData] = useState([]);
    const [userAccessData, setUserAccessData] = useState([]);
    const [dailyUnitsFinishedData, setdailyUnitsFinishedData] = useState([]);
    const [unitAverageResolutionTime, setAverageResolutionTime] = useState([]);

    const onChangeDashboard = (startDate) => {
        getDailyAccessData(startDate).then(data => setDailyAccessData(data));
        getUserAccessData(startDate).then(data => setUserAccessData(data));
        getDailyUnitsFinishedData(startDate).then(data => setdailyUnitsFinishedData(data));
        getUnitAverageResolutionTime(startDate).then(data => setAverageResolutionTime(data));
    }

    useEffect( () => {
        onChangeDashboard(startDate)
    }, [])

    const dailyAccessDataset = getDailyAccessDataset(dailyAccessData, dailyUnitsFinishedData);
    const userAccessDataset = getUserAccessDataset(userAccessData);

    return (
        <Card >
            <Row style={styles.titleRow}>
                <Row style={styles.datepickerRow}>
                    <span className="dateTitle">Mes del grafico:</span>
                </Row>
            </Row>
            <Row style={styles.datepickerRow}>
                <div style={styles.datepickerContainer}>
                    <DatePicker 
                        className="datepicker"
                        selected={startDate}
                        onChange={startDate => onChangeDashboard(startDate)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        showFullMonthYearPicker
                        minDate={new Date('11-01-2021')}
                    />
                </div>
            </Row>
            <Row style={styles.container}>
                <Col style={styles.dashboard} className="featuredItem">
                    <Chart type='bar' data={dailyAccessDataset} options={optionsLine}/>
                </Col>
                <Col style={styles.secondDash}>
                    <Row className="statItem">
                        <div>
                            <span className="featuredTitle">Promedio de resolución</span>
                            <div className="featuredMoneyContainer">
                                <span className="featuredMoney">{unitAverageResolutionTime}</span>
                            </div>
                            {/* <span className="featuredSub">Compared to last month</span> */}
                        </div>
                    </Row>
                    <Row className="pieChartItem">
                        <Pie data={userAccessDataset} options={optionsPie}/>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
}

export default Dashboard