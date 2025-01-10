"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [cities, setCities] = useState([]);
  const [searched, setSearched] = useState([]);

  async function getData() {
    const result = await fetch("https://countriesnow.space/api/v0.1/countries");
    const data = await result.json();
    let incomeCities = data.data.map((country) => {
      return country.cities;
    });
    incomeCities = incomeCities.flat();
    setCities(incomeCities);
  }

  useEffect(() => {
    getData();
    citySelector("Ulaanbaatar");
  }, []);

  const searchHandler = (e) => {
    const search = e.target.value;
    const filtered = cities.filter((city) => {
      return city.toLowerCase().includes(search.toLowerCase());
    });
    setSearched(filtered);
  };

  async function citySelector(city) {
    const rawData = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=a474d239e7984b44bf320539250801&q=${city}`
    );
    const weatherData = await rawData.json();
    return weatherData;
  }

  return (
    <div className="h-screen w-screen bg-[#F3F4F6] relative flex items-center justify-center gap-20">
      <div className="absolute top-20 left-40">
        <div className="flex">
          <label className="bg-[#FFF] flex justify-center items-center pl-4 rounded-l-[48px]">
            <svg
              width="40"
              height="40"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.2">
                <path
                  d="M31.5098 28.51H29.9298L29.3698 27.97C31.3298 25.69 32.5098 22.73 32.5098 19.51C32.5098 12.33 26.6898 6.51001 19.5098 6.51001C12.3298 6.51001 6.50977 12.33 6.50977 19.51C6.50977 26.69 12.3298 32.51 19.5098 32.51C22.7298 32.51 25.6898 31.33 27.9698 29.37L28.5098 29.93V31.51L38.5098 41.49L41.4898 38.51L31.5098 28.51ZM19.5098 28.51C14.5298 28.51 10.5098 24.49 10.5098 19.51C10.5098 14.53 14.5298 10.51 19.5098 10.51C24.4898 10.51 28.5098 14.53 28.5098 19.51C28.5098 24.49 24.4898 28.51 19.5098 28.51Z"
                  fill="black"
                />
              </g>
            </svg>
          </label>
          <input
            type="text"
            className="w-[400px]  text-[#000] p-[12px] text-2xl outline-none font-bold rounded-r-[48px]"
            onChange={searchHandler}
          />
        </div>
        <div>
          {searched.length > 0 &&
            searched.slice(0, 4).map((city, index) => (
              <p
                onClick={() => citySelector(city)}
                className="text-[#000]"
                key={index}
              >
                {city}
              </p>
            ))}
        </div>
      </div>
      <div className="w-[400px] h-[800px] bg-[#FFF] rounded-[48px]">
        <h3></h3>
      </div>
      <div className="w-[400px] h-[800px] bg-[#0F141E] rounded-[48px]"></div>
    </div>
  );
}
