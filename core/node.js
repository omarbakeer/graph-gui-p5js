class Node {

  constructor(x, y, raduis){
    this.x = x;
    this.y = y;
    this.raduis = raduis;
    this.id = counter;
    this.selected = false;
    counter++;
  }

  getDim(){
    return [this.x,this.y];
  }

  isInside(px, py){
    let d = dist(px, py , this.x, this.y);
    return d < this.raduis ;
  }

  show(){
    if (this.selected) {
      fill(120, 50, 37);
    }else {
      fill(102, 207, 255);
    }
    noStroke();
    ellipse(this.x, this.y, this.raduis*2);
    fill(0);
    text(this.id, this.x, this.y);
  }
}
