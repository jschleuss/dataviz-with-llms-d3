// Load CSV file
d3.csv("stories-with-embeddings.csv").then(data => {
    const svg = d3.select("#chart").append("svg")
        .attr("width", 800)
        .attr("height", 600);

    // Tooltip
    const tooltip = d3.select("#chart").append("div")
        .attr("class", "tooltip");

    // Function to show tooltip
    function showTooltip(event, d) {
        tooltip
            .style("opacity", 1)
            .html(`Title: ${d.title}<br>Date: ${d.publication_date}<br>Domain: ${d.domain}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY + 10) + "px");
    }

    // Function to hide tooltip
    function hideTooltip() {
        tooltip.style("opacity", 0);
    }

    // Draw circles
    svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", 5)
            .style("fill", "steelblue")
            .on("mouseover", showTooltip)
            .on("mouseout", hideTooltip);

    // Search functionality
    d3.select("#searchBox").on("keyup", function(event) {
        const searchText = event.target.value.toLowerCase();
        const filteredData = data.filter(d => d.title.toLowerCase().includes(searchText));
        
        svg.selectAll("circle")
            .data(filteredData, d => d.title)
            .join(
                enter => enter.append("circle")
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y)
                    .attr("r", 5)
                    .style("fill", "steelblue")
                    .on("mouseover", showTooltip)
                    .on("mouseout", hideTooltip),
                update => update,
                exit => exit.remove()
            );
    });
});
