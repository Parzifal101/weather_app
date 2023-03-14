import { IAddInfo } from "../model";

interface UvProps {
    addInfo: IAddInfo
}

export function PressureModule({ addInfo }: UvProps) {
    return (
        <div className="addInfo__module mobile__addInfo__pres">
            <h4>Pressure</h4>
            <div className="module__pres">
                <div className="pres_value">
                    <h1>{addInfo.pressure}<span>Pa</span></h1>
                    <div className="pres__bar">
                        <div className="bar__wrapper">
                            <div style={{ height: `${100 - Math.abs(((1070 - addInfo.pressure) / 140 - 1) * 100)}%` }}></div>
                        </div>
                    </div>
                    <div className="pres__legend">
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