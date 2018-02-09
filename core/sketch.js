// Delclaration of elements' variables
var myCanvas;
var radio;
var runButton;
var resetButton;
var clearButton;
// Initializing global arrays for both Nodes and Edges
var nodeArr = [];
var edgeArr = [];
var counter = 1;
// Start and End nodes (Input)
var startNode ;
var endNode;
// Temporary arrays
var dim = [];
var tempNode = [];

// Initializing elements
function setup() {
  myCanvas = createCanvas(1000,windowHeight - 50);
  runButton = createButton("Run");
  resetButton = createButton("Reset");
  clearButton = createButton("Clear");

  // Canvas functionality
  myCanvas.mousePressed(generateNode);
  myCanvas.style("border", "2px solid #c4d8b7");
  myCanvas.style("margin", "25px 0px 0px 50px");

  // Run the search algorithm on the graph
  runButton.position(1150,150);
  runButton.mousePressed(dijkstra);
  runButton.addClass('button');

  // Reset the same graph with no search results( clear previous path)
  resetButton.position(1150, 300);
  resetButton.mousePressed(resetGraph);
  resetButton.addClass('button');

  // Delete the graph entirly
  clearButton.position(1150,450);
  clearButton.mousePressed(clearGraph);
  clearButton.addClass('button');

  // Option to either enter nodes or edges
  radio = createRadio();
  radio.position(1100,50)
  radio.option('node');
  radio.option('edge');
}

// A continuous loop to draw everything inside the canvas
function draw() {
  background(240);
  for (edge of edgeArr) {
    edge.show();
  }
  for (node of nodeArr) {
    node.show();
  }
  // To show the currently added edge as dragable one in real time
  if (radio.value() == "edge" && dim.length == 1){
    stroke(159, 186, 198,110);
    strokeWeight(5);
    line(dim[0][0], dim[0][1], mouseX, mouseY);
  }
}

// Reset all node and edges to be unselected.
function resetGraph() {
  for (node of nodeArr) {
    node.selected = false;
  }
  for (edge of edgeArr) {
    edge.selected = false;
  }
}

// Clear the arrays from existing nodes and edges
function clearGraph() {
  edgeArr = [];
  nodeArr = [];
  counter = 1;
}

// Create a new Node object
function generateNode(){
  if (radio.value() == "node") {
    for (node of nodeArr) {
      // Do not create two nodes in the same position
      if(node.isInside(mouseX,mouseY)){
        alert("Invalid Position!!");
        return 0;
      }
    }
    nodeArr.push(new Node(mouseX, mouseY, 25));
  }
}


// Create a new Edge object
function mousePressed() {
  for (node of nodeArr) {
    // Store the positions of the 2 ends of the
    // edge, and the nodes corresponding to it
    if(node.isInside(mouseX, mouseY) && radio.value() == "edge" && dim.length < 2 && tempNode.length < 2){
      dim.push([node.getDim()[0], node.getDim()[1]]); // The positions of 2 nodes
      tempNode.push(node); // The nodes at the 2 ends of the edge
    }
  }
  // Create the edge with 2 dimensions stored in the temporary array 'dim'
  if (radio.value() == "edge" && dim.length == 2 && tempNode.length == 2) {
    edgeArr.push(new Edge(dim[0][0], dim[0][1], dim[1][0], dim[1][1], tempNode[0], tempNode[1]));
    // Clear temp arrays
    dim = [];
    tempNode = [];
  }
}

function dijkstra(){
  // Do not run if there is no edge, or no node
  if (nodeArr.length < 1 || edgeArr.length < 1) {
    alert("No Node/Edge is available!!");
    return 0;
  }
  // TODO prevent string input
  startNode = int(prompt("Enter  the start node"));
  endNode = int(prompt("Enter the end node"));
  // Create new Graph object
  graph = new Graph();
  // Add vertex in the graph from the nodeArr
  for (node of nodeArr) {
    graph.addVertex(node.id);
  }
  // Add edge in the graph from the edgeArr
  for (edge of edgeArr) {
    graph.addEdge(edge.node1,edge.node2);
  }
  let path = graph.pathFromTo(startNode, endNode);
  let pathArr = path.split("-");

  // Mark the nodes in the path as selected to modify their colors
  for (p of pathArr) {
    for (node of nodeArr) {
      if(node.id == p){
        node.selected = true;
      }
    }
  }
  // To select each 2 sequential nodes of the path,
  // to select the edge between them.
  for (var i = 0; i < pathArr.length-1 ; i++) {
    let first = pathArr[i];
    let second = pathArr[i+1];

    for (edge of edgeArr) {
      if((edge.node1 == first && edge.node2 == second) || (edge.node2 == first && edge.node1 == second)){
        edge.selected = true;
      }
    }
  }
}
