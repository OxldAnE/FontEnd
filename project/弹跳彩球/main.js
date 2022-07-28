let count = 20
const para = document.querySelector('p')

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight

function random (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function randomRGB () {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`
}

class Shape {

  constructor (x, y, vx, vy, color, size) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.color = color
    this.size = size
  }

}

class Ball extends Shape {

  constructor (x, y, vx, vy, color, size) {
    super(x, y, vx, vy, color, size)
    this.exists = true
  }

  draw () {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    ctx.fill()
  }

  update () {
    if ((this.x + this.size) >= width) {
      this.vx = -(this.vx)
    }

    if ((this.x - this.size) <= 0) {
      this.vx = -(this.vx)
    }

    if ((this.y + this.size) >= height) {
      this.vy = -(this.vy)
    }

    if ((this.y - this.size) <= 0) {
      this.vy = -(this.vy)
    }

    this.x += this.vx
    this.y += this.vy
  }

  collision () {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x
        const dy = this.y - ball.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB()
        }
      }
    }
  }

}

class Circle extends Shape {

  constructor (x, y) {
    super(x, y, 20, 20, 'white', 20)

    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'a':
          this.x -= this.vx
          break
        case 'd':
          this.x += this.vx
          break
        case 'w':
          this.y -= this.vy
          break
        case 's':
          this.y += this.vy
          break
      }
    })
  }

  draw () {
    ctx.beginPath()
    ctx.strokeStyle = this.color
    ctx.lineWidth = 5
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    ctx.stroke()
  }

  update () {
    if ((this.x + this.size) >= width) {
      this.x -= this.size
    }

    if ((this.x - this.size) <= 0) {
      this.x += this.size
    }

    if ((this.y + this.size) >= height) {
      this.y -= this.size
    }

    if ((this.y - this.size) <= 0) {
      this.y += this.size
    }
  }

  collision () {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x
        const dy = this.y - ball.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < this.size + ball.size) {
          ball.exists = false
          count--
          para.textContent = '剩余数量: ' + count
        }
      }
    }
  }

}

const balls = []
while (balls.length < count) {
  const size = random(10, 20)
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-5, 5),
    random(-5, 5),
    randomRGB(),
    size
  )
  balls.push(ball)
}
para.textContent = '剩余数量: ' + count

const circle = new Circle(random(0, width), random(0, height))

function loop () {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
  ctx.fillRect(0, 0, width, height)

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw()
      ball.update()
      ball.collision()
    }
  }

  circle.draw()
  circle.update()
  circle.collision()

  requestAnimationFrame(loop)
}

loop()
