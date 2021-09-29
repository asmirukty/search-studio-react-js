import React, {useState, useEffect} from "react";
import {Card, CardContent, Typography, Chip, Button, TableContainer, Paper, Table, TableBody, TableRow, TableCell} from "@material-ui/core";
import {makeStyles, createStyles} from "@material-ui/core/styles";
import {PeopleAlt, Place, AccessTime} from "@material-ui/icons";
import Carousel from 'react-material-ui-carousel';
import {coerceBooleanProperty} from "swiper/angular/angular/src/utils/utils";

const useStyles = makeStyles(() =>
    createStyles({
        card: {
            color: "#5A4628",
            padding: 0
        },
        header: {
            padding: '12px 16px',
            boxShadow: '0px 2px 4px 2px rgba(0, 0, 0, 0.1)'
        },
        top: {
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid #D7D2C8',
            marginBottom: 4
        },
        chip: {
            color: '#5A4628',
            backgroundColor: '#e7e1d8',
            marginRight: 4
        },
        btn: {
            color: '#5A4628',
            fontSize: 12,
            padding: '0px 8px',
            margin: 0,
            border: '1px solid #D7D2C8',
            boxShadow: '0.5px 0.5px 4px 2px rgba(0, 0, 0, 0.1)'
        },
        content: {
            padding: '12px 16px'
        },
        roomTop: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        navBtn: {
            backgroundColor: '#5A4628',
            opacity: 0.8,
            padding: 2,
            margin: 0,
        },
        navIndicator: {
            color: '#5A4628',
            opacity: 0.5,
            '&:hover': {
                color: '#5A4628',
                opacity: 1
            },
            '&:active': {
                color: '#5A4628',
                opacity: 1
            }
        },
        navActiveIndicator: {
            color: '#5A4628',
            opacity: 1
        },
        tableRow: {
            color: '#5A4628',
            border: '1px solid #D7D2C8'
        },
        cell: {
            color: '#5A4628',
            padding: 4,
            borderRight: '1px solid #D7D2C8'
        },
        cellTitle: {
            minWidth: 60,
            color: '#5A4628',
            padding: 4,
            borderRight: '1px solid #D7D2C8'
        },
        tableDesc: {
            textAlign: 'right'
        },
        reserveBtn: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#F9F5F0',
            backgroundColor: '#1D356A',
            display: 'flex',
            margin: 'auto',
            padding: '6px 12px'
        }
    }))

const items = [
    {time: 0, price: 500},
    {time: 5, price: 500},
    {time: 10, price: 500},
    {time: 15, price: 500},
    {time: 20, price: 400},
    {time: 25, price: 400},
    {time: 30, price: 400},
    {time: 35, price: 400},
]

type Prefecture = {
    id: string,
    name: string,
}

let initialPrefecture: Prefecture = {
    id: '',
    name: '',
}

type City = {
    id: string,
    name: string,
}

let initialCity: City = {
    id: '',
    name: '',
}

type Line = {
    id: string,
    name: string,
}

let initialLine: Line = {
    id: '',
    name: '',
}

type Station = {
    id: string,
    name: string,
}

let initialStation: Station= {
    id: '',
    name: '',
}

type Exit = {
    id: string,
    name: string,
}

let initialExit: Exit = {
    id: '',
    name: '',
}

type Address = {
    address: string,
    prefecture: Prefecture,
    city: City,
    line: Line,
    station: Station,
    exit: Exit,
    minutes_from_station: number,
}

let initialAddress: Address = {
    address: '',
    prefecture: initialPrefecture,
    city: initialCity,
    line: initialLine,
    station: initialStation,
    exit: initialExit,
    minutes_from_station: 0,
}

type StudioFacility = {
    name: string,
    count: number,
    price: number,
}

let initialStudioFacility: StudioFacility = {
    name: '',
    count: 0,
    price: 0,
}

type RoomImg = {
    name: string,
    description: string,
    path :string,
}

