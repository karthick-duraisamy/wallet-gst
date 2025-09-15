import React,{useEffect} from "react";


type StatusCountProps = {
  statusApi: any; // you can replace `any` with the correct type of your API data
};

const StatusCount:React.FC<StatusCountProps> = (statusApi:any) =>{
    return(
        <div className="cls-status-counts">
            <div className="cls-status">
                {statusApi?.statusApi?.map((item: any) => (
                    <div className="cls-status-item">
                        <span className="cls-status-label">{item.action} :</span>
                        <span className="cls-status-value">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default StatusCount;


