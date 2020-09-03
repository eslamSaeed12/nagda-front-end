import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Form,
  Modal,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import MapboxForms from "../forms/mapbox-forms";
import { HookStationsWrapper } from "../wrappers/stations-wrapper";
import { DropbBackLoader } from "../components/Dropback-loader";
import StationsForms from "../forms/point-forms";
import PoliceStationIcon from "../assets/images/policeman.png";
import { MapboxService } from "../services/MapBox-services";
import { StationsService } from "../services/stations-services";
import { getRoutesSchema } from "../validators/mapbox-v";
import { connect } from "react-redux";
import { HookAuthWrapper } from "../wrappers/Usage-wrapper";
import { Layout } from "../Layouts/app-layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactContentLoader from "react-content-loader";
import { getMyLocation } from "../utils/get-user-locations";
import {
  faSearchLocation,
  faLocationArrow,
  faClock,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";
import { ToastC } from "../components/Toast-c";
import MapGl, {
  NavigationControl,
  _MapContext,
  FlyToInterpolator,
} from "react-map-gl";
import { easeCubicIn } from "d3-ease";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapView } from "@deck.gl/core";
import DeckGl from "@deck.gl/react";
import { IconLayer, GeoJsonLayer } from "@deck.gl/layers";
import { hexToRgb } from "../utils/hex-to-rgb";
import LocationImage from "../assets/images/location.png";
import mapboxUtils from "../utils/mapbox-utils";
import { useFormik } from "formik";
import { clientErrCatcher } from "../utils/client-error-catcher";
import { gjsonifyLine } from "../utils/geoJsonCreator";
import { StyleSheet, css } from "aphrodite";
import clsx from "clsx";

const styles = StyleSheet.create({
  instructionsWrapper: {
    boxShadow: `
    20px 20px 60px #d9d9d9, 
             -20px -20px 60px #ffffff`,
    borderRadius: 50,
    backgroundColor: "#ffff",
  },
});

const neaersStationLine = (routes, ILayer) => {
  let lineFillColor = hexToRgb("#EB095E");
  let lineColor = hexToRgb("#1C4A5B");
  return new ILayer({
    id: "Nearest-station-route",
    data: routes,
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getLineColor: [lineFillColor.r, lineFillColor.g, lineFillColor.b],
    getFillColor: [lineColor.r, lineColor.g, lineColor.b],
    getSize: (d) => {
      return 25;
    },
    getRadius: 100,
    getLineWidth: 1,
    getElevation: 30,
  });
};

const UserLocationPoint = ({ lat, lon }, ILayer) => {
  const fillColor = hexToRgb("#D18B05");
  return new ILayer({
    id: "user-location-layer",
    data: [{ title: "موقعك الحالي", lat, lon }],
    getPosition: (d) => [d.lon, d.lat],
    getColor: [fillColor.r, fillColor.g, fillColor.b],
    pickable: true,
    sizeScale: 6.5,
    getSize: (d) => 5,
    getIcon: (d) => ({
      url: LocationImage,
      width: 128,
      height: 128,
      mask: true,
    }),
  });
};

