mapboxgl.accessToken =
    'pk.eyJ1Ijoic2NyaXB0Z2VuaWUiLCJhIjoiY2x2a2FweHYwMXRkeDJsb2p0eDJsanF3bSJ9.2VHhy4Y7uw8M6ZRC_4wrVA'; // delete this nephew

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v12',
    projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
    zoom: 1,
    center: [30, 15],
});

map.addControl(new mapboxgl.NavigationControl());
// map.scrollZoom.disable();

map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});

// The following values can be changed to control rotation speed:

// At low zooms, complete a revolution every two minutes.
const secondsPerRevolution = 240;
// Above zoom level 5, do not rotate.
const maxSpinZoom = 5;
// Rotate at intermediate speeds between zoom levels 3 and 5.
const slowSpinZoom = 3;

let userInteracting = false;
const spinEnabled = true;

function spinGlobe() {
    const zoom = map.getZoom();
    if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
            // Slow spinning at higher zooms
            const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
        }
        const center = map.getCenter();
        center.lng -= distancePerSecond;
        // Smoothly animate the map over one second.
        // When this animation is complete, it calls a 'moveend' event.
        map.easeTo({ center, duration: 1000, easing: (n) => n });
    }
}

// Pause spinning on interaction
map.on('mousedown', () => {
    userInteracting = true;
});
map.on('dragstart', () => {
    userInteracting = true;
});

// When animation is complete, start spinning if there is no ongoing interaction
map.on('moveend', () => {
    spinGlobe();
});

