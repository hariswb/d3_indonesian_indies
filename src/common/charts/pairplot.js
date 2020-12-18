import * as d3 from "d3"
import {two_features} from "../data"
const data = two_features 
function Pairplot(id){
    const width = 500
    const height = 500
    const margin = {top: 100, right: 20, bottom: 40, left: 50}
    const svg = d3.select("#".concat(id))
        .append("svg")
        .attr("viewBox", [0, 0, width+200, height])
    const layer_bg = svg.append("g")
    const layer_x_axis = svg.append("g")
    const layer_y_axis = svg.append("g")
    const layer_plot = svg.append("g")
    const layer_label_x = svg.append("g")
    const layer_label_y = svg.append("g")
    const layer_title = svg.append("g")
    const layer_regression = svg.append("g")

    const x = d3.scaleLinear()
        .domain([-0.03,1])
        .range([0,width-100])
    
    const y = d3.scaleLinear()
        .domain([-0.03,1])
        .range([height-100,0])
    
    layer_bg
        .append("rect")
        .style("fill", "mintcream")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", height)
        .attr("width", width+200);

    layer_x_axis
        .attr("transform", `translate(${margin.left},${height-margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))
    
    layer_y_axis
        .attr("transform", `translate(${margin.left},${100-margin.bottom})`)
        .call(d3.axisLeft(y).tickSizeOuter(0))

    layer_plot
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr("transform",`translate(${margin.left},${100-margin.bottom})`)
        .attr('r',2)
        .attr('fill',"mediumvioletred")
        .attr("fill-opacity", 0.9)
        .attr("cx", d=>x(d.acousticness))
        .attr("cy", d=>y(d.energy))
    
    layer_label_x    
        .attr("transform",`translate(${margin.left+width/2-100},${height-margin.bottom+30})`)
        .append("text")
        .style("font-family","Arial")
        .style("font-size","0.8rem")
        .text("Acousticness")
    
    layer_label_y   
        .attr("transform",`translate(${margin.left-30},${height/2})`)
        .append("text")
        .style("font-family","Arial")
        .style("font-size","0.8rem")
        .text("Energy")
        .attr("transform",`rotate(270)`)
    
    layer_title
        .attr("transform",`translate(${margin.left},${margin.top/3})`)
        .append("text")
        .style("font-family","Arial")
        .style("font-size","1.3rem")
        .style("font-weight","Bold")
        .text("Scatter Plot: Acousticness vs Energy")

    layer_regression
        .attr("transform",`translate(${margin.left},${100-margin.bottom})`)
        .append("path")
        .datum(data.least_square)
        .attr("stroke", "deeppink")
        .attr("stroke-width", 3)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", d3.line().x(d=>x(d[0])).y(d=>y(d[1])));
}

export default Pairplot