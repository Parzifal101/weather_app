import { IAddInfo } from "../model";

interface UvProps {
    addInfo: IAddInfo
}

export function HumidityModule({ addInfo }: UvProps) {
    return (
        <div id='mobile__addInfo__humidity' className="addInfo__module ">
            <h4>Humidity</h4>
            <div className="module__humidity">
                <div className="humidty_value">
                    <h1>{addInfo.humidity} <span>%</span></h1>
                    <div className="humidty__bar">
                        <div className="bar__wrapper">
                            <div style={{ height: `${100 - addInfo.humidity}%` }}></div>
                        </div>
                    </div>
                    <div className="humidity__legend">
                        <p><span>—</span> Very High</p>
                        <p><span>—</span> High</p>
                        <p><span>—</span> Normall</p>
                        <p><span>—</span> Low</p>
                    </div>
                </div>
            </div>
        </div>
    );
}