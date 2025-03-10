import React from "react";
import { useState } from "react";
import "./Calendar.css";

const Calendar = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  // use to calculate how many days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // determine the first day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  console.log(currentMonth, currentYear, daysInMonth, firstDayOfMonth);

  const preMonth = () => {
    setCurrentMonth((preMonth) => (preMonth === 0 ? 11 : preMonth - 1));
    setCurrentYear((preYear) => (currentMonth === 0 ? preYear - 1 : preYear));
  };

  const nextMonth = () => {
    setCurrentMonth((preMonth) => (preMonth === 11 ? 0 : preMonth + 1));
    setCurrentYear((preYear) => (currentMonth === 11 ? preYear + 1 : preYear));
  };

  return (
    <div className="calendar">
      <div className="navigate-date">
        <h2 className="month">{monthOfYear[currentMonth]},</h2>
        <h2 className="year">{currentYear}</h2>
        <div className="buttons">
          <i className="bx bx-chevron-left" onClick={preMonth}></i>
          <i className="bx bx-chevron-right" onClick={nextMonth}></i>
        </div>
      </div>
      <div className="weekdays">
        {daysOfWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="days">
        {[...Array(firstDayOfMonth).keys()].map((_, index) => (
          <span key={`empty-${index}`}></span>
        ))}

        {/* create days of the month */}
        {[...Array(daysInMonth).keys()].map((day) => (
          <span
            key={day + 1}
            className={
              day + 1 === currentDate.getDate() &&
              currentMonth === currentDate.getMonth() &&
              currentYear === currentDate.getFullYear()
                ? "current-day"
                : ""
            }
          >
            {day + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
