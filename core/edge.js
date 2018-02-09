class Edge {

  constructor(x1, y1, x2, y2, n1 ,n2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.node1 = n1.id;
    this.node2 = n2.id;
    this.selected = false;
    // TODO prevent from string input
    this.weight = int(prompt("enter the weight", "1"));
  }

  showWeight(){
    push();
    translate((this.x1 + this.x2) / 2, (this.y1 + this.y2) / 2);
    //rotate(atan2(this.y2 - this.y1, this.x2 - this.x1));
    text(nfc(this.weight, 1), 0, -5);
    pop();
  }

  show(){
    if (this.selected) {
      stroke(120,50,37);
      strokeWeight(5);
    }else {
      stroke(159, 186, 198,210);
      strokeWeight(5);
    }
    line(this.x1, this.y1, this.x2, this.y2);
    strokeWeight(1);
    this.showWeight();
  }
}
