// Load D3.js from a CDN
const script = document.createElement("script");
script.src = "https://d3js.org/d3.v7.min.js";
document.head.appendChild(script);

function generateChart() {
    const rawData = document.getElementById("company-data").value;
    
    try {
        const data = JSON.parse(rawData);
        drawChart(data);
    } catch (error) {
        alert("Invalid JSON data. Please check your format.");
    }
}

function drawChart(data) {
    // Remove any existing SVG (clears the previous chart)
    d3.select("#chart").selectAll("*").remove();

    // Set dimensions
    const width = 800, height = 600;
    
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink(data.links).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .style("stroke", "#aaa");

    const node = svg.selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("r", 10)
        .style("fill", d => d.type === "person" ? "blue" : "green");

    simulation.on("tick", () => {
        node.attr("cx", d => d.x).attr("cy", d => d.y);
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
    });
}
