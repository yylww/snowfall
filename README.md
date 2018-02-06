# snowfall-animation
A simple snowfall animation

## Install
```bash
npm install snowfall-animation
yarn add snowfall-animation
```

## Usage
### HTML
```html
<html>
  <body>
    <canvas id='canvas'></canvas>
  </body>
</html>
```

### CSS
```css
#canvas {
  width: 300px;  
  height: 500px;
  background: #000;
  /* pointer-events: none; */
}
```

### Javascript
```javascript
import Snowfall from 'snowfall-animation'

window.onload = function() {
  const configs = {
    element: '#canvas',   // required "canvas element" 
    number: 30,           // optional "snowflakes: 1-1000, default: 30"
    speed: 3,             // optional "speed: 1-10, default: 3"
    radius: 4,            // optional "radius: 1-10, default: 4"
  }
  const snowfall = new Snowfall(configs)
  snowfall.init();
}
```

---

**MIT Licensed**