let initialRoomImg: RoomImg = {
    name: '',
    description: '',
    path: '',
}

type RoomFacility = {
    name: string,
    count: number,
    price: number,
}

let initialRoomFacility: RoomFacility = {
    name: '',
    count: 0,
    price: 0,
}

type Amenity = {
    name: string,
    count: number,
    price: number,
}

let initialAmenity: Amenity = {
    name: '',
    count: 0,
    price: 0,
}

type Slot = {
    workload: number,
    time_begin: number,
    time_end: number,
    price: number,
    count: number,
}

let initialSlot: Slot = {
    workload: 0,
    time_begin: 0,
    time_end: 0,
    price: 0,
    count: 0,
}

type Studio = {
    studio_id: string,
    studio_name: string,
    address: Address,
    studio_facilities: StudioFacility[],
    room_name: string,
    floor_area: number,
    mirror_length: number,
    min_people: number,
    max_people: number,
    room_img: RoomImg[],
    free_cancel: boolean,
    reservation: string[],
    room_facilities: RoomFacility[],
    amenities: Amenity[],
    floor_material: string,
    slots: Slot[],
    min_reserve_minutes: number,
    reserve_url: string,
}

let initialStudio: Studio = {
    studio_id: '',
    studio_name: '',
    address: initialAddress,
    studio_facilities: [
        initialStudioFacility,
    ],
    room_name: '',
    floor_area: 0,
    mirror_length: 0,
    min_people: 0,
    max_people: 0,
    room_img: [
        initialRoomImg,
    ],
    free_cancel: false,
    reservation: [],
    room_facilities: [
        initialRoomFacility,
    ],
    amenities: [
        initialAmenity,
    ],
    floor_material: '',
    slots: [
        initialSlot,
    ],
    min_reserve_minutes: 0,
    reserve_url: '',
}

type SearchResult =  {
    total_pages: number,
    studios: Studio[],
};

let initialSearchResult: SearchResult = {
    total_pages: 0,
    studios: [
        initialStudio,
    ]
}

