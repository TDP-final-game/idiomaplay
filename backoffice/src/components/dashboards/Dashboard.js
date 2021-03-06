// import * as React from "react";
import React, { useState, useEffect } from 'react';
import { Card } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
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
    registerables as registerablesJS
} from 'chart.js';
import { Chart, Pie } from 'react-chartjs-2';
ChartJS.register(...registerablesJS);

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
        fontFamily: 'Helvetica',
        order: 1,
        alignItems: 'stretch'
    },
    secondDash: {
        width: '25%',
        flexDirection: 'row',
        fontFamily: 'Helvetica',
        order: 2,
    },

    datepickerContainer: {
        display: 'flex',
        flexDirection: 'row'
    },

    datepickerRow: {
        display: 'flex',
        margin: '15px',
        // justifyContent: 'center',
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

// const labels = range(1, 30);

const getDailyAccessDataset = (dailyAccessData, dailyUnitsFinishedData) => ({
    labels: [...Object.keys(dailyAccessData)].map(key => {
        let numberKey = Number(key);
        return numberKey += 1;
    }),
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

const optionsLine = {
    responsive: true,
    hover: {
        mode: 'index',
        intersec: false
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'D??a'
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
    const [dailyAccessData, setDailyAccessData] = useState([]);
    const [userAccessData, setUserAccessData] = useState([]);
    const [dailyUnitsFinishedData, setdailyUnitsFinishedData] = useState([]);
    const [unitAverageResolutionTime, setAverageResolutionTime] = useState(0);

    const onChangeDashboard = (startDate) => {
        getDailyAccessData(startDate).then(data => setDailyAccessData(data));
        getUserAccessData(startDate).then(data => setUserAccessData(data));
        getDailyUnitsFinishedData(startDate).then(data => setdailyUnitsFinishedData(data));
        getUnitAverageResolutionTime(startDate).then(data => setAverageResolutionTime(data));
    }

    const [startDate, setStartDate] = useState(new Date())

    useEffect(() => {
        onChangeDashboard(startDate)
    }, [startDate])

    const dailyAccessDataset = getDailyAccessDataset(dailyAccessData, dailyUnitsFinishedData);
    const userAccessDataset = getUserAccessDataset(userAccessData);


    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const locale = {
        localize: {
            month: n => months[n]
        },
        formatLong: {}
    }

    const millisToMinutesAndSeconds = millis => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    return (
        <Card >
            <Row style={styles.titleRow}>
                <Col style={styles.datepickerRow}>
                    <span className="dateTitle">Mes del grafico</span>
                </Col>
                <Col style={styles.datepickerRow}>
                    <div style={styles.datepickerContainer}>
                        <DatePicker
                            className="datepicker"
                            locale={locale}
                            selected={startDate}
                            onChange={startDate => setStartDate(startDate)}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            showFullMonthYearPicker
                            minDate={new Date('11-01-2021')}
                        />
                    </div>
                </Col>
            </Row>

            <Row style={styles.container}>
                <Col style={styles.dashboard} className="featuredItem">
                    <Chart type='bar' data={dailyAccessDataset} options={optionsLine} />
                </Col>
                <Col style={styles.secondDash}>
                    <Row className="statItem">
                        <div>
                            <span className="featuredTitle">Promedio de resoluci??n</span>
                            <div className="featuredMoneyContainer">
                                <span className="featuredMoney">{millisToMinutesAndSeconds(unitAverageResolutionTime)} en minutos</span>
                            </div>
                        </div>
                    </Row>
                    <Row className="pieChartItem">
                        <Pie data={userAccessDataset} options={optionsPie} />
                    </Row>
                </Col>
            </Row>
        </Card>
    );
}

export default Dashboard
