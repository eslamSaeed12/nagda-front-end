import React from "react";
import { Loader } from "../components/loader";
import { StationsService } from "../services/stations-services";
import StationsForms from "../forms/point-forms";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const HookStationsWrapper = ({ Component, ...args }) => {
  const [loading, setLoading] = useState(true);

  const [redirect, setRedirect] = useState(null);

  const navigate = useHistory().push;

  useEffect(() => {
    StationsService.getAllPoints(StationsForms.getAllPoints)
      .then((stationsClientRes) => {
        if (!stationsClientRes.data.body.length) {
          setRedirect(true);
          navigate("/no-stations");
          return;
        }
        setRedirect(false);
        setLoading(false);
      })
      .catch((stationClientErr) => {
        setRedirect(true);
        navigate("/internal-server-down");
      });
  }, []);

  if (!redirect && !loading) {
    return <Component authenticated={!redirect} {...args} />;
  }
  return <Loader size={90} />;
};
