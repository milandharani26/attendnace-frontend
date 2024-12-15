import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { format } from "date-fns";
import "./employeeHistory.scss";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAttendanceHistory } from "../../store/builders/attendance/attendance.builder";
import { formatDateString } from "../../utility/genricFunctions";
import { useReactToPrint } from 'react-to-print'
import ButtonCustom from "../../components/button/Button";
import { useAppDispatch } from "../../store/store";

const AttendanceCalendar = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const userAttendanceHistory = useSelector(store => store?.attendance?.attendanceHistory);

    const contentRef = useRef()

    const handleDownloadPfd = useReactToPrint({
        contentRef
    })

    const presentDates = new Set(
        userAttendanceHistory
            .filter((record) => record.title.toLowerCase() === "present")
            .map((record) => format(new Date(record.date), "yyyy-MM-dd"))
    );

    const handleDatesSet = ({ start, end }) => {
        dispatch(getAttendanceHistory({ id, start: formatDateString(start), end: formatDateString(end) }));
    }

    return (
        <div>
            <ButtonCustom onClick={handleDownloadPfd}>Pdf download</ButtonCustom>
            <Box sx={{ padding: "30px" }} ref={contentRef} className="printable-component">
                <h2>Employee Attendance Calendar</h2>
                <Box>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "", // No week or day views
                        }}
                        events={userAttendanceHistory}
                        dayCellClassNames={({ date }) =>
                            presentDates.has(format(date, "yyyy-MM-dd")) ? "present-day" : "absent-day"
                        }
                        datesSet={handleDatesSet} // Triggered when the month changes
                    />
                </Box>
            </Box>
        </div>
    );
};

export default AttendanceCalendar;
