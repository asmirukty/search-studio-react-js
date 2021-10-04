import {createStyles, makeStyles, withStyles} from "@material-ui/core/styles";
import React from "react";
import Button from "@material-ui/core/Button";
import MuiChip from "@material-ui/core/Chip";
import NewAreaDialogRaw from "./newAreaDialogRaw";

const Chip = withStyles({
    root: {
        textTransform: 'none',
        color: '#5A4628',
        backgroundColor: '#e7e1d8',
        marginRight: 4
    },
    deleteIcon: {
        color: '#9B8C7D'
    }
})(MuiChip);

const useStyles = makeStyles(() =>
    createStyles({
        right: {
            textAlign: 'right'
        },
        btn: {
            borderColor: '#D7D2C8',
            color: '#9B8C7D',
            fontSize: '14px',
        },
        detailBtn: {
            color: '#5A4628',
            fontSize: 14,
            padding: '3px 4px',
            margin: '0 0 8px',
        },
        paper: {
            margin: 12,
            flexGrow: 1
        },
        span: {
            display: 'inline'
        }
    }),
);

interface AreaDialogProps {
    children?: React.ReactNode;
    label: string;
    btn: string;
}

export default function NewAreaDialog(props: AreaDialogProps) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [area, setArea] = React.useState<string[]>([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const areaHandleClose = (newArea?: string[]) => {
        setOpen(false);
        if (newArea) {
            setArea(newArea)
        }
    };

    const handleAreaDelete = (item: string) => () => {
        setArea(prevState => (
            prevState.filter((element: string) => element != item)
        ))}

    return (
        <div>
            {props.btn === 'btn' && (
                <Button fullWidth variant="outlined" className={classes.btn} onClick={handleClickOpen}>
                    {area.length === 0 ? (props.label) :
                    (area.map((item) =>
                        (<Chip size="small" label={item} onDelete={handleAreaDelete(item)}/>))
                    )}
                    </Button>
            )}
            {props.btn === 'detailBtn' && (
                <div className={classes.right}>
                    <Button className={classes.detailBtn} onClick={handleClickOpen}>
                        {props.label}
                    </Button>
                </div>
            )}
            <NewAreaDialogRaw
                classes={{
                    paper: classes.paper,
                }}
                id="ringtone-menu"
                keepMounted
                open={open}
                areaOnClose={areaHandleClose}
                area={area}
            />
        </div>
    );
}