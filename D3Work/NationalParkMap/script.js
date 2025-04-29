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
let stateCount = 0;
// Load external data and boot
d3.queue()
  .defer(
    d3.json,
    "https://raw.githubusercontent.com/hagerka/hagerka.github.io/main/D3Work/NationalParkMap/US_State_Data.json"
  )
  .defer(
    d3.csv,
    "https://raw.githubusercontent.com/hagerka/hagerka.github.io/main/D3Work/NationalParkMap/US_National_Park_Data.csv"
  )
  .await(ready);

function ready(error, topo, parkData) {
  svg
    .append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
    .attr("d", d3.geoPath().projection(projection))
    .attr("stroke", "gray")
    .attr("stroke-width", "0.5px")
    .attr("fill", "white")
    .on("click", function () {
      const currentState = d3.select(this);
      const color = d3.rgb(currentState.style("fill"));
      if (color.r === 255 && color.g === 255 && color.b === 255) {
        stateCount++;
        currentState.attr("fill", "rgba(0,127,175,0.75)");
      } else if (color.r === 0 && color.g === 127 && color.b === 175) {
        currentState.attr("fill", "rgba(218,41,28,0.75)");
      } else {
        stateCount--;
        currentState.attr("fill", "white");
      }
      currentState.attr("stroke", "black").attr("stroke-width", "3px");
      statesReport.innerText = `States Visited: ${stateCount}`;
    });
  const points = [];
  parkData.forEach((item) => {
    const { Park, Lat, Long, Visited } = item;
    topush = {
      type: "Point",
      name: Park,
      coordinates: [Lat, Long],
      visited: Visited,
    };
    points.push(topush);
  });

  svg
    .selectAll(".pin")
    .data(points)
    .enter()
    .append("circle", ".pin")
    .attr("r", 5)
    .attr("fill", (d) => (d.visited === "Yes" ? "rgb(78,81,102)" : "white"))
    .attr("stroke", "black")
    .attr("transform", function (d) {
      return (
        "translate(" + projection([d.coordinates[1], d.coordinates[0]]) + ")"
      );
    })
    .on("focus", function () {
      return tooltip.style("visibility", "visible");
    })
    .on("mouseover", function (hovered) {
      return tooltip
        .style("visibility", "visible")
        .style("top", event.pageY + "px")
        .style("left", event.pageX + "px")
        .html(`<p>${hovered.name}</p>`);
    })
    .on("mouseout", function (hovered) {
      setTimeout(() => {
        return tooltip.style("visibility", "hidden");
      }, 1500);
    })
    .on("blur", function () {
      return tooltip.style("visibility", "hidden");
    });

  const visitedParks = points.filter((item) => item.visited === "Yes");
  parksReport.innerText = `Parks Visited: ${visitedParks.length}`;
}

const tooltip = d3
  .select("body")
  .append("div")
  .attr("id", "tooltip")
  .style("position", "absolute")
  .style("visibility", "hidden")
  .style("top", "10px")
  .style("left", "10px")
  .text("Park Name!")
  .raise();

button.addEventListener("click", function () {
  d3.selectAll("path")
    .attr("fill", "white")
    .attr("stroke", "gray")
    .attr("stroke-width", "0.5px");
  stateCount = 0;
  statesReport.innerText = `States Visited: ${stateCount}`;
});
