# Turn-based RPG made with PhaserJS

This is a simple turn-based RPG HTML5 game made with [PhaserJS](http://phaser.io/). I made it following [Renan Oliveira's tutorial on gamedevacademy.org](https://gamedevacademy.org/phaser-rpg-tutorial), with a few modifications and improvements of my own.

This project uses ES2015 syntax, transpiled by [Babel](https://babeljs.io/) and compressed with [Webpack](https://webpack.github.io/), using **Webpack Dev Server** and **BrowserSync** for the development environment, made possible by the excellent [ES6-webpack template for PhaserJS](https://github.com/lean/phaser-es6-webpack) by [Leandro Cabrera](https://github.com/lean).

### Prerequisites

* [node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)

### Instructions to run it

1. Clone this repository
2. Install the dependencies with `npm install`
3. Install the global dependencies with `npm install --global webpack webpack-dev-server`
4. Run it with `npm run dev`
5. Open your browser and navigate to http://localhost:3000

### Deploying it

1. Run `npm start deploy`
2. Deploy the folders **dist**, **assets** and the file **index.html** to your server of choice

### Assets copyright

The monsters assets used in this game are available in http://opengameart.org/content/2d-rpg-enemy-set and were created by the following artists: Brett Steele (Safir-Kreuz), Joe Raucci (Sylon), Vicki Beinhart (Namakoro), Tyler Olsen (Roots).

The characters assets are available in http://opengameart.org/content/24×32-characters-with-faces-big-pack and were created by Svetlana Kushnariova (email: lana-chan@yandex.ru). All assets are available through the Creative Commons license.

[Live demo!](https://cussomarc.github.io/turn-based-rpg-phaserjs/)
