import { IAddInfo } from "../model";

interface UvProps {
    addInfo: IAddInfo
}

export function SunriseModule({ addInfo }: UvProps) {
    return (
        <div className="addInfo__module mobile__addInfo__sunrise">
            <h4>Sunrise & Sunset</h4>
            <div className="module__sunrise">
                <div className="sunrise__imgWrapper"><img src={process.env.PUBLIC_URL + '/img/sunrise.png'} alt="" /></div>
                <div className="sunrise__time">
                    <p>{addInfo.sunrise.match(/[0-9]+:[0-9]+/)}</p>
                    <span>Sunrise</span>
                </div>
            </div>
            <div className="module__sunrise">
                <div className="sunrise__imgWrapper"><img src={process.env.PUBLIC_URL + '/img/sunset.png'} alt="" /></div>
                <div className="sunrise__time">
                    <p>{addInfo.sunset.match(/[0-9]+:[0-9]+/)}</p>
                    <span>Sunset</span>
                </div>
            </div>
        </div>
    );
}