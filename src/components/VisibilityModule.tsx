import { IAddInfo } from "../model";

interface UvProps {
    addInfo: IAddInfo
}

export function VisibilityModule({ addInfo }: UvProps) {
    return (
        <div id='mobile__addInfo__visibility' className="addInfo__module">
            <h4>Visibility</h4>
            <div className="module__visibility">
                <div className="visibility__value">
                    <h1>{addInfo.visibility} <span>km</span></h1>
                </div>
            </div>
        </div>
    );
}