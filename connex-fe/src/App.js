import { format } from "date-fns";
// import { differenceInSeconds, formatDistanceToNow } from "date-fns";
import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [time, settime] = useState("second");
  const [epochTime, setEpochTime] = useState();
  // const [unformattedEpoch, setunformattedEpoch] = useState(
  //   format(new Date(), "HH:mm:ss")
  // );
  const [currentTime, setCurrentTime] = useState(new Date());
  const [metrics, setmetrics] = useState("second");
  // const [timeDifference, setTimeDifference] = useState("");
  const [load, setload] = useState(false);

  useEffect(() => {
    function fetchData() {
      setload(true);

      var timeconfig = {
        method: "get",
        url: "http://localhost:4000/time",
        headers: {
          Authorization: process.env.REACT_APP_AUTH,
        },
      };

      axios(timeconfig)
        .then(function (response) {
          settime(response.data);
          setCurrentTime(new Date());
          // setunformattedEpoch(new Date(response.data.required[0] * 1000));
          setEpochTime(
            format(new Date(response.data.required[0] * 1000), "HH:mm:ss")
          );
        })
        .catch(function (error) {
          console.log(error);
        });

      var metricsConfig = {
        method: "get",
        url: "http://localhost:4000/metrics",
        headers: {
          Authorization: process.env.REACT_APP_AUTH,
        },
      };

      axios(metricsConfig)
        .then(function (response) {
          setmetrics(response.data);
          setload(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    fetchData();
    const intervalId = setInterval(fetchData, 30 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const everySecondInterval = setInterval(() => {
      //   let _currentTime = new Date();
      setCurrentTime(new Date());
      //   const cTime = format(_currentTime, "HH:mm:ss");

      //   setTimeDifference(
      //     "Epoch " +
      //       JSON.stringify(epochTime) +
      //       " Current Time" +
      //       JSON.stringify(cTime)
      //   );
      //   const seconds = differenceInSeconds(cTime, unformattedEpoch);

      //   const formattedTime = format(new Date(seconds * 1000), "HH:mm:ss");
    }, 1 * 1000);

    return () => clearInterval(everySecondInterval);
  }, []);

  return (
    <div className="App">
      <div className="d-flex flex-column flex-wrap align-content-center align-items-center">
        <h1>Connex One | Time & Metrics</h1>
        {load && <div class="spinner-border text-info" role="status"></div>}
        {!load && (
          <main className="d-flex flex-row justify-content-evenly main-cont">
            <section className="sec-l">
              <h3>API Object</h3>
              <code>{JSON.stringify(time)}</code>
              <h3>Fetched epoch time</h3>
              {epochTime}
              <h3>Current time</h3>
              {format(currentTime, "HH:mm:ss")}
              <h3>Time difference</h3>
              {/* {timeDifference} */}
              {epochTime + " " + format(currentTime, "HH:mm:ss")}
            </section>
            <section className="sec-r">
              <h3>Metrics</h3>
              <code>{metrics}</code>
            </section>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
