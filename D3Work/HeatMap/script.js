const button = document.querySelector("button");
const parksReport = document.querySelector("#parks-text");
const statesReport = document.querySelector("#states-text");

const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

// Map and projection
const path = d3.geoPath();
const projection = d3.geoAlbersUsa();

// Data
const data = d3.map();

// Load external data and boot
d3.queue()
    .defer(d3.json, "US_State_Data.json")
    .defer(d3.json, "Timeline.json")
    .defer(d3.csv, "US_National_Park_Data.csv")
    .await(ready);

function ready(error, topo, visitData, parkData) {
    svg.append("g")
        .selectAll("path")
        .data(topo.features)
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(projection))
        .attr("stroke", "gray")
        .attr("stroke-width", "0.5px")
        .attr("fill", "white");
    const points = [];

    visitData.semanticSegments.forEach((item) => {
        if (item.timelinePath) {
            item.timelinePath.forEach((point) => points.push(point?.point));
        }
    });
    svg.selectAll(".dot")
        .data(points)
        .enter()
        .append("circle", ".dot")
        .attr("r", 2)
        .attr("fill", "rgb(175,28,41,0.3)")
        .attr("transform", function (d) {
            const [lat, lon] = d.split(",");
            const cleanLat = Number(lat.replace("°", "").trim());
            const cleanLon = Number(lon.replace("°", "").trim());
            return "translate(" + projection([cleanLon, cleanLat]) + ")";
        });
    const parkPoints = [];
    parkData.forEach((item) => {
        const { Park, Lat, Long, Visited } = item;
        topush = {
            type: "Point",
            name: Park,
            coordinates: [Lat, Long],
            visited: Visited,
        };
        parkPoints.push(topush);
    });

    svg.selectAll(".pin")
        .data(parkPoints)
        .enter()
        .append("circle", ".pin")
        .attr("r", 5)
        .attr("fill", (d) => (d.visited === "Yes" ? "rgb(78,81,102)" : "white"))
        .attr("stroke", "black")
        .attr("transform", function (d) {
            return (
                "translate(" +
                projection([d.coordinates[1], d.coordinates[0]]) +
                ")"
            );
        });

    const visitedParks = points.filter((item) => item.visited === "Yes");
}
