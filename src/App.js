import moment from 'moment';
import 'moment/locale/en-gb';
import React, {useState} from 'react';
import {
    Button,
    Paper,
    Popover,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

function App() {
    const [currentWeek, setCurrentWeek] = useState(moment());
    const timeOptions = [
        '7:00',
        '8:00',
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
    ]

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event)=>{
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'popover' : undefined;

    const goToPreviousWeek = () => {
        setCurrentWeek(currentWeek.clone().subtract(1, 'week'));
    };

    const goToNextWeek = () => {
        setCurrentWeek(currentWeek.clone().add(1, 'week'));
    };

    const renderWeekDays = () => {
        const startOfWeek = currentWeek.clone().startOf('week');
        const weekDays = [];

        for (let i = 0; i < 7; i++) {
            const day = startOfWeek.clone().add(i, 'days');
            weekDays.push(
                day
            );
        }

        return weekDays;
    };

    return (
        <div className="flex flex-col justify-center items-center ">
            {/*<div className="flex">*/}
            {/*    <Button onClick={goToPreviousWeek}>Previous</Button>*/}
            {/*    <div className="flex min-w-[80vw] justify-evenly">*/}
            {/*        {renderWeekDays()}*/}
            {/*    </div>*/}
            {/*    <Button onClick={goToNextWeek}>Next</Button>*/}
            {/*</div>*/}
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell key="empty" align=""></TableCell>
                            {
                                renderWeekDays().map((day, index) => (
                                    <TableCell key={index} align="">
                                        <div key={index} className="flex flex-col">
                                            <div className="">{day.format('ddd')}</div>
                                            <div className="">{day.format('D')}</div>
                                        </div>
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            timeOptions.map((timeOption, index) => (
                                <TableRow
                                    key={index}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {timeOption}
                                    </TableCell>
                                    {
                                        renderWeekDays().map((day, index) => (
                                            <TableCell sx={{
                                            }} key={index} align="">
                                                <div>
                                                    <div className="flex gap-1 absolute z-10" style={{}}>
                                                        <button className="bg-red-400" onClick={(e)=>{
                                                            console.log("hello")
                                                            handleClick(e)
                                                        }}>
                                                            Hello
                                                        </button>

                                                        <button className="bg-blue-400">
                                                            SOmethign else
                                                        </button>
                                                        <button className="bg-green-500 w-20">
                                                            Something Completly different
                                                        </button>
                                                    </div>
                                                    <Button sx={{
                                                        position: 'relative',
                                                        top:0,
                                                        minWidth: '200px',
                                                        width:'100%',
                                                        minHeight: '80px',
                                                    }} variant="contained" onClick={() => {
                                                        console.log("time", timeOption)
                                                        console.log("day", new Date(day).toDateString())
                                                    }}>

                                                    </Button>
                                                </div>


                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Typography sx={{ p: 2 }}>Hello</Typography>
                </Popover>
            </TableContainer>
        </div>
    );
}

export default App;
