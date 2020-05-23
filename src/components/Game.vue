<template>
  <div class="page-container column">
    <div class="setting-container col column items-center justify-center">
      <div class="row items-center">
        <div>
          <q-btn 
            flat
            icon="expand_less"
            round
            @click="changeSpeed(1)"
            size="sm"/>
        </div>
        <div class="text">
          {{`SPEED: ${speed.level}`}}
        </div>
        <div>
          <q-btn 
            flat
            icon="expand_more"
            round
            @click="changeSpeed(-1)"
            size="sm"/>
        </div>
      </div>
      <div class="text">
        {{`TIME: ${time}`}}
      </div>
      <div class="text">
        {{`SCORE: ${positions.length - 3}`}}
      </div>
      <div 
        class="button cursor-pointer row items-center justify-center"
        @click="start">
        START
      </div>
    </div>
    <div class="row items-center justify-center">
      <div class="game-container">
        <snake
          :positions="positions"/>
        <food
          :position="foodPosition"/>
      </div>
    </div>
  </div>
</template>

<script>
function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
function random(num) {
  return Math.floor(Math.random() * Math.floor(num))
}
function getInitialPositions() {
  return [[2,2], [3,2], [4,2]]
}
let speeds = [
  {
    level: 1,
    frequency: 600
  },
  {
    level: 2,
    frequency: 500
  },
  {
    level: 3,
    frequency: 400
  },
  {
    level: 4,
    frequency: 300
  },
  {
    level: 5,
    frequency: 200
  },
  {
    level: 6,
    frequency: 100
  },
  {
    level: 7,
    frequency: 50
  },
]
const directions = {
  left: {
    name: 'left',
    position: [-1,0]
  },
  right: {
    name: 'right',
    position: [1,0]
  },
  up: {
    name: 'up',
    position: [0,-1]
  },
  down: {
    name: 'down',
    position: [0,1]
  }
}
export default {
  components: {
    Snake: () => import('./Snake.vue'),
    Food: () => import('./Food.vue')
  },
  data() {
    return {
      gameTimer: null,
      timer: null,
      time: 0,
      positions: getInitialPositions(),
      direction: directions.right,
      foodPosition: null,
      container: {
        width: 30,
        height: 30,
      },
      speeds: speeds,
      speed: speeds[3],
    }
  },
  mounted() {
    window.addEventListener("keydown", e => {
      this.keyPress(e.keyCode)
    });
  },
  methods: {
    keyPress(code) {
      switch(code) {
        case 97:
          this.changeSpeed(1)
          break;
        case 98:
          this.changeSpeed(-1)
          break
        case 13:
          this.end();
          this.start();
          break;
        case 37:  // left
          this.changeDirection(directions.left);
          break;
        case 39:  // right
          this.changeDirection(directions.right);
          break;
        case 38:  // up
          this.changeDirection(directions.up);
          break;
        case 40:  // down
          this.changeDirection(directions.down);
          break;
        default:
          break;
      }
    },
    changeSpeed(num) {
      const speed = this.speeds.find(speed => speed.level === this.speed.level + num )
      if(speed) {
        this.speed = speed
      }
      this.runGame()
    },
    changeDirection(direction) {
      if((this.direction.name === 'left' && direction.name === 'right') || (direction.name === 'left' && this.direction.name === 'right')) return
      if((this.direction.name === 'up' && direction.name === 'down') || (direction.name === 'up' && this.direction.name === 'down')) return
      this.direction = direction
    },
    move() {
      let op = clone(this.positions[this.positions.length - 1])
      let np = [op[0] + this.direction.position[0], op[1] + this.direction.position[1]]
      if(np[0] === this.foodPosition[0] && np[1] === this.foodPosition[1]) {
        this.positions.push(this.foodPosition)
        this.generateFood()
      }
      this.positions.push(np)
      this.positions.splice(0,1)
    },
    generateFood() {
      const x = random(this.container.width)
      const y = random(this.container.height)
      this.foodPosition = [x,y]
    },
    verifyCrash() {
      const head = this.positions[this.positions.length - 1]
      if(head[0] < 0 || head[0] > this.container.width || head[1] < 0 || head[1] > this.container.height) {
        return true
      }
      for(let i = 0; i < this.positions.length - 2; i += 1) {
        const body = this.positions[i]
        if(body[0] === head[0] && body[1] === head[1]) {
          return true
        }
      }
      return false
    },
    runTimer() {
      if(this.timer) clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.time += 1
      }, 1000)
    },
    runGame() {
      if(this.gameTimer) clearInterval(this.gameTimer)
      this.gameTimer = setInterval(() => {
        this.move()
        const crashed = this.verifyCrash()
        if(crashed) {
          this.end()
          console.log('you lose')
        }
      }, this.speed.frequency)
    },
    start() {
      this.runTimer()
      this.generateFood();
      this.runGame()
    },
    end() {
      if(this.gameTimer) clearInterval(this.gameTimer)
      if(this.timer) clearInterval(this.timer)
      this.positions = getInitialPositions()
      this.direction = directions.right
      this.foodPosition = null
      this.timer = null
      this.time = 0
    }
  }
}
</script>

<style lang="scss" scoped>
$size: 20px;
$width: 30;
$height: 30;
.page-container {
  width: 100%;
  height: 100%;
  .setting-container {
    padding: 40px 0px;
    .text {
      padding: 10px 0px;
    }
    .button {
      margin: 10px 0px;
      height: 40px;
      width: 200px;
      background: white;
      border-radius: 5px;
      border-width: 2px;
      border-style: solid;
      border-color: black;
    }
  }
  .game-container {
    position: relative;
    height: calc(#{$size} * #{$height});
    width: calc(#{$size} * #{$width});
    background: black;
  }
}
</style>