function addLocations() {
    // map.on('load', () => {
    //     // Add a GeoJSON source points.
    //     map.addSource('points', {
    //         type: 'geojson',
    //         data: {
    //             type: 'FeatureCollection',
    //             features: [
    //                 // First Location
    //                 // Africa
    //                 // Nambia
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Nambia',
    //                         continent: 'Africa',
    //                         seasons: [3, 5, 6, 12],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [17.4861655, -21.25],
    //                     },
    //                 },
    //                 // Template Location
    //                 // Botswana
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Botswana',
    //                         continent: 'Africa',
    //                         seasons: [3, 14],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [
    //                             24.680158000000006, -22.344029499999998,
    //                         ],
    //                     },
    //                 },
    //                 // South Africa
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'South Africa',
    //                         continent: 'Africa',
    //                         seasons: [7, 9, 10, 11, 12, 13, 15, 16, 17],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [24.676997, -28.48322],
    //                     },
    //                 },
    //                 // Madagascar
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Madagascar',
    //                         continent: 'Africa',
    //                         seasons: [2],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [
    //                             46.85432800000001, -18.777192499999998,
    //                         ],
    //                     },
    //                 },
    //                 // Tanzania
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Tanzania',
    //                         continent: 'Africa',
    //                         seasons: [1],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [34.88519500000001, -6.368216],
    //                     },
    //                 },
    //                 // Mozambique
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Mozambique',
    //                         continent: 'Africa',
    //                         seasons: [10],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [35.530157, -18.670284],
    //                     },
    //                 },
    //                 // Asia
    //                 // Maldives
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Maldives',
    //                         continent: 'Asia',
    //                         seasons: [1],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [73.16524899999999, 3.2028335],
    //                     },
    //                 },
    //                 // Thailand
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Thailand',
    //                         continent: 'Asia',
    //                         seasons: [4, 6],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [101.49251549999997, 13.036597],
    //                     },
    //                 },
    //                 // India
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'India',
    //                         continent: 'Asia',
    //                         seasons: [3, 4],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [82.79499799999996, 21.125681],
    //                     },
    //                 },
    //                 // Malaysia
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Malaysia',
    //                         continent: 'Asia',
    //                         seasons: [1, 2],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [109.45547499999998, 4.1093195],
    //                     },
    //                 },
    //                 // Cambodia
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Cambodia',
    //                         continent: 'Asia',
    //                         seasons: [3],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [104.98385999999999, 12.54775],
    //                     },
    //                 },
    //                 // Philippines
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Philippines',
    //                         continent: 'Asia',
    //                         seasons: [5, 6],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [121.76654050000002, 12.8819585],
    //                     },
    //                 },
    //                 // Europe
    //                 // Bulgaria
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Bulgaria',
    //                         continent: 'Europe',
    //                         seasons: [11],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [25.491666500000008, 42.729862],
    //                     },
    //                 },
    //                 // United Kingdom
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'United Kingdom',
    //                         continent: 'Europe',
    //                         seasons: [7],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [
    //                             -3.432277499999998, 54.633221000000006,
    //                         ],
    //                     },
    //                 },
    //                 // Croatia
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Croatia',
    //                         continent: 'Europe',
    //                         seasons: [6, 8],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [16.460305500000004, 44.48732],
    //                     },
    //                 },
    //                 // North America
    //                 // Bahamas
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Bahamas',
    //                         continent: 'North America',
    //                         seasons: [3, 8, 9],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [-76.7098925, 24.885993],
    //                     },
    //                 },
    //                 // Honduras
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Honduras',
    //                         continent: 'North America',
    //                         seasons: [6, 9],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [-86.2530975, 14.746333499999999],
    //                     },
    //                 },
    //                 // Trinidad and Tobago
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Trinidad and Tobago',
    //                         continent: 'North America',
    //                         seasons: [7, 16],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [-61.22085200000001, 10.6872235],
    //                     },
    //                 },
    //                 // Costa Rica
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Costa Rica',
    //                         continent: 'North America',
    //                         seasons: [1],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [-84.2533075, 9.624897],
    //                     },
    //                 },
    //                 // Belize
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Belize',
    //                         continent: 'North America',
    //                         seasons: [2, 5, 6, 7, 8],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [-88.5009, 17.1929285],
    //                     },
    //                 },
    //                 // Mexico
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Mexico',
    //                         continent: 'North America',
    //                         seasons: [4, 9, 10, 12, 14, 15, 16],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [
    //                             -102.57867049999999, 23.624812500000004,
    //                         ],
    //                     },
    //                 },
    //                 // Panama
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Panama',
    //                         continent: 'North America',
    //                         seasons: [1, 5, 7, 9, 10],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [-80.11277749999999, 8.41771],
    //                     },
    //                 },
    //                 // Canada
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Canada',
    //                         continent: 'North America',
    //                         seasons: [6],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [-96.8181455, 62.393303],
    //                     },
    //                 },
    //                 // Nicaragua
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Nicaragua',
    //                         continent: 'North America',
    //                         seasons: [3, 4, 6, 9],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [-85.2142985, 12.866726],
    //                     },
    //                 },
    //                 // Dominica
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Dominica',
    //                         continent: 'North America',
    //                         seasons: [3],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [-61.36412999999999, 15.4167495],
    //                     },
    //                 },
    //                 // United States
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'United States',
    //                         continent: 'North America',
    //                         seasons: [1, 4, 6, 7, 9, 10, 12, 15],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [-95.844032, 36.966428],
    //                     },
    //                 },
    //                 // United States
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'United States',
    //                         continent: 'North America',
    //                         seasons: [1, 4, 6, 7, 9, 10, 12, 15],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [-95.844032, 36.966428],
    //                     },
    //                 },
    //                 // Australia/Oceana
    //                 // Australia
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Australia',
    //                         continent: 'Australia',
    //                         seasons: [6, 7],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [
    //                             133.27515449999999, -26.853387500000004,
    //                         ],
    //                     },
    //                 },
    //                 // Fiji
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Fiji',
    //                         continent: 'Oceana',
    //                         seasons: [2],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [179.35244799999998, -16.5780405],
    //                     },
    //                 },
    //                 // South America
    //                 // Guyana
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Guyana',
    //                         continent: 'North America',
    //                         seasons: [4, 15],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [-58.9325065, 4.8663235],
    //                     },
    //                 },
    //                 // Argentina
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Argentina',
    //                         continent: 'North America',
    //                         seasons: [3, 15],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [-63.587402499999996, -38.4212955],
    //                     },
    //                 },
    //                 // Peru
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Peru',
    //                         continent: 'North America',
    //                         seasons: [3, 15],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [-75.002365, -9.1813525],
    //                     },
    //                 },
    //                 // Brazil
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Brazil',
    //                         continent: 'North America',
    //                         seasons: [3, 9, 10],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [-53.1892665, -14.242914500000001],
    //                     },
    //                 },
    //                 // Ecuador
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Ecuador',
    //                         continent: 'North America',
    //                         seasons: [7, 8, 10, 12, 13],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [-78.131592, -1.7799014999999998],
    //                     },
    //                 },
    //                 // Bolivia
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Bolivia',
    //                         continent: 'North America',
    //                         seasons: [2],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [-63.549429, -16.28835],
    //                     },
    //                 },
    //                 // Colombia
    //                 {
    //                     type: 'Feature',
    //                     properties: {
    //                         name: 'Colombia',
    //                         continent: 'North America',
    //                         seasons: [4, 6, 7, 10, 14, 15, 17],
    //                     },
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [
    //                             -74.29897299999999, 4.577316499999999,
    //                         ],
    //                     },
    //                 },

    //                 // Last Location
    //                 {
    //                     type: 'Feature',
    //                     properties: {},
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: [],
    //                     },
    //                 },
    //             ],
    //         },
    //     });

    //     // Add a circle layer
    //     map.addLayer({
    //         id: 'circle',
    //         type: 'circle',
    //         source: 'points',
    //         paint: {
    //             'circle-color': '#4264fb',
    //             'circle-radius': 8,
    //             'circle-stroke-width': 2,
    //             'circle-stroke-color': '#ffffff',
    //         },
    //     });

    //     // Center the map on the coordinates of any clicked circle from the 'circle' layer.
    //     // Also call popup w/ location info
    //     map.on('click', 'circle', (e) => {
    //         map.flyTo({
    //             center: e.features[0].geometry.coordinatecontinentStrings,
    //         });

    //         // array containing seasons this location featured
    //         let whichSeasons = e.features[0].properties.seasons;

    //         // get an array back instead of a string pretending to be an array
    //         whichSeasons = JSON.parse('[' + whichSeasons + ']');
    //         let seasonString = '';
    //         let continentString = e.features[0].properties.continent;

    //         for (let i = 0; i < whichSeasons.length; i++) {
    //             if (whichSeasons.length == 0) {
    //                 seasonString = whichSeasons[i];
    //             } else if (i == whichSeasons.length - 1) {
    //                 seasonString += whichSeasons[i];
    //             } else {
    //                 seasonString += whichSeasons[i] + ', ';
    //             }
    //         }

    //         const popup = new mapboxgl.Popup({ closeOnClick: true })
    //             .setLngLat(e.features[0].geometry.coordinates)
    //             .setHTML(
    //                 `<h1>${e.features[0].properties.name}</h1><h3>Continent: ${continentString}</h3><h5>Season(s): ${seasonString}</h3>`
    //             )
    //             .addTo(map);
    //     });

    //     // Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
    //     map.on('mouseenter', 'circle', () => {
    //         map.getCanvas().style.cursor = 'pointer';
    //     });

    //     // Change it back to a pointer when it leaves.
    //     map.on('mouseleave', 'circle', () => {
    //         map.getCanvas().style.cursor = '';
    //     });
    // });

    map.on('load', () => {
        defaultPoints();
    });
}




// TODO expand this to accept arrays, alternatively set each instance to toggle for layering
function getSeason(num) {
    
    let selectedFeatures = [];

    // this is for each region
    featuresArray.forEach(region => {
        // console.log('EACH REGION HERE')
        let seasonsArray = region.properties.seasons;

        if (seasonsArray.includes(num)) {
            selectedFeatures.push(region);
            console.log('Pushed Feature: ', region.properties.name)
        };
    })

    return selectedFeatures;
};


let currentSources = [];
let currentLayers = [];
let featuresArray = [
    // First Location
    // Africa
    // Nambia
    {
        type: 'Feature',
        properties: {
            name: 'Nambia',
            continent: 'Africa',
            seasons: [3, 5, 6, 12],
        },
        geometry: {
            type: 'Point',
            coordinates: [17.4861655, -21.25],
        },
    },
    // Template Location
    // Botswana
    {
        type: 'Feature',
        properties: {
            name: 'Botswana',
            continent: 'Africa',
            seasons: [3, 14],
        },
        geometry: {
            type: 'Point',
            coordinates: [24.680158000000006, -22.344029499999998],
        },
    },
    // South Africa
    {
        type: 'Feature',
        properties: {
            name: 'South Africa',
            continent: 'Africa',
            seasons: [7, 9, 10, 11, 12, 13, 15, 16, 17],
        },
        geometry: {
            type: 'Point',
            coordinates: [24.676997, -28.48322],
        },
    },
    // Madagascar
    {
        type: 'Feature',
        properties: {
            name: 'Madagascar',
            continent: 'Africa',
            seasons: [2],
        },
        geometry: {
            type: 'Point',
            coordinates: [46.85432800000001, -18.777192499999998],
        },
    },
    // Tanzania
    {
        type: 'Feature',
        properties: {
            name: 'Tanzania',
            continent: 'Africa',
            seasons: [1],
        },
        geometry: {
            type: 'Point',
            coordinates: [34.88519500000001, -6.368216],
        },
    },
    // Mozambique
    {
        type: 'Feature',
        properties: {
            name: 'Mozambique',
            continent: 'Africa',
            seasons: [10],
        },
        geometry: {
            type: 'Point',
            coordinates: [35.530157, -18.670284],
        },
    },
    // Asia
    // Maldives
    {
        type: 'Feature',
        properties: {
            name: 'Maldives',
            continent: 'Asia',
            seasons: [1],
        },
        geometry: {
            type: 'Point',
            coordinates: [73.16524899999999, 3.2028335],
        },
    },
    // Thailand
    {
        type: 'Feature',
        properties: {
            name: 'Thailand',
            continent: 'Asia',
            seasons: [4, 6],
        },
        geometry: {
            type: 'Point',
            coordinates: [101.49251549999997, 13.036597],
        },
    },
    // India
    {
        type: 'Feature',
        properties: {
            name: 'India',
            continent: 'Asia',
            seasons: [3, 4],
        },
        geometry: {
            type: 'Point',
            coordinates: [82.79499799999996, 21.125681],
        },
    },
    // Malaysia
    {
        type: 'Feature',
        properties: {
            name: 'Malaysia',
            continent: 'Asia',
            seasons: [1, 2],
        },
        geometry: {
            type: 'Point',
            coordinates: [109.45547499999998, 4.1093195],
        },
    },
    // Cambodia
    {
        type: 'Feature',
        properties: {
            name: 'Cambodia',
            continent: 'Asia',
            seasons: [3],
        },
        geometry: {
            type: 'Point',
            coordinates: [104.98385999999999, 12.54775],
        },
    },
    // Philippines
    {
        type: 'Feature',
        properties: {
            name: 'Philippines',
            continent: 'Asia',
            seasons: [5, 6],
        },
        geometry: {
            type: 'Point',
            coordinates: [121.76654050000002, 12.8819585],
        },
    },
    // Europe
    // Bulgaria
    {
        type: 'Feature',
        properties: {
            name: 'Bulgaria',
            continent: 'Europe',
            seasons: [11],
        },
        geometry: {
            type: 'Point',
            coordinates: [25.491666500000008, 42.729862],
        },
    },
    // United Kingdom
    {
        type: 'Feature',
        properties: {
            name: 'United Kingdom',
            continent: 'Europe',
            seasons: [7],
        },
        geometry: {
            type: 'Point',
            coordinates: [-3.432277499999998, 54.633221000000006],
        },
    },
    // Croatia
    {
        type: 'Feature',
        properties: {
            name: 'Croatia',
            continent: 'Europe',
            seasons: [6, 8],
        },
        geometry: {
            type: 'Point',
            coordinates: [16.460305500000004, 44.48732],
        },
    },
    // North America
    // Bahamas
    {
        type: 'Feature',
        properties: {
            name: 'Bahamas',
            continent: 'North America',
            seasons: [3, 8, 9],
        },
        geometry: {
            type: 'Point',
            coordinates: [-76.7098925, 24.885993],
        },
    },
    // Honduras
    {
        type: 'Feature',
        properties: {
            name: 'Honduras',
            continent: 'North America',
            seasons: [6, 9],
        },
        geometry: {
            type: 'Point',
            coordinates: [-86.2530975, 14.746333499999999],
        },
    },
    // Trinidad and Tobago
    {
        type: 'Feature',
        properties: {
            name: 'Trinidad and Tobago',
            continent: 'North America',
            seasons: [7, 16],
        },
        geometry: {
            type: 'Point',
            coordinates: [-61.22085200000001, 10.6872235],
        },
    },
    // Costa Rica
    {
        type: 'Feature',
        properties: {
            name: 'Costa Rica',
            continent: 'North America',
            seasons: [1],
        },
        geometry: {
            type: 'Point',
            coordinates: [-84.2533075, 9.624897],
        },
    },
    // Belize
    {
        type: 'Feature',
        properties: {
            name: 'Belize',
            continent: 'North America',
            seasons: [2, 5, 6, 7, 8],
        },
        geometry: {
            type: 'Point',
            coordinates: [-88.5009, 17.1929285],
        },
    },
    // Mexico
    {
        type: 'Feature',
        properties: {
            name: 'Mexico',
            continent: 'North America',
            seasons: [4, 9, 10, 12, 14, 15, 16],
        },
        geometry: {
            type: 'Point',
            coordinates: [-102.57867049999999, 23.624812500000004],
        },
    },
    // Panama
    {
        type: 'Feature',
        properties: {
            name: 'Panama',
            continent: 'North America',
            seasons: [1, 5, 7, 9, 10],
        },
        geometry: {
            type: 'Point',
            coordinates: [-80.11277749999999, 8.41771],
        },
    },
    // Canada
    {
        type: 'Feature',
        properties: {
            name: 'Canada',
            continent: 'North America',
            seasons: [6],
        },
        geometry: {
            type: 'Point',
            coordinates: [-96.8181455, 62.393303],
        },
    },
    // Nicaragua
    {
        type: 'Feature',
        properties: {
            name: 'Nicaragua',
            continent: 'North America',
            seasons: [3, 4, 6, 9],
        },
        geometry: {
            type: 'Point',
            coordinates: [-85.2142985, 12.866726],
        },
    },
    // Dominica
    {
        type: 'Feature',
        properties: {
            name: 'Dominica',
            continent: 'North America',
            seasons: [3],
        },
        geometry: {
            type: 'Point',
            coordinates: [-61.36412999999999, 15.4167495],
        },
    },
    // United States
    {
        type: 'Feature',
        properties: {
            name: 'United States',
            continent: 'North America',
            seasons: [1, 4, 6, 7, 9, 10, 12, 15],
        },
        geometry: {
            type: 'Point',
            coordinates: [-95.844032, 36.966428],
        },
    },


    //THIS IS HERE TWICE - INVESTIGATE
    // United States
    {
        type: 'Feature',
        properties: {
            name: 'United States',
            continent: 'North America',
            seasons: [1, 4, 6, 7, 9, 10, 12, 15],
        },
        geometry: {
            type: 'Point',
            coordinates: [-95.844032, 36.966428],
        },
    },
    // Australia/Oceana
    // Australia
    {
        type: 'Feature',
        properties: {
            name: 'Australia',
            continent: 'Australia',
            seasons: [6, 7],
        },
        geometry: {
            type: 'Point',
            coordinates: [133.27515449999999, -26.853387500000004],
        },
    },
    // Fiji
    {
        type: 'Feature',
        properties: {
            name: 'Fiji',
            continent: 'Oceana',
            seasons: [2],
        },
        geometry: {
            type: 'Point',
            coordinates: [179.35244799999998, -16.5780405],
        },
    },
    // South America
    // Guyana
    {
        type: 'Feature',
        properties: {
            name: 'Guyana',
            continent: 'North America',
            seasons: [4, 15],
        },
        geometry: {
            type: 'Point',
            coordinates: [-58.9325065, 4.8663235],
        },
    },
    // Argentina
    {
        type: 'Feature',
        properties: {
            name: 'Argentina',
            continent: 'North America',
            seasons: [3, 15],
        },
        geometry: {
            type: 'Point',
            coordinates: [-63.587402499999996, -38.4212955],
        },
    },
    // Peru
    {
        type: 'Feature',
        properties: {
            name: 'Peru',
            continent: 'North America',
            seasons: [3, 15],
        },
        geometry: {
            type: 'Point',
            coordinates: [-75.002365, -9.1813525],
        },
    },
    // Brazil
    {
        type: 'Feature',
        properties: {
            name: 'Brazil',
            continent: 'North America',
            seasons: [3, 9, 10],
        },
        geometry: {
            type: 'Point',
            coordinates: [-53.1892665, -14.242914500000001],
        },
    },
    // Ecuador
    {
        type: 'Feature',
        properties: {
            name: 'Ecuador',
            continent: 'North America',
            seasons: [7, 8, 10, 12, 13],
        },
        geometry: {
            type: 'Point',
            coordinates: [-78.131592, -1.7799014999999998],
        },
    },
    // Bolivia
    {
        type: 'Feature',
        properties: {
            name: 'Bolivia',
            continent: 'North America',
            seasons: [2],
        },
        geometry: {
            type: 'Point',
            coordinates: [-63.549429, -16.28835],
        },
    },
    // Colombia
    {
        type: 'Feature',
        properties: {
            name: 'Colombia',
            continent: 'North America',
            seasons: [4, 6, 7, 10, 14, 15, 17],
        },
        geometry: {
            type: 'Point',
            coordinates: [-74.29897299999999, 4.577316499999999],
        },
    },
];



function seasonPoints(tempSeason) {

    clearPoints();

    map.addSource(`season-${tempSeason}-points`, {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: getSeason(tempSeason),
        },
    });

    // Add a circle layer
    map.addLayer({
        id: `season-${tempSeason}-points-circle`,
        type: 'circle',
        source: `season-${tempSeason}-points`,
        paint: {
            'circle-color': '#4264fb',
            'circle-radius': 8,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff',
        },
    });

    // Center the map on the coordinates of any clicked circle from the 'circle' layer.
    // Also call popup w/ location info
    map.on('click', `season-${tempSeason}-points-circle`, (e) => {
        map.flyTo({
            center: e.features[0].geometry.coordinatecontinentStrings,
        });

        // array containing seasons this location featured
        let whichSeasons = e.features[0].properties.seasons;

        // get an array back instead of a string pretending to be an array
        whichSeasons = JSON.parse('[' + whichSeasons + ']');
        let seasonString = '';
        let continentString = e.features[0].properties.continent;

        for (let i = 0; i < whichSeasons.length; i++) {
            if (whichSeasons.length == 0) {
                seasonString = whichSeasons[i];
            } else if (i == whichSeasons.length - 1) {
                seasonString += whichSeasons[i];
            } else {
                seasonString += whichSeasons[i] + ', ';
            }
        }

        const popup = new mapboxgl.Popup({ closeOnClick: true })
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML(
                `<h1>${e.features[0].properties.name}</h1><h3>Continent: ${continentString}</h3><h5>Season(s): ${seasonString}</h3>`
            )
            .addTo(map);
    });

    // Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
    map.on('mouseenter', `season-${tempSeason}-points-circle`, () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', `season-${tempSeason}-points-circle`, () => {
        map.getCanvas().style.cursor = '';
    });

    currentSources.push(`season-${tempSeason}-points`)
    currentLayers.push(`season-${tempSeason}-points-circle`);
}




