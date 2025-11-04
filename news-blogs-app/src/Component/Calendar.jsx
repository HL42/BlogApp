/**
 * 日历组件
 * 显示当前月份的日历，支持切换月份
 */
import React from "react";
import { useState } from "react";
import "./Calendar.css";

const Calendar = () => {
  // 星期数组
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // 月份数组
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
  // 当前日期
  const currentDate = new Date();

  // 当前显示的月份（0-11）
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  // 当前显示的年份
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  // 计算当前月份的天数
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // 确定当前月份的第一天是星期几（0-6，0代表星期日）
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  console.log(currentMonth, currentYear, daysInMonth, firstDayOfMonth);

  /**
   * 切换到上一个月
   */
  const preMonth = () => {
    setCurrentMonth((preMonth) => (preMonth === 0 ? 11 : preMonth - 1));
    setCurrentYear((preYear) => (currentMonth === 0 ? preYear - 1 : preYear));
  };

  /**
   * 切换到下一个月
   */
  const nextMonth = () => {
    setCurrentMonth((preMonth) => (preMonth === 11 ? 0 : preMonth + 1));
    setCurrentYear((preYear) => (currentMonth === 11 ? preYear + 1 : preYear));
  };

  return (
    <div className="calendar">
      {/* 月份导航栏 */}
      <div className="navigate-date">
        <h2 className="month">{monthOfYear[currentMonth]},</h2>
        <h2 className="year">{currentYear}</h2>
        <div className="buttons">
          {/* 上一个月按钮 */}
          <i className="bx bx-chevron-left" onClick={preMonth}></i>
          {/* 下一个月按钮 */}
          <i className="bx bx-chevron-right" onClick={nextMonth}></i>
        </div>
      </div>
      {/* 星期标题行 */}
      <div className="weekdays">
        {daysOfWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      {/* 日期网格 */}
      <div className="days">
        {/* 填充月份第一天的空白位置 */}
        {[...Array(firstDayOfMonth).keys()].map((_, index) => (
          <span key={`empty-${index}`}></span>
        ))}

        {/* 渲染当前月份的所有日期 */}
        {[...Array(daysInMonth).keys()].map((day) => (
          <span
            key={day + 1}
            className={
              // 如果是今天，添加高亮样式
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
