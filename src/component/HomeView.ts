
class HomeView extends HTMLElement {
    constructor() {
        super();
    }
    // This is called when our element is attached to the DOM
    connectedCallback() {
        this.innerHTML = `<h1>Welcome home!<button id="home-view-button">I am button</button></h1>`;
        document.getElementById("home-view-button")
            .addEventListener("click", () => {
                window.alert("home-view-button been clicked!");
            })
    }
}

export {HomeView}
