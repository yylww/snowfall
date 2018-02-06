
class Snowfall {
  constructor(configs) {
    if (configs.number < 1) configs.number = 1
    if (configs.number > 1000) configs.number = 1000
    if (configs.speed < 1) configs.speed = 1
    if (configs.speed > 10) configs.speed = 10
    if (configs.radius < 1) configs.speed = 1
    if (configs.radius > 10) configs.radius = 10

    this.options = {
      canvas: document.querySelector(configs.element),
      ctx: document.querySelector(configs.element).getContext('2d'),
      snowArr: [],
      width: null,
      height: null,
      number: parseInt(configs.number, 10) || 30,        // 页面雪花数，取值范围：1-1000，默认为30
      speed: parseInt(configs.speed, 10) || 3,           // 雪花下落速度，值越大，速度越快，取值范围：1-10，默认为3
      radius: parseInt(configs.radius, 10) || 4,         // 雪花半径，取值范围：1-10，默认为4，雪花半径在 R/2 - R 直接随机
    }

    this.updateSnow = this.updateSnow.bind(this)
  }

  init() {
    this.options.width = this.options.canvas.width
    this.options.height = this.options.canvas.height

    // 初始时，在canvas中随机生成雪花
    for (let i = 0; i < this.options.number; i++) {
      this.options.snowArr.push(this.createSnowflake('all'))
    }

    this.updateSnow()
  }

  /**
   * 生成一个雪花 left: x坐标，top: y坐标，radius: 半径，dropSpeed: 下降速度，direction: x轴位移速度，angle: 旋转角度，默认都为0，spinning: 旋转速度
   * @param {string} pos 雪花生成的位置
   * @return {object} 雪花参数
   */
  createSnowflake(pos) {
    const top = pos === 'all' ? Math.random() * this.options.height : -10
    return {
      'left': Math.random() * this.options.width,
      'top': top,
      'radius': this.options.radius / 2 * (Math.random() + 1),
      'dropSpeed': Math.random() * 0.4 + 0.2 * this.options.speed,
      'direction': Math.random() > 0.5 ? Math.random() * 0.2 : Math.random() * -0.2,
      'angle': 0,
      'spinningSpeed': Math.random() * 1 + 0.5
    }
  }

  /**
   * 画雪花
   * @param {object} obj 雪花相关参数
   */
  drawSnowflake(obj) {
    const ctx = this.options.ctx
    const x = obj.left
    const y = obj.top
    const r = obj.radius
    const deg = obj.angle
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = r * 2 / 3
    ctx.beginPath()
    ctx.moveTo(x - r * Math.cos(deg * Math.PI / 180), y + r * Math.sin(deg * Math.PI / 180))
    ctx.lineTo(x + r * Math.cos(deg * Math.PI / 180), y - r * Math.sin(deg * Math.PI / 180))
    ctx.moveTo(x + r * Math.sin((deg - 30) * Math.PI / 180), y + r * Math.cos((deg - 30) * Math.PI / 180))
    ctx.lineTo(x - r * Math.sin((deg - 30) * Math.PI / 180), y - r * Math.cos((deg - 30) * Math.PI / 180))
    ctx.moveTo(x + r * Math.cos((60 - deg) * Math.PI / 180), y + r * Math.sin((60 - deg) * Math.PI / 180))
    ctx.lineTo(x - r * Math.cos((60 - deg) * Math.PI / 180), y - r * Math.sin((60 - deg) * Math.PI / 180))
    ctx.stroke()
  }

  /**
   * 更新雪花参数，left: x轴，top: y轴，angle: 旋转角度
   */
  updateSnow() {
    const options = this.options
    options.ctx.clearRect(0, 0, options.width, options.height)
    for (let i = 0; i < options.snowArr.length; i++) {
      options.snowArr[i].left += options.snowArr[i].direction
      options.snowArr[i].top += options.snowArr[i].dropSpeed
      options.snowArr[i].angle += options.snowArr[i].spinningSpeed

      if (options.snowArr[i].left < 0 || options.snowArr[i].left > options.width || options.snowArr[i].top > options.height) {
        // 删除画面外的雪花
        options.snowArr.splice(i--, 1)
        // 增加一片新的雪花
        options.snowArr.push(this.createSnowflake())
        continue
      }
      this.drawSnowflake(options.snowArr[i])
    }

    requestAnimationFrame(this.updateSnow)
  }
}

export default Snowfall
