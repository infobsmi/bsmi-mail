
class About extends HTMLElement {
    constructor() {
        super();
    }
    // This is called when our element is attached to the DOM
    connectedCallback() {
        this.innerHTML = `<h1>About Me</h1>` ;
    }
}

export {About}
