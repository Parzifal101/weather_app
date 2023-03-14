import { Chart as ChartJS, ArcElement, Legend, CategoryScale, BarElement, LinearScale } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import classes from './style/Uv.module.scss'
import { IAddInfo } from "../model";

interface UvProps {
    addInfo: IAddInfo
}

export function UvModule({ addInfo }: UvProps) {

    ChartJS.register(ArcElement, Legend, CategoryScale, LinearScale, BarElement);

    const graphData = {
        labels: ['', '', '', ''],
        datasets: [
            {
                label: 'UV Index',
                data: [6, addInfo.uv_index_max],
                backgroundColor: [
                    'rgba(255, 99, 132, 0)',
                    'rgba(255, 191, 94,1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 0)',
                    'rgba(54, 162, 235, 0)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div className={`${classes.addInfo__module} ${classes.mobile__addInfo__uv}`}>
            <h4>UV Index</h4>
            <div className={classes.module__uvIndex}>
                <span className={classes.uvIndex1}>0</span>
                <span className={classes.uvIndex2}>4</span>
                <span className={classes.uvIndex3}>6</span>
                <span className={classes.uvIndex4}>12</span>
                <div className={classes.uvIndex__graphWrapper}>
                    <div className={classes.uvIndex__graph}>
                        <div className={classes.uvIndex__shadowLine}>

                        </div>
                        <Doughnut data={graphData} />;
                        <div className={classes.uvIndex__mainNum}>
                            <span>{Math.floor(addInfo.uv_index_max)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}