import React, {useEffect, useState} from "react";
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
import moment from "moment";
import AddIcon from '@mui/icons-material/Add';

export const Calendar = () => {
    const [currentWeek, setCurrentWeek] = useState(moment());
    const [selectedSlot, setSelectedSlot] = useState("");

    const timeOptions = [];

    const start = moment().hour(7).minute(0);
    const end = moment().hour(22).minute(0);

    while (start.isBefore(end)) {
        timeOptions.push(start.format('HH:mm'));
        start.add(15, 'minutes');
    }


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event, day) => {
        setAnchorEl(event.currentTarget);
        setSelectedSlot(day)
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
            <div className="flex">
                <Button onClick={goToPreviousWeek}>Previous</Button>
                <Button onClick={goToNextWeek}>Next</Button>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
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
                                                // pb:0,
                                            }} key={index} align="">
                                                <div className="flex flex-col relative items-center gap-1">
                                                    <div className="min-w-full flex flex-row justify-center gap-1">
                                                        <button className="bg-red-400 min-w-full" onClick={(e) => {
                                                            handleClick(e, day)
                                                        }}>
                                                            <p>First Info</p>
                                                            <p>Second Info</p>
                                                            <p>Third Info</p>
                                                            <p>Fourth Info</p>
                                                        </button>
                                                    </div>
                                                    <Button
                                                        sx={{
                                                            alignSelf: "flex-end",
                                                            mb: 0,
                                                            width: '100%'
                                                        }}
                                                        variant="contained"
                                                        onClick={() => {
                                                            console.log("time", timeOption)
                                                            console.log("day", new Date(day).toDateString())
                                                        }}>
                                                        <AddIcon/>
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
                    <Typography sx={{p: 2}}>
                        {new Date(selectedSlot).toLocaleDateString("en-gb")}
                    </Typography>
                </Popover>
            </TableContainer>

        </div>
    );
}
