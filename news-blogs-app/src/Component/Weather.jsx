/**
 * 天气组件
 * 显示指定城市的天气信息
 */
import React, { useEffect } from "react";
import axios from "axios";
import "./Weather.css";
import { useState } from "react";

const Weather = () => {
  // 天气数据
  const [data, setData] = useState({});
  // 搜索的城市名称
  const [location, setLocation] = useState("");

  /**
   * 组件挂载时获取默认位置的天气
   */
  useEffect(() => {
    const fechDefaultLocation = async () => {
      const defaultLocation = "Waterloo";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=5ee443d76f00ed7873385aa82fbbc5e1`;

      const response = await axios.get(url);
      setData(response.data);
    };

    fechDefaultLocation();
  }, []);

  /**
   * 搜索指定城市的天气
   */
  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=5ee443d76f00ed7873385aa82fbbc5e1`;

    try {
      const response = await axios.get(url);
      // 检查API返回的状态码
      if (response.data.cod !== 200) {
        setData({ notFound: true });
      } else {
        setData(response.data);
        setLocation("");
      }
    } catch (error) {
      // 处理404错误（城市未找到）
      if (error.response && error.response.status === 404) {
        setData({ notFound: true });
      } else {
        console.error("An error occurred while fetching weather data", error);
      }
    }

    console.log(data);
  };

  /**
   * 处理搜索输入框变化
   * @param {Event} e - 输入事件
   */
  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  /**
   * 处理键盘事件，按Enter键搜索
   * @param {Event} e - 键盘事件
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  /**
   * 根据天气类型返回对应的图标
   * @param {string} weatherType - 天气类型
   * @returns {JSX.Element} 天气图标
   */
  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return <i className="bx bxs-sun"></i>;
      case "Clouds":
        return <i className="bx bxs-cloud"></i>;
      case "Rain":
        return <i className="bx bxs-cloud-rain"></i>;
      case "Thunderstorm":
        return <i className="bx bxs-cloud-lightning"></i>;
      case "Snow":
        return <i className="bx bxs-cloud-snow"></i>;
      case "Haze":
      case "Mist":
        return <i className="bx bxs-cloud"></i>;
      default:
        return <i className="bx bxs-cloud"></i>;
    }
  };
  return (
    <div className="weather">
      <div className="search">
        {/* 显示当前城市名称 */}
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.name}</div>
        </div>
        {/* 搜索输入框 */}
        <div className="search-location">
          <input
            type="text"
            placeholder="Enter Location..."
            value={location}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>
      {/* 如果城市未找到，显示错误信息；否则显示天气数据 */}
      {data.notFound ? (
        <div className="not-found">Not Found 😫</div>
      ) : (
        <div className="weather-data">
          {/* 天气图标 */}
          {data.weather &&
            data.weather[0] &&
            getWeatherIcon(data.weather[0].main)}
          {/* 天气类型 */}
          <div className="weather-type">
            {data.weather ? data.weather[0].main : null}
          </div>
          {/* 温度 */}
          <div className="temp">
            {data.main ? `${Math.floor(data.main.temp)}°C` : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
