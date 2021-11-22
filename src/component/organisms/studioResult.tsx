import React, {useState, useEffect} from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {initialSearchResult} from "./studioResultComponent/seachResultType";
import StudioResultCard from "./studioResultComponent/studioResultCard";
import StudioResultSearchCard from "./studioResultComponent/studioResultSearchCard";

export default function StudioResult(props: {state: any}) {
    const id: {id: string}  = useParams();
    const [searchResult, setSearchResult] = useState(initialSearchResult);

    const items = id.id.split(',');

    useEffect(() => {
        axios.get('http://localhost:3000/sample.json')
            .then(response => {
                setSearchResult(response.data)
            })
    })

    return (
        <div style={{padding: 24}}>
            <StudioResultSearchCard items={items} state={props.state}/>
            <h3 style={{textAlign: 'center'}}>
                検索結果
                <div style={{fontSize: 12}}>全{searchResult.total_pages}件</div>
            </h3>
            {
                searchResult.studios.map((row, index) => (
                    <StudioResultCard studio={row} key={index}/>
                ))
            }
        </div>
    )
}