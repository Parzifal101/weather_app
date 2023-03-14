import { IAddInfo } from "../model";

interface UvProps{
    addInfo:IAddInfo
}

export function WindModule({addInfo}:UvProps){
    return(
        <div className="addInfo__module mobile__addInfo__wind">
                <h4>Wind Status</h4>
                <div className="module__wind">
                  <h1>{addInfo.windspeed_120m}<span>km/h</span></h1>
                </div>
                <div className="module__windDir">
                  <div style={{ transform: `rotate(${addInfo.winddirection}deg)` }} className="wind__imgWrapper"><img src={process.env.PUBLIC_URL + '/img/winddir.png'} alt="" /></div>
                  <span>WIND DIRECTION</span>
                </div>
              </div>
    );
}