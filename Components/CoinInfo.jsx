import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({ image, name, symbol }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    const getCoinPrice = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`
        );
        const json = await response.json();
        console.log("Price API Response:", json);

        if (json.USD) {
          setPrice(json.USD);
        } else {
          console.warn(`Price not found for ${symbol}`);
        }
      } catch (error) {
        console.error(`Error fetching price for ${symbol}:`, error);
      }
    };

    getCoinPrice();
  }, [symbol]);

  return (
    <div>
      {price !== null ? (
        <li className="main-list" key={symbol}>
          {image ? (
            <img
              className="icons"
              src={image.startsWith("http") ? image : `https://www.cryptocompare.com${image}`}
              alt={`${name} icon`}
            />
          ) : (
            <span>No Image</span>
          )}
          <Link
              style={{ color: "White" }}
              to={`/coinDetails/${symbol}`}
              key={symbol}
            >
              {name} <span className="tab"></span> ${price.USD} USD
          </Link>
        </li>
      ) : null}
    </div>
  );
};

export default CoinInfo;
