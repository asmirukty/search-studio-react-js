import React from 'react';
import AreaTabs from "./areaDialogComponent/areaTabs";
import StudioAreaAccordions from "./areaDialogComponent/studioAreaAccordion";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NewSearchCheckbox from "./newSearchCheckbox";
import {prefItems} from "./areaDialogComponent/prefItems";
import {createStyles, makeStyles, withStyles} from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import MuiChip from "@material-ui/core/Chip";
import useCheckGroup from "../use-check-group";
import {lineItems} from "./areaDialogComponent/lineItems";
import StudioDialog from "./studioDialog";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            padding: 4,
        },
        right: {
            textAlign: 'right'
        },
        btn: {
            borderColor: '#D7D2C8',
            color: '#9B8C7D',
            fontSize: '14px',
        },
        btnChip: {
            borderColor: '#D7D2C8',
            color: '#9B8C7D',
            fontSize: '14px',
            justifyContent: 'start',
            padding: '0 5px'
        },
        wrapChip: {
            overflow: 'scroll',
            display: 'flex',
            padding: 5
        },
        detailBtn: {
            color: '#5A4628',
            fontSize: 14,
            padding: '3px 4px',
            margin: '0 0 8px',
        },
        dialogBtn: {
            backgroundColor: '#F9F5F0',
            padding: '4px 8px',
            display: 'flex',
            justifyContent: 'space-between',
        },
        dialogClose: {
            color: '#5A4628',
            minWidth: 20,
            padding: 0
        },
        dialogOk: {
            color: '#5A4628',
            fontSize: 14,
            fontWeight: 'bold',
            minWidth: 20,
            padding: '0 4px'
        },
        content: {
            color: "#5A4628",
            padding: 0,
            boxShadow: '0px 4px 8px -2px rgba(0, 0, 0, 0.1)inset'
        },
        width: {
            width: '100%',
        },
    }));

const Accordion = withStyles({
    root: {
        boxShadow: 'none',
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles( {
    root: {
        paddingLeft: 8,
        minHeight: 16,
        color: '#5A4628',
        borderTop: '1px solid #D7D2C8',
        '&$expanded': {
            minHeight: 16,
        }
    },
    content: {
        margin: 0,
        '&$expanded': {
            margin: 0
        }
    },
    expandIcon: {
        color: '#5A4628',
        padding: '5px',
        margin: '0 -5px 0 0'
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles( {
    root: {
        padding: '0 24px',
        display: 'flex',
        flexWrap: 'wrap',
    },
})(MuiAccordionDetails);

const Chip = withStyles({
    root: {
        textTransform: 'none',
        color: '#5A4628',
        backgroundColor: '#e7e1d8',
        marginRight: 4,
    },
    deleteIcon: {
        color: '#9B8C7D'
    }
})(MuiChip);

interface PlaceDialogProps {
    pref: any[],
    city: any[],
    line: any[],
    station: any[],
    changePref: (value: any[]) => void;
    changeCity: (value: any[]) => void;
    changeLine: (value: any[]) => void;
    changeStation: (value: any[]) => void;
    deletePref: (value: any) => void;
    deleteCity: (value: any) => void;
    deleteLine: (value: any) => void;
    deleteStation: (value: any) => void;
}

export default function PlaceDialog(props: PlaceDialogProps) {
    const classes = useStyles()
    const [pref, city, checkedPref, checkedCity, unCheckedPref, unCheckedCity, deletePref, deleteCity] = useCheckGroup(props.pref, props.city, props.deletePref, props.deleteCity)
    const [line, station, checkedLine, checkedStation, unCheckedLine, unCheckedStation, deleteLine, deleteStation] = useCheckGroup(props.line, props.station, props.deletePref, props.deleteCity)

    return (
        <StudioDialog
            funcs={[props.changePref, props.changeCity, props.changeLine, props.changeStation]}
            state={[pref, city, line, station]}
            labelCheck={pref.length === 0 && city.length === 0 && line.length === 0 && station.length === 0}
            label={'エリア/沿線、駅を選択'}
            chips={
                <div>
                    {
                        prefItems.map((prefItem) =>
                            prefItem.items.map((item) =>
                                pref.includes(item.pref) ?
                                    <Chip size='small' key={item.pref.id} label={item.pref.name}
                                          onDelete={deletePref(item.pref, item.cities)}/>
                                    :
                                    item.cities.map((c) =>
                                        city.includes(c) &&
                                        <Chip size='small' key={c.id} label={c.name} onDelete={deleteCity(c)}/>
                                    )
                            )
                        )
                    }
                    {
                        lineItems.map((lineItem) =>
                        lineItem.items.map((item) =>
                        line.includes(item.line) ?
                        <Chip size='small' key={item.line.id} label={item.line.name}
                        onDelete={deleteLine(item.line, item.stations)}/>
                        :
                        item.stations.map((s) =>
                        station.includes(s) &&
                        <Chip size='small' key={s.id} label={s.name} onDelete={deleteStation(s)}/>
                        )
                        )
                        )
                    }
                </div>}
            content={
                <AreaTabs
                    area={
                        prefItems.map((areaItem,index) =>
                            <StudioAreaAccordions area={areaItem.area} key={areaItem.area}>
                                <div className={classes.width}>
                                    {
                                        areaItem.items.map((item) =>
                                            <Accordion key={item.pref.id}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls={`additional-actions-${item.pref.id}-content`}
                                                    id={`additional-actions-${item.pref.id}-header`}
                                                >
                                                    <NewSearchCheckbox
                                                        item={item.pref}
                                                        itemName={item.pref.name}
                                                        key={item.pref.id}
                                                        pref
                                                        checked={pref.includes(item.pref)}
                                                        itemChecked={checkedPref(item.cities)}
                                                        itemUnChecked={unCheckedPref(item.cities)}
                                                    />
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    {
                                                        item.cities.map((c) => (
                                                            <NewSearchCheckbox
                                                                item={c}
                                                                itemName={c.name}
                                                                key={c.id}
                                                                checked={city.includes(c)}
                                                                itemChecked={checkedCity(item.pref, item.cities)}
                                                                itemUnChecked={unCheckedCity(item.pref)}/>
                                                        ))
                                                    }
                                                </AccordionDetails>
                                            </Accordion>
                                        )
                                    }
                                </div>
                            </StudioAreaAccordions>
                        )
                    }
                    line={
                        lineItems.map((lineItem) =>
                            <StudioAreaAccordions area={lineItem.area} key={lineItem.area}>
                                <div className={classes.width}>
                                    {
                                        lineItem.items.map((item) =>
                                            <Accordion key={item.line.id}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls={`additional-actions-${item.line.id}-content`}
                                                    id={`additional-actions-${item.line.id}-header`}
                                                >
                                                    <NewSearchCheckbox
                                                        item={item.line}
                                                        itemName={item.line.name}
                                                        key={item.line.id}
                                                        pref
                                                        checked={line.includes(item.line)}
                                                        itemChecked={checkedLine(item.stations)}
                                                        itemUnChecked={unCheckedLine(item.stations)}
                                                    />
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    {
                                                        item.stations.map((s) => (
                                                            <NewSearchCheckbox
                                                                item={s}
                                                                itemName={s.name}
                                                                key={s.id}
                                                                checked={station.includes(s)}
                                                                itemChecked={checkedStation(item.line, item.stations)}
                                                                itemUnChecked={unCheckedStation(item.line)}/>
                                                        ))
                                                    }
                                                </AccordionDetails>
                                            </Accordion>
                                        )
                                    }
                                </div>
                            </StudioAreaAccordions>
                        )
                    }/>
            }/>
    )
}