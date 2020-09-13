import React from 'react';
import './DetailItem.css';


const DetailItem = (props) => {

    const isValueArray = Array.isArray(props.value);
    const detailValue = isValueArray ?
        <ul className="detail-value">
            {props.value.length ? props.value.map(data => <li key={data}>{data}</li>) : "NA"}
        </ul>
        : <p className="detail-value">{props.value ? props.value + "" : "NA"}</p>

    return (
        <div className={"launch-detail" + (isValueArray ? " type-list" : "")}>
            <p><b>{props.label}:</b></p>
            {detailValue}
        </div>
    );
}

export default DetailItem;