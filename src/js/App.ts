import '../css/style.css';

import Desktop from "./Desktop";

class App extends Desktop {

  constructor() {

    super();
    this.render();

  }

}

document.addEventListener("DOMContentLoaded", function () {

  new App();

});