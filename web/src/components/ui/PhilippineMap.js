import { useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { NavigationControl, Marker } from 'react-map-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { MapGroupIcon, UserMapIcon, AmenitiesIcon } from "@synergy-project-t/ui-components";

const PhilippineMap = ({
  longitude = 121.7740,
  latitude = 10.8797,
  pitch = 35,
  markers = [],
  onMarkerClick = ()=>{},
  user,
  amenities = [],
}) => {
  const isAmenitiesView = amenities.length > 0;
  const [zoomLevel, setZoomLevel] = useState(5);
  const mapRef = useRef(null);
  const directionsRef = useRef(null);
  // Define the initial bounds and dynamically adjust them based on zoom level
  const getDynamicBounds = (zoom) => {
    if (zoom >= 8) {
      // Expand bounds when zoomed in more
      return [
        [110.9289, -2.2158],
        [132.5986, 21.3210],
      ];
    }
    if (zoom >= 6) {
      // Normal bounds for moderate zoom levels
      return [
        [114.9289, 2.2158],
        [128.5986, 20.3210],
      ];
    }
    return [
      [114.9289, 2.2158], // Southwest corner of the phils
      [128.5986, 17.3210], // Northeast corner of the phils
    ];
  };

  const handleZoom = (e) => {
    const newZoom = e.viewState.zoom;
    setZoomLevel(newZoom); // Update zoom level in state
  };

  const handleLoadMap = () => {
    if(isAmenitiesView) {
      directionsRef.current = new MapboxDirections({
        accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
        unit: 'metric',
        profile: 'mapbox/driving',
        controls: {
          inputs: false,
          profileSwitcher: false, 
          instructions: false, 
        },
      });
  
      mapRef.current.getMap().addControl(directionsRef.current, 'top-left');
  
      // set user address as fixed origin
      if (user && user.address) {
        directionsRef.current.setOrigin([user.address[1], user.address[0]]);
      }
    }
   
  }

  const handleAmenitiesClick = (amenity) => {
    onMarkerClick(amenity)
    if (directionsRef.current) {
      directionsRef.current.setDestination([amenity.address[1], amenity.address[0]]);
    }
  };

  return (
    <div className="w-full h-full relative p-5">
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: user ? user.address[0] : latitude,
          longitude: user ? user.address[1] : longitude,
          zoom: user ? (isAmenitiesView ? 15 : 8) : zoomLevel,
          pitch,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        className="w-full h-full"
        maxBounds={getDynamicBounds(zoomLevel)}
        minZoom={3}
        onZoom={handleZoom}
        onLoad={handleLoadMap}
      >
        <NavigationControl position="top-left" />
        {markers.length > 0 && markers.map((marker) => (
          <Marker latitude={marker.address[0]} longitude={marker.address[1]} key={marker.name}>
            <MapGroupIcon
              label={marker.label}
              viewId={marker.viewId}
              status={marker.status === 'SAFE' ? 'GREEN' : (marker.status === 'NEED_HELP' ? 'YELLOW' : 'RED')}
              size={zoomLevel > 7 ? 3 : 2} //in 'em'
              onClick={onMarkerClick}
            />
          </Marker>
        ))}
        {user && user.address && (
          <Marker
            latitude={user.address[0]}
            longitude={user.address[1]}
            key={user.firstName}
          >
            <UserMapIcon
              color={
                user.status === "SAFE"
                  ? "green"
                  : user.status === "NEED_HELP"
                  ? "red"
                  : "grey"
              }
              size={25}
            />
          </Marker>
        )}
         {user &&
          isAmenitiesView &&
          amenities.map((marker) => (
            <Marker
              latitude={marker.address[0]}
              longitude={marker.address[1]}
              key={marker.address.toString()}
              onClick={() => handleAmenitiesClick(marker)}
            >
              <AmenitiesIcon
                type={marker.type}
                size={25}
              />
            </Marker>
          ))}
      </Map>
    </div>
  );
};

export default PhilippineMap;