// TODO check if source is already present before calling
function defaultPoints() {
    clearPoints();

    map.addSource('defaultPoints', {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: featuresArray,
        },
    });

    // Add a circle layer
    map.addLayer({
        id: 'defaultPointsCircle',
        type: 'circle',
        source: 'defaultPoints',
        paint: {
            'circle-color': '#4264fb',
            'circle-radius': 8,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff',
        },
    });

    // Center the map on the coordinates of any clicked circle from the 'circle' layer.
    // Also call popup w/ location info
    map.on('click', 'defaultPointsCircle', (e) => {
        map.flyTo({
            center: e.features[0].geometry.coordinatecontinentStrings,
        });

        // array containing seasons this location featured
        let whichSeasons = e.features[0].properties.seasons;

        // get an array back instead of a string pretending to be an array
        whichSeasons = JSON.parse('[' + whichSeasons + ']');
        let seasonString = '';
        let continentString = e.features[0].properties.continent;

        for (let i = 0; i < whichSeasons.length; i++) {
            if (whichSeasons.length == 0) {
                seasonString = whichSeasons[i];
            } else if (i == whichSeasons.length - 1) {
                seasonString += whichSeasons[i];
            } else {
                seasonString += whichSeasons[i] + ', ';
            }
        }

        const popup = new mapboxgl.Popup({ closeOnClick: true })
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML(
                `<h1>${e.features[0].properties.name}</h1><h3>Continent: ${continentString}</h3><h5>Season(s): ${seasonString}</h3>`
            )
            .addTo(map);
    });

    // Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
    map.on('mouseenter', 'defaultPointsCircle', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'defaultPointsCircle', () => {
        map.getCanvas().style.cursor = '';
    });

    currentSources.push('defaultPoints')
    currentLayers.push('defaultPointsCircle');
}


