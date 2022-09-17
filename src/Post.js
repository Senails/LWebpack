export class Post {
    constructor(titel) {
        this.titel = titel;
        this.date = new Date();
    }
    toString() {
        return JSON.stringify({
            titel: this.titel,
            date: this.date.toJSON(),
        })
    }
}