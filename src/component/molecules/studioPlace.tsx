import React from "react";
import {Typography} from "@material-ui/core";
import StudioNameTextField from "../molecules/studioNameTextField";
import PlaceButton from "../molecules/placeButton";

export default function StudioPlace(props: {isWide?: boolean}) {
    const {isWide} = props;

    return (
        <>
            <Typography>場所 ※</Typography>
            <div style={isWide ? {display: 'flex', marginBottom: 8} : {}}>
                <div style={isWide ? {width: '50%'} : {marginBottom: 8}}>
                    <PlaceButton/>
                </div>
                <div style={isWide ? {width: '50%'} : {marginBottom: 8}}>
                    <StudioNameTextField/>
                </div>
            </div>
        </>
    );
}