function clearPoints() {

    currentLayers.forEach(layer => {
        map.removeLayer(layer);
    });

    currentSources.forEach(source => {
        map.removeSource(source);
    });

    currentLayers = [];
    currentSources = [];
}

// currently restores default points (all)
function restorePoints() {
    
    defaultPoints();
}

spinGlobe();
addLocations();



// nav-bar-left EventListeners
document.getElementById('restore-all').addEventListener('click', function () {
    defaultPoints();
});

document.getElementById('clear-all').addEventListener('click', function () {
    clearPoints();
});



// change this to get element by class for season buttons,
//      then split the inner text into an array by '-'
//          grab the number from the end of the array and use that to
//              feed seasonPoints()

document.getElementById('season-one').addEventListener('click', function () {
    console.log('Button Season 1', this.id)
    seasonPoints(1);
});

document.getElementById('season-two').addEventListener('click', function () {
    console.log('Button Season 2', this.id)
    seasonPoints(2);
});

document.getElementById('season-three').addEventListener('click', function () {
    console.log('Button Season 3', this.id)
    seasonPoints(3);
});

document.getElementById('season-four').addEventListener('click', function () {
    console.log('Button Season 4', this.id)
    seasonPoints(4);
});

document.getElementById('season-five').addEventListener('click', function () {
    console.log('Button Season 5', this.id)
    seasonPoints(5);
});

document.getElementById('season-six').addEventListener('click', function () {
    console.log('Button Season 6', this.id)
    seasonPoints(6);
});

document.getElementById('season-seven').addEventListener('click', function () {
    console.log('Button Season 7', this.id)
    seasonPoints(7);
});

document.getElementById('season-eight').addEventListener('click', function () {
    console.log('Button Season 8', this.id)
    seasonPoints(8);
});

document.getElementById('season-nine').addEventListener('click', function () {
    console.log('Button Season 9', this.id)
    seasonPoints(9);
});

document.getElementById('season-ten').addEventListener('click', function () {
    console.log('Button Season 10', this.id)
    seasonPoints(10);
});

