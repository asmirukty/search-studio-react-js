import {createStyles, makeStyles, withStyles} from "@material-ui/core/styles";
import React from "react";
import NewDetailDialogRaw from "./newDetailDialogRaw";
import Button from "@material-ui/core/Button";
import MuiChip from "@material-ui/core/Chip";

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
        btn: {
            borderColor: '#D7D2C8',
            color: '#9B8C7D',
            fontSize: '14px',
        },
        detailBtn: {
            color: '#5A4628',
            fontSize: 14,
            padding: '0 4px',
            margin: '2px 0 8px',
            right: 0
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

interface DetailDialogProps {
    children?: React.ReactNode;
    label: string;
    btn: string;
    addFromStation: (value?: any) => void;
    addPrice: (value?: any) => void;
    addMirror: (value?: any) => void;
    addCheckedItem: (value?: any) => void;
    deleteCheckedItem: (value?: any) => void;
}

export default function NewDetailDialog(props: DetailDialogProps) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [fromStation, setFromStation] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [mirror, setMirror] = React.useState('');
    const [checkedItem, setCheckedItem] = React.useState<string[]>([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const fromStationHandleClose = (newFromStation?: string) => {
        setOpen(false);

        if (newFromStation) {
            setFromStation(newFromStation);
            props.addFromStation(newFromStation)
        }
    };

    const priceHandleClose = (newPrice?: string) => {
        setOpen(false);

        if (newPrice) {
            setPrice(newPrice);
            props.addPrice(newPrice)
        }
    };

    const mirrorHandleClose = (newMirror?: string) => {
        setOpen(false);

        if (newMirror) {
            setMirror(newMirror);
            props.addMirror(newMirror)
        }
    };

    const checkedItemHandleClose = (newItem?: string[]) => {
        setOpen(false);

        if (newItem) {
            setCheckedItem(newItem);
            props.addCheckedItem(newItem)
        }
    };

    const handleFromStationDelete = () => {
        setFromStation('');
        props.addFromStation()
    };

    const handlePriceDelete = () => {
        setPrice('');
        props.addPrice()
    };

    const handleMirrorDelete = () => {
        setMirror('');
        props.addMirror()
    }

    const handleItemDelete = (item: string) => () => {
        setCheckedItem(prevState => (
            prevState.filter((element: string) => element != item)
        ))
        props.deleteCheckedItem(item)
    }

    return (
        <div>
            {props.btn === 'btn' && (
                <Button fullWidth variant="outlined" className={classes.btn} onClick={handleClickOpen}>
                </Button>
            )}
            {props.btn === 'detailBtn' && (
                <div>
                    <div style={{marginTop: 4}}>
                        {fromStation !== '' &&
                        (<Chip size="small" label={<span>{fromStation}</span>} onDelete={handleFromStationDelete}/>)}
                        {price !== '' &&
                        (<Chip size="small" label={<span>{price}</span>} onDelete={handlePriceDelete}/>)}
                        {mirror !== '' &&
                        (<Chip size="small" label={<span>{mirror}</span>} onDelete={handleMirrorDelete}/>)}
                        {checkedItem.length !== 0 &&
                        (checkedItem.map((item) =>
                                (<Chip size="small" label={item} onDelete={handleItemDelete(item)}/>))
                        )}
                    </div>
                    <div style={{textAlign: 'right'}}>
                        <Button className={classes.detailBtn} onClick={handleClickOpen}>
                            {props.label}
                        </Button>
                    </div>
                </div>
            )}
            <NewDetailDialogRaw
                classes={{
                    paper: classes.paper,
                }}
                id="ringtone-menu"
                keepMounted
                open={open}
                fromStationOnClose={fromStationHandleClose}
                priceOnClose={priceHandleClose}
                mirrorOnClose={mirrorHandleClose}
                checkedItemOnClose={checkedItemHandleClose}
                fromStation={fromStation}
                price={price}
                mirror={mirror}
                checkedItem={checkedItem}
            />
        </div>
    );
}