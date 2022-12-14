export class Post {
    constructor(titel, img) {
        this.img = img;
        this.titel = titel;
        this.date = new Date();
    }
    toString() {
        return JSON.stringify({
            titel: this.titel,
            date: this.date.toJSON(),
            img: this.img
        }, null, 2)
    }
    getUpper() {
        return this.titel.toUpperCase();
    }
}