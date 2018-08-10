<template>
  <div class="home">
    <div class="home__wrap">
      <h1 class="mega">Jabinzou</h1>
      <h2>An Explorer In The Vast Universe</h2>
      <ul class="clearfix">
        <li
          v-for="(item, index) in routerList"
          :key="index">
          <a
            :href="item.router"
            target="_blank"
            v-if="item.new">
            {{ item.name }}
          </a>
          <a
            :href="item.router"
            v-else>
            {{ item.name }}
          </a>
        </li>
      </ul>
    </div>
    <canvas class="canvas"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      routerList: [{
        router: '#/articles',
        name: 'Blog'
      }, {
        router: '#/about',
        name: 'About'
      }, {
        router: 'https://github.com/Jabinzou',
        name: 'Github',
        new: true // 新打开
      }]
    };
  },
  mounted () {
    this.initApp();
  },
  methods: {
    initApp () {
      document.addEventListener('touchmove', function (e) {
        e.preventDefault();
      });
      let c = document.getElementsByTagName('canvas')[0];
      let x = c.getContext('2d');
      let pr = window.devicePixelRatio || 1;
      let w = window.innerWidth;
      let h = window.innerHeight;
      let f = 90;
      let q;
      let m = Math;
      let r = 0;
      let u = m.PI * 2;
      let v = m.cos;
      let z = m.random;
      c.width = w * pr;
      c.height = h * pr;
      x.scale(pr, pr);
      x.globalAlpha = 0.6;
      function i () {
        x.clearRect(0, 0, w, h);
        q = [{x: 0, y: h * 0.7 + f}, {x: 0, y: h * 0.7 - f}];
        while (q[1].x < w + f) d(q[0], q[1]);
      }
      function d (i, j) {
        x.beginPath();
        x.moveTo(i.x, i.y);
        x.lineTo(j.x, j.y);
        let k = j.x + (z() * 2 - 0.25) * f;
        let n = y(j.y);
        x.lineTo(k, n);
        x.closePath();
        r -= u / -50;
        x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16);
        x.fill();
        q[0] = q[1];
        q[1] = {x: k, y: n};
      }
      function y (p) {
        var t = p + (z() * 2 - 1.1) * f;
        return (t > h || t < 0) ? y(p) : t;
      }
      document.onclick = i;
      document.ontouchstart = i;
      i();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@asset/css/common.scss';
.home{
  @media (min-width: 650px){
    .mega {
      font-size: 2.4rem;
      line-height: 1;
    }
  }
  h1{
    font-weight: 100;
    letter-spacing: 8px;
    color: #f35626;
    background-image: -webkit-linear-gradient(92deg,#f35626,#feab3a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-animation: hue 60s infinite linear;
    animation: 20s hue infinite;
  }
  h2 {
    color: #999;
    font-weight: normal;
    font-size: 14px;
    letter-spacing: .12em;
    margin-top: 12px;
    margin-bottom: 30px;
  }
  &__wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 100px;
    text-align: center;
    margin-top: -100px;
    transform: translateX(-50%);
    webkit-user-select: none;
    -moz-user-select: none;
    user-select: none
  }
  ul > li {
    float: left;
    &:not(:first-of-type) {
      margin-left: 126px;
    }
    a {
      color: $normal-color;
      &:hover {
        color: $regular-red;
      }
    }
  }
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
