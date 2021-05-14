
class UserList extends HTMLElement {
    constructor() {
        super();
    }
    // This is called when our element is attached to the DOM
    connectedCallback() {
        this.innerHTML = `<h1>User List Here</h1>`;
    }
}

export {UserList}
