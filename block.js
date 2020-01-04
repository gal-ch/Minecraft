class Block {
    constructor(type, img,count=0) {
        this.type = type;
        this.img = img;
        this.count = count;
    }
    addBlock() { this.count++;}
    decreaseBlock() {
        if (this.count > 0) {
            this.count--;
        }
    }
}

