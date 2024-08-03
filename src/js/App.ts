import '../css/style.css';
import Desktop from "./Desktop";

class App extends Desktop {

  constructor() {

    super();
    this.init();

  }

}

document.addEventListener("DOMContentLoaded", function () {

  const application = new App();
  application.navigation.addEventListeners();

});