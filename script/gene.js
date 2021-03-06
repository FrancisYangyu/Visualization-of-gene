// 1920*1080 *4
// 7690*4320
//function canvasDraw() {
//    var canvas = document.getElementById('myCanvas');
//    var ctx = canvas.getContext('2d');
//    ctx.fillStyle = 'red';
//    ctx.fillRect(100, 100, 200, 200);
//}
var gene = "CCACACCACACCCACACACCCACACACCACACCACACACCACACCACACCCACACACACACATCCTAACACTACCCTAACACAGCCCTAATCTAACCCTGGCCAACCTGTCTCTCAACTTACCCTCCATTACCCTGCCTCCACTCGTTACCCTGTCCCATTCAACCATACCACTCCGAACCACCATCCATCCCTCTACTTACTACCACTCACCCACCGTTACCCTCCAATTACCCATATCCAACCCACTGCCACTTACCCTACCATTACCCTACCATCCACCATGACCTACTCACCATACTGTTCTTCTACCCACCATATTGAAACGCTAACAAATGATCGTAAATAACACACACGTGCTTACCCTACCACTTTATACCACCACCACATGCCATACTCACCCTCACTTGTATACTGATTTTACGTACGCACACGGATGCTACAGTATATACCATCTCAAACTTACCCTACTCTCAGATTCCACTTCACTCCATGGCCCATCTCTCACTGAATCAGTACCAAATGCACTCACATCATTATGCACGGCACTTGCCTCAGCGGTCTATACCCTGTGCCATTTACCCATAACGCCCATCATTATCCACATTTTGATATCTATATCTCATTCGGCGGTCCCAAATATTGTATAACTGCCCTTAATACATACGTTATACCACTTTTGCACCATATACTTACCACTCCATTTATATACACTTATGTCAATATTACAGAAAAATCCCCACAAAAATCACCTAAACATAAAAATATTCTACTTTTCAACAATAATACATAAACATATTGGCTTGTGGTAGCAACACTATCATGGTATCACTAACGTAAAAGTTCCTCAATATTGCAATTTGCTTGAACGGATGCTATTT";

//键值对 碱基和对应颜色
var baseOp = {
    'T': 'A',
    'G': 'C',
    'C': 'G',
    'A': 'T'
};
var colorRange = {
    'A': '#0099CC', //blue
    'C': '#66CC66', //green
    'G': '#CC99CC', //purple
    'T': '#FF6666' //red
};
//var colorRange = {
//    'A': 'blue', //blue
//    'C': 'green', //green
//    'G': 'purple', //purple
//    'T': 'red' //red
//};
//the size of web  changing lead to sth
//window.onresize = function () {
//    getWinSize();
//    svgContainer.attr("width", winWidth)
//        .attr("height", 3 * baseSize);
//    loopDraw();
//    location.reload();
//}
$(function() {
    $(window).resize(function() {
        getWinSize();
        svgContainer.attr("width", winWidth)
            .attr("height", 3 * baseSize);
        loopDraw();
        location.reload();
    });
});
var winHeight, winWidth;
//get the width and height of the window
function getWinSize() {
    winHeight = window.screen.height;
    winWidth = window.screen.width;
}

//create the area of D3 SVG
function createD3svg() {
    getWinSize();
    //var svg = d3.select("body").append("g").call(zoom);
    var svgContainer = d3.select("body").append("svg")
        .attr("width", winWidth)
        .attr("height", winHeight);
    return svgContainer;
}

//draw one rect of every basic group
function drawRect(svgContainer, x, y, baseSize, base, type) {
    if (type == 0) {
        base = baseOp[base];
        y = y + baseSize + 3;
    }
    svgContainer.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", baseSize)
        .attr("height", baseSize)
        .attr("fill", colorRange[base])
        .on("mouseover", function() {
            d3.select(this).style('fill', "yellow");
        })
        .on("mouseout", function() {
            d3.select(this).transition().duration(200).style('fill', colorRange[base]);
        });
    svgContainer.append('text').text(base).attr('fill', 'white')
        .attr('x', x + baseSize / 2)
        .attr('y', y + baseSize / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', baseSize / 2 + 'px')
        .attr('dy', 8);
}
// draw many rects
function loopDraw() {
    for (var i = 0, x = 0, y = 0; i < gene.length /*i < winWidth / (baseSize + 1) - 2*/ ; i++, x += 2 + baseSize) {
        var point = i + beginPoint;
        //var point = i;
        drawRect(g, x, y, baseSize, gene[point], 1);
        drawRect(g, x, y, baseSize, gene[point], 0);
    }
}
var baseSize = 50; //the picture size of each base group
var beginPoint = 0;
var svgContainer = createD3svg();
var g = svgContainer.append("g");
loopDraw();
svgContainer.call(d3.zoom()
    .scaleExtent([1 / 100, 4])
    .on("zoom", zoomed));

function zoomed() {
    g.attr("transform", d3.event.transform); //
}
// svgContainer.call(d3.selectAll("svg").call(d3.drag().on("start", started)));
//svgheight= webheigh/5; svg
//pointOne=1000, pointTwo=100;
//baseSize= svgheighy/gene.lengh;