const RouteInstructionsComponent = (props) => {
  const instructionsInterface = [
    {
      icon: faClock,
      name: "ألوقت المقدر",
      value: props.duration,
      unit: "دقيقه",
    },
    {
      icon: faRoad,
      name: "المسافه المقدره",
      value: props.distance,
      unit: "كم",
    },
  ];
  const [minimized, setMiniMized] = useState(false);
  return (
    <section className={clsx(css(styles.instructionsWrapper), "py-4 px-5")}>
      {!minimized ? (
        <ul className="list-unstyled text-right pr-0">
          {instructionsInterface.map((inst, index) => {
            let key = Math.round(Math.random() * 1000);
            return (
              <li
                key={Math.round(key + index)}
                className="d-flex flex-column my-3"
              >
                <span>
                  <FontAwesomeIcon icon={inst.icon} />
                  <span className="mr-4">{inst.name}</span>
                </span>
                <span className="text-primary font-weight-bold align-self-center">
                  {inst.value} {inst.unit ? inst.unit : ""}
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}
      <div className="text-right">
        <Button
          color={minimized ? "success" : "danger"}
          onClick={() => setMiniMized(!minimized)}
        >
          {minimized ? "معلومات السير" : "اغلاق"}
        </Button>
      </div>
    </section>
  );
};

const MapComponent = (props) => {
  return (
    <MapGl
      {...props.viewport}
      reuseMaps
      preventStyleDiffing={true}
      mapStyle="mapbox://styles/mapbox/light-v9"
      onViewportChange={props.onViewportChange}
      mapboxApiAccessToken={process.env.MAPBOX_KEY}
    >
      <DeckGl
        viewState={props.viewport}
        layers={props.layers}
        controller={{ dragRotate: false }}
        views={new MapView({ repeat: false })}
        getTooltip={({ object }) => {
          if (object && object.title) {
            return object.title;
          }
          if (object && object.properites && object.properites.title) {
            return object.properites.title;
          }
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "0.5rem",
          top: "0.5rem",
          zIndex: 1,
        }}
      >
        <NavigationControl />
      </div>
    </MapGl>
  );
};

const profileEnum = [
  {
    name: "الدراجه",
    value: "cycling",
  },
  {
    name: "علي الاقدام",
    value: "walking",
  },
  {
    name: "السياره",
    value: "driving",
  },
];
const WebApp = (props) => {
  const [UserLocation, SetUserLocation] = useState({ lat: null, lon: null });
  const [UserLocationFail, setUserLocationFail] = useState(null);
  const [UserLocationLoad, setUserLocationLoad] = useState(false);
  const [MapLayers, setMapLayers] = useState([]);
  const [ProfileModalOpen, setProfileModalOpen] = useState(false);
  const [FindNearestPointLoad, setFindNearestPointLoad] = useState(false);
  const [FindNearestPointFail, setFindNearestPointFail] = useState(false);
  const [NeaerstPoint, setNearestPoint] = useState([]);
  const [MapboxServiceFormValid, setMapboxServiceFormValid] = useState(false);
  const [MapBoxRoutesLoad, setMapBoxRoutesLoad] = useState(false);
  const [MapBoxRoutesFail, setMapBoxRoutesFail] = useState(false);
  const [MapBoxRoutes, setMapboxRoutes] = useState(null);
  const [stationsClientLoad, setStationsClientLoad] = useState(false);
  const [stationsClientFail, setStationsClientFail] = useState(false);
  const [stations, setStations] = useState(null);
  const [instructions, setInstructions] = useState({
    duration: null,
    distance: null,
  });
  const getNearestPoint = (location) => {
    setFindNearestPointLoad(true);
    const body = StationsForms.getNearestPoint({
      target: {
        type: "Feature",
        properites: {
          title: "موقع المستخدم",
        },
        geometry: {
          type: "Point",
          coordinates: [location.lat, location.lon],
        },
      },
    });

    StationsService.getNearestPoint(body)
      .then((stationsClientRes) => {
        setNearestPoint(
          stationsClientRes.data.body["Nearest-Point"].geometry.coordinates
        );
        setFindNearestPointLoad(false);
      })
      .catch((stationsClientErr) => {
        setFindNearestPointFail(clientErrCatcher(stationsClientErr));
        setFindNearestPointLoad(false);
      });
  };

  const MapBoxFormConfig = useFormik({
    initialValues: {
      origin: undefined,
      target: undefined,
      profile: "driving",
    },
    validationSchema: getRoutesSchema,
    onSubmit: (data) => {
      setMapboxServiceFormValid(true);
      setProfileModalOpen(false);
      let formData = MapboxForms.getRoutes({ ...data });
      MapboxService.getRoute(formData)
        .then((mapBoxClientRes) => {
          setMapboxRoutes(mapBoxClientRes.data.routes);
          const minuteToHour = (time) => (time / 60).toFixed(2);
          const meterToKm = (meters) => (meters / 1000).toFixed(2);

          setInstructions({
            distance: meterToKm(mapBoxClientRes.data.routes[0].distance),
            duration: minuteToHour(mapBoxClientRes.data.routes[0].duration),
          });
          setMapBoxRoutesLoad(true);
          const fly = mapboxUtils.flyTo(
            viewport,
            setViewPort,
            1000,
            10,
            FlyToInterpolator,
            easeCubicIn
          );
          fly(UserLocation);
        })
        .catch((mapboxClientErr) => {
          setMapBoxRoutesFail(
            "حدث خطأ ما اثناء ارجاع المسار , تأكد من الاتصال بالانترنت"
          );
          setMapBoxRoutesLoad(true);
        });
    },
  });
  const [viewport, setViewPort] = useState({
    height: "100%",
    width: "100%",
    latitude: 29.8206,
    longitude: 30.8025,
    zoom: 6,
  });
  const fly = mapboxUtils.flyTo(
    viewport,
    setViewPort,
    1000,
    10,
    FlyToInterpolator,
    easeCubicIn
  );
  const ToggleUserLocationEvt = (location) => {
    const UserlocationAsLayer = UserLocationPoint(
      {
        lat: location.lat,
        lon: location.lon,
        props: props.attributes,
      },
      IconLayer
    );
    if (mapboxUtils.checkForLayer(MapLayers, UserlocationAsLayer)) {
      mapboxUtils.deleteLayer(UserlocationAsLayer, MapLayers, setMapLayers);
    } else {
      mapboxUtils.addLayer(MapLayers, setMapLayers, UserlocationAsLayer);
      fly(UserLocation);
    }
  };

  useEffect(() => {
    StationsService.getAllPoints(StationsForms.getAllPoints)
      .then((stationClientRes) => {
        setStations(stationClientRes.data.body);
        setStationsClientLoad(true);
      })
      .catch((stationClientErr) => {
        setStationsClientFail(clientErrCatcher(stationClientErr));
        setStationsClientLoad(true);
      });

    getMyLocation()
      .then((location) => {
        MapBoxFormConfig.setFieldValue(
          "origin",
          Object.values(location).reverse().join(",")
        );
        SetUserLocation(location);
        setUserLocationLoad(true);
      })
      .catch((locationErr) => {
        setUserLocationFail(locationErr);
        setUserLocationLoad(true);
      });
  }, []);

  useEffect(() => {
    if (
      UserLocation &&
      UserLocationLoad &&
      !FindNearestPointLoad &&
      NeaerstPoint.length
    ) {
      setProfileModalOpen(true);
      MapBoxFormConfig.setFieldValue(
        "target",
        NeaerstPoint.reverse().join(",")
      );
    }
  }, [UserLocationLoad, FindNearestPointLoad]);

  useEffect(() => {
    if (
      (MapBoxRoutesLoad && MapBoxRoutesFail) ||
      (MapBoxRoutesLoad && MapBoxRoutes)
    ) {
      const ApointLyaer = {
        lat: MapBoxRoutes[0].geometry.coordinates[0][1],
        lon: MapBoxRoutes[0].geometry.coordinates[0][0],
      };

      const StyledGeoJsonRouteLine = neaersStationLine(
        gjsonifyLine(MapBoxRoutes[0].geometry),
        GeoJsonLayer
      );

      const userlocationLayerAsFirstPoint = UserLocationPoint(
        {
          ...ApointLyaer,
        },
        IconLayer
      );

      /* mapboxUtils.toggleMyLocation(
        MapLayers,
        setMapLayers,
        userlocationLayerAsFirstPoint
      )
      userlocationLayerAsFirstPoint*/
      const newLayers = [...MapLayers, StyledGeoJsonRouteLine];

      if (
        !mapboxUtils.checkForLayer(MapLayers, userlocationLayerAsFirstPoint)
      ) {
        newLayers.push(userlocationLayerAsFirstPoint);
      }

      setMapLayers(newLayers);

      setMapboxServiceFormValid(null);
    }
  }, [MapBoxRoutesLoad, MapBoxRoutesFail]);

  useEffect(() => {
    if (stationsClientLoad && stations) {
      const StationsLayer = new IconLayer({
        id: "stations-layer",
        data: stations,
        //getColor: [fillColor.r, fillColor.g, fillColor.b],
        pickable: true,
        sizeScale: 6.5,
        getSize: (d) => 5,
        getIcon: (d) => ({
          url: PoliceStationIcon,
          width: 128,
          height: 128,
          mask: false,
        }),
        getPosition: (d) => d.location.coordinates.reverse(),
      });

      setMapLayers([...MapLayers, StationsLayer]);
    }
  }, [stationsClientLoad]);

  return (
    <Layout activeUrl="/web-app" {...props}>
      {MapboxServiceFormValid ? <DropbBackLoader /> : null}
      <section className="py-5">
        <Container>
          <Modal isOpen={ProfileModalOpen} zIndex={99988}>
            <ModalBody>
              <Form
                className="text-right"
                onSubmit={MapBoxFormConfig.handleSubmit}
              >
                <FormGroup>
                  <Label>اختر حالة السير</Label>
                  <Input
                    type="select"
                    name="profile"
                    value={MapBoxFormConfig.values.profile}
                    onChange={MapBoxFormConfig.handleChange}
                    className={`${
                      MapBoxFormConfig.errors.profile ? "is-invalid" : null
                    }`}
                  >
                    {profileEnum.map((e) => {
                      return (
                        <option
                          key={Math.round(Math.random() * 1000)}
                          value={e.value}
                          onSelect={(e) =>
                            MapBoxFormConfig.setFieldValue(
                              "profile",
                              e.target.value
                            )
                          }
                        >
                          {e.name}
                        </option>
                      );
                    })}
                  </Input>
                  <div className="invalid-feedback">
                    {MapBoxFormConfig.errors.profile
                      ? MapBoxFormConfig.errors.profile
                      : null}
                  </div>
                </FormGroup>
                <FormGroup>
                  <Button type="submit" color="primary">
                    تم
                  </Button>
                  <Button
                    className="mr-3"
                    color="outlined-primary"
                    onClick={() => setProfileModalOpen(false)}
                  >
                    اغلاق
                  </Button>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
          {UserLocationFail || FindNearestPointFail || MapBoxRoutesFail ? (
            <ToastC
              isOpen={
                Boolean(UserLocationFail) ||
                Boolean(FindNearestPointFail) ||
                Boolean(MapBoxRoutesFail) ||
                Boolean(stationsClientFail)
              }
              title={"خطأ ما"}
              body={
                UserLocationFail ||
                FindNearestPointFail ||
                MapBoxRoutesFail ||
                stationsClientFail
              }
              variant="bgc-danger"
              error={true}
            />
          ) : null}
          <div className="text-center">
            <Button
              color="outlined-primary"
              className="text-primary"
              onClick={() => ToggleUserLocationEvt(UserLocation)}
            >
              <span>حدد موقعي</span> <FontAwesomeIcon icon={faLocationArrow} />
            </Button>
            <Button
              color="primary"
              className="text-white mr-4"
              onClick={() => {
                getNearestPoint(UserLocation);
              }}
            >
              {FindNearestPointLoad ? (
                <Spinner color="white" />
              ) : (
                <>
                  <span>حدد اقرب نقطه شرطة</span>
                  <FontAwesomeIcon icon={faSearchLocation} />{" "}
                </>
              )}
            </Button>
          </div>
        </Container>
        <Container fluid={"md"}>
          {UserLocationLoad && !UserLocationFail ? (
            <div
              className="mt-4 rounded shadow-lg"
              style={{ height: "550px", width: "100%", position: "relative" }}
            >
              <div
                className={`position-absolute ${
                  MapBoxRoutesLoad && MapBoxRoutes ? "d-block" : "d-none"
                }`}
                style={{ top: "0.5rem", left: "1rem", zIndex: 9999 }}
              >
                <RouteInstructionsComponent
                  duration={instructions.duration}
                  distance={instructions.distance}
                  directions={"absolute"}
                />
              </div>
              <MapComponent
                layers={MapLayers}
                attributes={{ title: "الموقع الحالي للمستخدم" }}
                viewport={viewport}
                onViewportChange={(newViewPort) => setViewPort(newViewPort)}
              />
            </div>
          ) : (
            <div className="mt-5 py-5 position-relative">
              <ReactContentLoader width="100%" height="200px" />
            </div>
          )}
        </Container>
      </section>
    </Layout>
  );
};

const ContainerizedStationsWrapper = (props) => {
  return <HookStationsWrapper Component={WebApp} {...props} />;
};

const WithAuthHookWrapper = (props) => {
  return (
    <HookAuthWrapper
      Component={ContainerizedStationsWrapper}
      dispatch={props.dispatch}
      {...props}
    />
  );
};

export default connect((st) => st)(WithAuthHookWrapper);
