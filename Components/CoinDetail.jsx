import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinDetail = () => {
  const { symbol } = useParams();
  const [fullDetails, setFullDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCoinDetail = async () => {
      try {
        const detailsResponse = await fetch(
          `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}`
        );
        const descriptionResponse = await fetch(
          `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}`
        );

        const detailsJson = await detailsResponse.json();
        const descripJson = await descriptionResponse.json();

        if (!detailsJson.DISPLAY || !descripJson.Data[symbol]) {
          console.warn(`No data found for symbol: ${symbol}`);
          setFullDetails(null);
        } else {
          setFullDetails({
            numbers: detailsJson.DISPLAY,
            textData: descripJson.Data[symbol], // Extract single coin info
          });
        }
      } catch (error) {
        console.error("Error fetching coin details:", error);
        setFullDetails(null);
      } finally {
        setLoading(false);
      }
    };

    getCoinDetail();
  }, [symbol]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!fullDetails) {
    return <div>Coin details not found.</div>;
  }

  return (
    <div>
      <h1>{fullDetails.textData.FullName || "N/A"}</h1>
      {fullDetails.textData.ImageUrl && (
        <img
          className="images"
          src={`https://www.cryptocompare.com${fullDetails.textData.ImageUrl}`}
          alt={`${symbol} crypto coin`}
        />
      )}
      <div>{fullDetails.textData.Description || "No description available."}</div>
      <br />
      <div>
        This coin was built with the algorithm{" "}
        {fullDetails.textData.Algorithm || "N/A"}.
      </div>
      <br />
      <table>
        <tbody>
          <tr>
            <th>Launch Date</th>
            <td>{fullDetails.textData.AssetLaunchDate || "N/A"}</td>
          </tr>
          <tr>
            <th>Website</th>
            <td>
              {fullDetails.textData.WebsiteUrl ? (
                <a
                  href={fullDetails.textData.WebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {fullDetails.textData.WebsiteUrl}
                </a>
              ) : (
                "N/A"
              )}
            </td>
          </tr>
          {fullDetails.numbers[symbol]?.USD && (
            <>
              <tr>
                <th>Market Cap</th>
                <td>{fullDetails.numbers[symbol].USD.MKTCAP || "N/A"}</td>
              </tr>
              <tr>
                <th>Volume (24h)</th>
                <td>{fullDetails.numbers[symbol].USD.VOLUME24HOUR || "N/A"}</td>
              </tr>
              <tr>
                <th>Today's Open Price</th>
                <td>{fullDetails.numbers[symbol].USD.OPENDAY || "N/A"}</td>
              </tr>
              <tr>
                <th>Highest Price (Today)</th>
                <td>{fullDetails.numbers[symbol].USD.HIGHDAY || "N/A"}</td>
              </tr>
              <tr>
                <th>Lowest Price (Today)</th>
                <td>{fullDetails.numbers[symbol].USD.LOWDAY || "N/A"}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CoinDetail;
