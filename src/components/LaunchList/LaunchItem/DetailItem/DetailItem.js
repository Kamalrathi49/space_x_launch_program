import React from 'react';
import './DetailItem.css';


const DetailItem = React.memo((props) => {

    const isValueArray = Array.isArray(props.value);
    const detailValue = isValueArray ?
        <ul className="detail-value">
            {props.value.length ? props.value.map(data => <li key={data}>{data}</li>) : <li>NA</li>}
        </ul>
        : <p className="detail-value">{props.value ? props.value + "" : "NA"}</p>

    return (
        <div className={"launch-detail" + (isValueArray ? " type-list" : "")}>
            <p className="detail-label">{props.label}:</p>
            {detailValue} 
        </div>
    );
});

export default DetailItem;