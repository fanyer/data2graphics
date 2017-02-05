//d3-sankey
//https://bl.ocks.org/xaranke/9ada4c74a87b57ae7308

import '../basic.css'

const d3 = Object.assign({},
    require('d3-format'),
    require('d3-sankey'),
    require('d3-selection'),
    require('d3-request'),
    require('d3-drag'),
    require('d3-color'),
    require('d3-scale')
);


var sankey = () => {

    const leftLabels = [
        "维生素A",
        "维生素B1",
        "维生素B2",
        "维生素B3",
        "维生素B5",
        "维生素B6",
        "维生素B7",
        "维生素B9",
        "维生素B12",
        "维生素C",
        "胡萝卜素",
        "维生素E",
        "牛磺酸",
        "辅酶Q",
        "异黄酮",
        "维生素K"
    ]
    const rightLabels = [
        "家畜类",
        "蔬菜类",
        "豆类",
        "家禽类",
        "水果类",
        "人体肠道自主合成",
        "坚果类",
        "发酵食物类",
        "脏器类",
        "谷物类",
        "奶蛋类"
    ]


    
    var margin = {
            top: 1,
            right: 1,
            bottom: 6,
            left: 1
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var formatNumber = d3.format(",.0f"),
        format = function(d) {
            return formatNumber(d) + " TWh";
        },
        color = d3.scaleOrdinal(d3.schemeCategory20);

    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var sankey = d3.sankey()
        .nodeWidth(15)
        .nodePadding(5)
        .size([width, height]);

    var path = sankey.link();

     d3.json("lib/energy.json", function(energy) {

        sankey
            .nodes(energy.nodes)
            .links(energy.links)
            .layout(32);

        // console.log(energy.nodes[0])
        Array.from(Array(47).keys()).forEach((e, i) => {
            console.log(energy.nodes[i].name,energy.nodes[i])
        })
        var link = svg.append("g").selectAll(".link")
            .data(energy.links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", path)
            .style("stroke-width", function(d) {
                return Math.max(1, d.dy);
            })
            .sort(function(a, b) {
                return b.dy - a.dy;
            });


        link.append("title")
            .text(function(d) {

                return d.source.name + " → " + d.target.name + "\n" + format(d.value);
            });


        var node = svg.append("g").selectAll(".node")
            .data(energy.nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .call(d3.drag()
                .subject(function(d) {
                    return d;
                })
                .on("start", function() {
                    this.parentNode.appendChild(this);
                })
                .on("drag", dragmove));

        node.append("rect")
            .attr("height", function(d) {
                return d.dy;
            })
            .attr("width", sankey.nodeWidth())
            .style("fill", function(d) {
                return d.color = color(d.name.replace(/ .*/, ""));
            })
            .style("stroke", function(d) {
                return d3.rgb(d.color).darker(2);
            })
            .append("title")
            .text(function(d) {
                return d.name + "\n" + format(d.value);
            });

        node.append("text")
            .attr("x", -6)
            .attr("y", function(d) {
                return d.dy / 2;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .attr("transform", null)
            .text(function(d) {
                return d.name;
            })
            .filter(function(d) {
                return d.x < width / 2;
            })
            .attr("x", 6 + sankey.nodeWidth())
            .attr("text-anchor", "start");

        function dragmove(d) {
            d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
            sankey.relayout();
            link.attr("d", path);
        }
    });



}

export default sankey