export default function StudioResult() {
    const classes = useStyles();
    const [searchResult, setSearchResult] = useState(initialSearchResult)

    const f = async () => {
        await fetch('http://localhost:3000/sample.json', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('networkError')
                }
                return response.json()
            })
            .then(response => {
                setSearchResult({
                    total_pages: response.total_pages,
                    studios:
                        response.studios.map((studio: Studio) => ({
                            studio_id: studio.studio_id,
                            studio_name: studio.studio_name,
                            address: {
                                address: studio.address.address,
                                prefecture: {
                                    id: studio.address.prefecture.id,
                                    name: studio.address.prefecture.name,
                                },
                                city: {
                                    id: studio.address.city.id,
                                    name: studio.address.city.name,
                                },
                                line: {
                                    id: studio.address.line.id,
                                    name: studio.address.line.name,
                                },
                                station: {
                                    id: studio.address.station.id,
                                    name: studio.address.station.name,
                                },
                                exit: {
                                    id: studio.address.exit.id,
                                    name: studio.address.exit.name,
                                },
                                minutes_from_station: studio.address.minutes_from_station,
                            },
                            studio_facilities: [
                                studio.studio_facilities.map((studioFacility: StudioFacility) => ({
                                    name: studioFacility.name,
                                    count: studioFacility.count,
                                    price: studioFacility.price,
                                }))
                            ],
                            room_name: studio.room_name,
                            floor_area: studio.floor_area,
                            mirror_length: studio.mirror_length,
                            min_people: studio.min_people,
                            max_people: studio.max_people,
                            room_img: [
                                studio.room_img.map((roomImg: RoomImg) => ({
                                    name: roomImg.name,
                                    description: roomImg.description,
                                    path: roomImg.path,
                                }))
                            ],
                            free_cancel: studio.free_cancel,
                            reservation: studio.reservation,
                            room_facilities: [
                                studio.room_facilities.map((roomFacility: RoomFacility) => ({
                                    name: roomFacility.name,
                                    count: roomFacility.count,
                                    price: roomFacility.price,
                                }))
                            ],
                            amenities: [
                                studio.amenities.map((amenity: Amenity) => ({
                                    name: amenity.name,
                                    count: amenity.count,
                                    price: amenity.price,
                                }))
                            ],
                            floor_material: studio.floor_material,
                            slots: [
                                studio.slots.map((slot: Slot) => ({
                                    workload: slot.workload,
                                    time_begin: slot.time_begin,
                                    time_end: slot.time_end,
                                    price: slot.price,
                                    count: slot.count,
                                }))
                            ],
                            min_reserve_minutes: studio.min_reserve_minutes,
                            reserve_url: studio.reserve_url,
                        }))

                })
            })
    };

    f();

    return (
        <div style={{padding: 24}}>
            <h3 style={{textAlign: 'center'}}>検索結果</h3>
            {
                searchResult.studios.map((row) => (
                        <Card>
                            <CardContent className={classes.card}>
                                <div className={classes.header}>
                                    <div className={classes.top}>
                                        <Typography variant='subtitle1'>{row.studio_name}</Typography>
                                        <Typography variant='caption'>
                                            <Place fontSize='small'/>
                                            {row.address.station.name}{row.address.exit.name}徒歩{row.address.minutes_from_station}分
                                        </Typography>
                                    </div>
                                    {
                                        row.studio_facilities.map(facility => (
                                            <Chip size="small" label={facility.name} className={classes.chip}/>
                                        ))
                                    }
                                </div>
                                <div className={classes.content}>
                                    <div className={classes.roomTop}>
                                        <div style={{display: 'flex'}}>
                                            <Typography variant='subtitle2'>{row.room_name}</Typography>
                                            <Typography variant='caption' style={{margin: '0px 8px'}}>⊿ {row.floor_area}m²</Typography>
                                            <PeopleAlt fontSize='small'/>
                                            <Typography variant='caption'>
                                                {row.min_people > 0 && row.min_people + "人"}
                                                ~
                                                {row.max_people > 0 && row.max_people + "人"}
                                            </Typography>
                                        </div>
                                        <Button className={classes.btn}>詳しく見る</Button>
                                    </div>
                                    <Carousel fullHeightHover={false} autoPlay={false}
                                              navButtonsAlwaysVisible
                                              navButtonsProps={{className: classes.navBtn}}
                                              indicatorIconButtonProps={{className: classes.navIndicator}}
                                              activeIndicatorIconButtonProps={{className: classes.navActiveIndicator}}>
                                        {
                                            row.room_img.map((img, index) => (
                                                <div style={{margin: 'auto', paddingTop: 50, height: 100, textAlign: 'center'}}>
                                                    <img alt={'img' + index} src={img.path}/>
                                                </div>
                                            ))
                                        }
                                    </Carousel>
                                    {
                                        row.room_facilities.map((facility) => (
                                            <Chip size="small" label={facility.name} className={classes.chip}/>
                                        ))
                                    }
                                    <TableContainer component={Paper} style={{padding: 4}}>
                                        <Table>
                                            <TableBody>
                                                <TableRow className={classes.tableRow}>
                                                    {/** TODO : ここにslotを書く **/}
                                                    <TableCell className={classes.cellTitle} size='small'>日にち</TableCell>
                                                    {items.map ((item) =>
                                                        <TableCell className={classes.cell} size='small'>{item.price}</TableCell>
                                                    )}
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <div　className={classes.tableDesc}>
                                        <Typography variant='caption'>
                                            <AccessTime fontSize='small'/>{row.min_reserve_minutes + "分~"}
                                        </Typography>
                                    </div>
                                    <Button className={classes.reserveBtn}>予約画面へ</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )
                )
            }
        </div>
    )
}