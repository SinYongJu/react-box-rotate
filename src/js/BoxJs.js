const durationArray = [ {
    dx : 3,
    dy : 3
  },
  {
    dx : -3,
    dy : 3
  },
  {
    dx : 3,
    dy : -3
  },
  {
    dx : -3,
    dy : -3
  }]

export default class BoxJS {
    constructor(info){
        this.index = info.index
        this.x = info.x | 0;
        this.y = info.y | 0;
        this.dx = durationArray[this.index].dx;
        this.dy = durationArray[this.index].dy;
        this.containerWidth = info.containerWidth
        this.containerHeight = info.containerHeight
        this.width = info.width
        this.height = info.height
    }
    
}

