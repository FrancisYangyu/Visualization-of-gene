// 1920*1080 *4
// 7690*4320
//function canvasDraw() {
//    var canvas = document.getElementById('myCanvas');
//    var ctx = canvas.getContext('2d');
//    ctx.fillStyle = 'red';
//    ctx.fillRect(100, 100, 200, 200);
//}
var gene = "CCACACCACACCCACACACCCACACACCACACCACACACCACACCACACCCACACACACACATCCTAACACTACCCTAACACAGCCCTAATCTAACCCTGGCCAACCTGTCTCTCAACTTACCCTCCATTACCCTGCCTCCACTCGTTACCCTGTCCCATTCAACCATACCACTCCGAACCACCATCCATCCCTCTACTTACTACCACTCACCCACCGTTACCCTCCAATTACCCATATCCAACCCACTGCCACTTACCCTACCATTACCCTACCATCCACCATGACCTACTCACCATACTGTTCTTCTACCCACCATATTGAAACGCTAACAAATGATCGTAAATAACACACACGTGCTTACCCTACCACTTTATACCACCACCACATGCCATACTCACCCTCACTTGTATACTGATTTTACGTACGCACACGGATGCTACAGTATATACCATCTCAAACTTACCCTACTCTCAGATTCCACTTCACTCCATGGCCCATCTCTCACTGAATCAGTACCAAATGCACTCACATCATTATGCACGGCACTTGCCTCAGCGGTCTATACCCTGTGCCATTTACCCATAACGCCCATCATTATCCACATTTTGATATCTATATCTCATTCGGCGGTCCCAAATATTGTATAACTGCCCTTAATACATACGTTATACCACTTTTGCACCATATACTTACCACTCCATTTATATACACTTATGTCAATATTACAGAAAAATCCCCACAAAAATCACCTAAACATAAAAATATTCTACTTTTCAACAATAATACATAAACATATTGGCTTGTGGTAGCAACACTATCATGGTATCACTAACGTAAAAGTTCCTCAATATTGCAATTTGCTTGAACGGATGCTATTT";
//console.log(gene.length);

//键值对 碱基和对应颜色
var baseOp = {
    'T': 'A',
    'G': 'C',
    'C': 'G',
    'A': 'T'
}
var colorRange = {
    'A': 'blue',
    'C': 'green',
    'G': 'purple',
    'T': 'red'
};

//the size of web  changing lead to sth
window.onresize = function () {
    getWinSize();
    svgContainer.attr("width", winWidth)
        .attr("height", 3 * baseSize);
    loopDraw();
}

var winHeight, winWidth;
//get the width and height of the web
function getWinSize() {
    winHeight = window.screen.height;
    winWidth = window.screen.width;
    //console.log([2, w, h]);
    //return winHeight, winWidth;
}

//create the area of D3 SVG
function createD3svg() {
    getWinSize();
    var svgContainer = d3.select("body").append("svg")
        .attr("width", winWidth)
        .attr("height", 3 * baseSize);
    return svgContainer;
}

//draw one rect of every basic group
function drawRect(svgContainer, x, y, baseSize, base, type) {
    if (type == 0) {
        base = baseOp[base];
        y = y + baseSize + 5;
    }
    svgContainer.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", baseSize)
        .attr("height", baseSize)
        .attr("fill", colorRange[base])
        .on("mouseover", function () {
            d3.select(this).style('fill', "yellow")
        })
        .on("mouseout", function () {
            d3.select(this).transition().duration(200).style('fill', colorRange[base])
        });
}
// draw many rects
function loopDraw() {
    for (var i = 0, x = 0, y = 0; i < gene.length /*i < winWidth / (baseSize + 1) - 2*/ ; i++, x += 2 + baseSize) {
        var point = i + beginPoint;
        drawRect(svgContainer, x, y, baseSize, gene[point], 1);
        drawRect(svgContainer, x, y, baseSize, gene[point], 0);
    }
}
//add the A T C G to every rect
function addText(base) {
    var text = svgContainer.append("text").attr("fill", "white")
        .attr("font-size", baseSize + "px")
        .attr("text-anchor", "middle")
        .text(base);
}

function scaling() {
    alert("123");
    beginPoint -= 100;
}

var svgContainer = createD3svg();
var baseSize = 50; //the picture size of each base group
var beginPoint = 300;
loopDraw();
