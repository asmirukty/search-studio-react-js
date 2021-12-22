import React, {useEffect} from "react";
import {Button, Paper} from "@material-ui/core";
import {makeStyles, createStyles} from "@material-ui/core/styles";
import StudioQueryChip from "../molecules/studioQueryChip";
import OutlineButton from "../atoms/outlineButton";
import {useRecoilState, useRecoilValue} from "recoil";
import {dateOpenState, detailOpenState, placeOpenState, spaceOpenState, studioSearchPaperOpenState} from "../atom";
import BoldTypography from "../atoms/boldTypography";

const useStyles = makeStyles(() =>
    createStyles({
        paper: {
            color: "#5A4628",
            margin: '0 auto 8px',
            padding: '4px 6px 2px 8px',
            minWidth: 240,
            maxWidth: 360,
            height: 34,
            boxShadow:'4px 4px 4px #F9F5F0',
        },
        content: {
            minWidth: 240,
            display: 'flex',
            alignItems: 'center'
        },
        typography: {
            minWidth: 60,
        },
        chip: {
            overflow: 'scroll',
            width: '100%',
            margin: '0 4px'
        },
        btn: {
            padding: 0,
            margin: 4,
            minWidth: 48,
            fontWeight: 'bold',
            color: '#F9F5F0',
            backgroundColor: '#1D356A',
            '&.Mui-disabled': {
                color: '#F9F5F0',
                opacity: .6
            },
            '&:hover': {
                color: '#F9F5F0',
                backgroundColor: '#1D356A',
                opacity: .8
            }
        }
    })
);

export default function StudioQueryPaper(props: {isWide?: boolean}) {
    const classes = useStyles();
    const {isWide} = props;
    const [open, setOpen] = useRecoilState(studioSearchPaperOpenState);
    const placeOpen = useRecoilValue(placeOpenState);
    const spaceOpen = useRecoilValue(spaceOpenState);
    const dateOpen = useRecoilValue(dateOpenState);
    const detailOpen = useRecoilValue(detailOpenState);

    useEffect(() => {
        if (placeOpen || spaceOpen || dateOpen || detailOpen) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [isWide])

    const handleClick = () => {
        setOpen(prevState => !prevState)
    }

    return (
        <Paper className={classes.paper}>
            <div className={classes.content}>
                <div className={classes.typography}>
                    <BoldTypography sub center>検索条件</BoldTypography>
                </div>
                <div className={classes.chip}>
                    <StudioQueryChip/>
                </div>
                {
                    !props.isWide &&
                    (open ? <OutlineButton label={'閉じる'} onClick={handleClick}/>
                        : <Button className={classes.btn} onClick={handleClick}>変更</Button>)
                }
            </div>
        </Paper>
    );
}