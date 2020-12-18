import * as d3 from "d3"
import {features_data} from "../data"

const data = features_data

const boxplot = function (id){
    const width = 700
    const height = 500
    const margin = {top: 100, right: 20, bottom: 30, left: 40}
    const features = data.map(d=>d.key)
    const svg = d3.select("#".concat(id))
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
    const layer_bg = svg.append("g")
    const layer_x_axis = svg.append("g")
    const layer_y_axis = svg.append("g")
    const layer_grid = svg.append("g")

    const layer_box = svg.append("g")
                            .selectAll("g")
                            .data(data)
                            .join("g");
    const layer_title = svg.append("g")

    // console.log(data)
    
    const x = d3.scaleBand()
        .range([margin.left, width - margin.right])
        .domain(data.map(d => d.key))
        .paddingInner(1)
        .paddingOuter(.5)

    const y = d3.scaleLinear()
        .domain([0, 1]).nice()
        .range([height - margin.bottom, margin.top])

    layer_bg
        .append("rect")
        .style("fill", "ghostwhite")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", height)
        .attr("width", width);

    layer_x_axis
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
    
    layer_y_axis
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, "s"))
        .call(g => g.select(".domain").remove())

    layer_grid
        .attr("stroke", "lightslategrey")
        .attr("stroke-opacity", 0.5)
        .call(g => g.append("g")
        .selectAll("line")
        .data(y.ticks())
        .join("line")
        .attr("y1", d => 0.5 + y(d))
        .attr("y2", d => 0.5 + y(d))
        .attr("x1", margin.left)
        .attr("x2", width - margin.right));

    layer_box
        .append("path")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("d", d => {
            // console.log(x(d.key),y(d.value.range[1]))
            return `M${x(d.key)},${y(d.value.range[1])}
                    V${y(d.value.range[0])}`
        });

    layer_box
        .append("path")
        .attr("fill", (d,i)=>d3.schemeTableau10[i])//"PaleTurquoise")
        .attr("d", d => {
            return `M${x(d.key) - 20},${y(d.value.quartiles[2])}
                    H${x(d.key) + 20}
                    V${y(d.value.quartiles[0])}
                    H${x(d.key) - 20}
                    Z
                    `        
        });
    
    layer_box
        .append("path")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("d", d => {
            return `M${x(d.key) - 20},${y(d.value.quartiles[1])}
                    H${x(d.key) + 20}
                    `
        });
    
    layer_box
        .append("g")
        .attr("fill", (d,i)=>d3.schemeTableau10[i])
        .attr("fill-opacity", 0.4)
        .attr("stroke", "none")
        .attr("transform", d => `translate(${x(d.key)},0)`)
        .selectAll("circle")
        .data(d =>{ 
            return d.value.outliers
        })
        .join("circle")
        .attr("r", 3)
        .attr("cx", 0 )//() => (Math.random() - 0.5) * 4)
        .attr("cy", d =>y(d));
    
    layer_title
        .attr('transform', `translate(${margin.left}, ${height * 0.1})`)
        .append('text')
        .attr('class', 'text-title')
        .text(`Distribution of Spotify Features`);
        
    layer_title
        .attr('transform', `translate(${margin.left}, ${height * 0.1})`)
        .append('text')
        .attr('class', 'text-title')
        .attr("dy", "1em")
        .style("font-size", "1em")
        .text(`of "The Sound of Indonesian Indie" Playlist`);

}

export default boxplot