<template>
  <div
    class="page-content"
    @mousedown="startNodesBus($event)"
    @mousemove="moveNodesBus($event)"
    @mouseup="endNodesBus($event)"
  >
    <!-- 左侧导航 -->
    <div class="page-left">
      <div class="logo">DAG-Board</div>
      <el-tree :data="leads" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
    <!-- 顶栏 -->
    <div class="headbar">
      <p @mousedown="dragIt('drag name')">drag node</p>
      <p class="animation-btn" @click="makeSomeAnimation">播放动画</p>
      <p class="frames-btn" @click="saveAsFrames">保存为一帧</p>
      <span class="changeVersion" @click="changeVersion">change direction</span>
      <span class="saveChange" @click="saveChange">save change</span>
    </div>
    <!-- DAG-Diagram主体 -->
    <DAGBoard
      :DataAll="DataAll"
      @updateDAG="updateDAG"
      @editNodeDetails="editNodeDetails"
      @doSthPersonal="doSthPersonal"
    ></DAGBoard>
    <!-- 用来模拟拖拽添加的元素 -->
    <node-bus
      v-if="dragBus"
      :value="busValue.value"
      :pos_x="busValue.pos_x"
      :pos_y="busValue.pos_y"
    />
    <!-- 右侧JSOn展示,你忽略就行了 -->
    <editor
      ref="myEditor"
      class="json-editor"
      v-model="jsonEditor"
      :options="options"
      @init="editorInit"
      lang="json"
      theme="chrome"
      width="400"
      height="100%"
    ></editor>
  </div>
</template>

<script>
import { simple_example_data, text_example_data, simple_r_click_data, edges_example_data, nodes_example_data, ports_example_data, complex_example_data, leads, animationJSON } from './data'
export default {
  components: {
    // editor: require('vue2-ace-editor')
  },
  data() {
    return {
       options: {
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true/* 自动补全 */
      },
      clockOfAnimation: null, // 动画播放计时器
      currentAnimate: 0, // 当前动画播放到第几帧
      maxAnimateFrames: 0,
      animationArr: [],
      jsonshow: false,
      dragBus: false,
      busValue: {
        value: "name",
        pos_x: 100,
        pos_y: 100
      },
      leads: leads,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      DataAll: {"edges": [ ], "nodes": [ ]},
      jsonEditor: JSON.stringify('//change JSON click left button show the change')
    }
  },

  methods: {
    dragIt(val) {
      sessionStorage["dragDes"] = JSON.stringify({
        drag: true,
        name: val
      });
    },
    updateDAG(data, actionName) {
      // DAG-Board更新 data是最新的数据,  actionName是事件的名称
      this.DataAll = data
      this.jsonEditor = JSON.stringify(this.DataAll, null, 4)
      console.log('actionName', data, actionName)
    },
    saveChange() {
      this.DataAll = JSON.parse(this.jsonEditor)
    },
    startNodesBus(e) {
      /**
       *  别的组件调用时, 先放入缓存
       * dragDes: {
       *    drag: true,
       *    name: 组件名称
       *    type: 组件类型
       *    model_id: 跟后台交互使用
       * }
       **/
      let dragDes = null;
      if (sessionStorage["dragDes"]) {
        dragDes = JSON.parse(sessionStorage["dragDes"]);
      }
      if (dragDes && dragDes.drag) {
        const x = e.pageX;
        const y = e.pageY;
        this.busValue = Object.assign({}, this.busValue, {
          pos_x: x,
          pos_y: y,
          value: dragDes.name
        });
        this.dragBus = true;
      }
    },
    moveNodesBus(e) {
      // 移动模拟节点
      if (this.dragBus) {
        const x = e.pageX;
        const y = e.pageY;
        this.busValue = Object.assign({}, this.busValue, {
          pos_x: x,
          pos_y: y
        });
      }
    },
    endNodesBus(e) {
      // 节点放入svg
      let dragDes = null;
      if (sessionStorage["dragDes"]) {
        dragDes = JSON.parse(sessionStorage["dragDes"]);
      }
      if (dragDes && dragDes.drag && e.toElement.id === "svgContent") {
        const { model_id, type } = dragDes;
        const pos_x =
          (e.offsetX - 90 - (sessionStorage["svg_left"] || 0)) /
          (sessionStorage["svgScale"] || 1); // 参数修正
        const pos_y =
          (e.offsetY - 15 - (sessionStorage["svg_top"] || 0)) /
          (sessionStorage["svgScale"] || 1); // 参数修正
        const params = {
          model_id: sessionStorage["newGraph"],
          desp: {
            type,
            pos_x,
            pos_y,
            name: this.busValue.value
          }
        };
        this.DataAll.nodes.push({
          ...params.desp,
          id: this.DataAll.nodes.length + 100,
          in_ports: [0],
          out_ports: [0]
       })
      }
      window.sessionStorage["dragDes"] = null;
      this.dragBus = false;
    },
    handleNodeClick(data) {
      const { value, url } = data
      if (url) {
        this.$router.push(url)
        return false
      }
      if (value) {
        localStorage['currentExample'] = JSON.stringify(value)
        this.DataAll = value
        this.jsonEditor = JSON.stringify(this.DataAll, null, '\t')
        this.jsonshow = true
        this.svgScale = sessionStorage['svgScale'] = 1.5
      }
    },
    editorInit: function (editor) { // 右侧JSON相关可以忽略
        require('brace/ext/language_tools') // language extension prerequsite...
        require('brace/mode/html')
        require('brace/mode/javascript') // language
        require('brace/mode/less')
        require('brace/theme/chrome')
        require('brace/snippets/javascript') // snippet
        require('brace/mode/json');
        require('brace/theme/tomorrow');
    },
    editNodeDetails(value) {
      alert(`edit id ${value.id} , info : ${JSON.stringify(value.detail, null, 4)} `)
    },
    doSthPersonal(eventName, id) {
      alert(`edit personal things like ${eventName}, the id is ${id}, current node detail is ${JSON.stringify(this.DataAll.nodes.find(item => item.id === id))}`)
    },
    changeVersion() {
      let GlobalConfigString = localStorage.getItem('GlobalConfig')
      let GlobalConfig = {}
      if (GlobalConfigString && GlobalConfigString.length > 0) {
        GlobalConfig = JSON.parse(GlobalConfigString)
        GlobalConfig.isVertical = !GlobalConfig.isVertical
        localStorage.setItem('GlobalConfig', JSON.stringify(GlobalConfig))
      } else {
        GlobalConfig.isVertical = false
        localStorage.setItem('GlobalConfig', JSON.stringify(GlobalConfig))
      }
      location.reload()
      alert(`change to ${GlobalConfig.isVertical ? 'vertical version' : 'cross version'}`)
    },
    makeSomeAnimation() { // 动画范例
      this.currentAnimate = 0
      if (!this.animationArr.length) this.animationArr = animationJSON
      this.maxAnimateFrames = this.animationArr.length // 帧动画长度

      this.play()
    },
    play() { // 播放帧动画
      console.log('当前帧', this.currentAnimate, '最大帧', this.maxAnimateFrames)
      if (this.currentAnimate >= this.maxAnimateFrames) return false
      this.DataAll = this.animationArr[this.currentAnimate]
      this.jsonEditor = JSON.stringify(this.DataAll, null, 4)
      this.currentAnimate++
      setTimeout(() => {
        this.play()
      }, 1500);
    },
    saveAsFrames() {
      this.animationArr.push(JSON.parse(JSON.stringify(this.DataAll)))
      console.log(this.animationArr)
    }

  },
  created() {
      this.handleNodeClick({ value: localStorage['currentExample'] ? JSON.parse(localStorage['currentExample']) : simple_example_data }) // 读取缓存
      this.$nextTick(() => {
        this.$confirm('现在可以前往示范页查看新内容了, 是否跳转?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/diagramExample')
        }).catch(() => {

        });
      })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.defaultArrow, .connector-hl {
  animation: line_success 4s !important;
  stroke-dasharray: 0;
  stroke-dashoffset: 1000px !important;
}

@keyframes line_success {
  0% {
    stroke-dasharray: 100%;
    stroke-dashoffset: 100%;
  }

  50% {
    stroke-dasharray:100%;
    stroke-dashoffset: 0%;
  }

  99% {
   stroke-dasharray: 100%;
   stroke-dashoffset: 0%;
  }

  100% {
    stroke-dasharray: 0;
    stroke-dashoffset: 100%;
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
  }

  to {
    transform: none;
    opacity: 1;
  }
}

.page-content {
  position: absolute;
  inset: 0;
  min-height: 1vh;
  padding-left:160px;
  overflow: hidden;
  background-color: rgb(60 60 60) !important;
  background-image: linear-gradient(0deg, transparent 24%, rgb(255 255 255 / 5%) 25%, rgb(255 255 255 / 5%) 26%, transparent 27%, transparent 74%, rgb(255 255 255 / 5%) 75%, rgb(255 255 255 / 5%) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgb(255 255 255 / 5%) 25%, rgb(255 255 255 / 5%) 26%, transparent 27%, transparent 74%, rgb(255 255 255 / 5%) 75%, rgb(255 255 255 / 5%) 76%, transparent 77%, transparent);
  background-size: 50px 50px;
  user-select: none;
}

.page-content .logo {
  margin-top: 10px;
  margin-bottom: 10px;
  color: #fff;
  font-size: 30px;
  font-weight: 800;
}

.page-content .el-tree {
  background: transparent;
  color: #ccc;
}

.page-left .el-tree-node__content:hover {
  background: #ccc;
  color: black;
}

.page-left .el-tree-node__content {
  background-color: inherit;
  mix-blend-mode: lighten;
}

.page-left .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
  background: #ccc;
  color: black;
}

.headbar {
  position: relative;
  width: 100%;
  height: 50px;
  background: black;
  color: #fff;
}

.headbar .saveChange {
  margin-top: 5px;
  margin-right:10px;
  padding: 10px;
  float:right;
  border-radius: 4px;
  box-shadow: 0 0 4px #fff;
  color: #fff;
  font-weight: 800;
  cursor: pointer;
}

.headbar .changeVersion {
  margin-top: 5px;
  margin-right: 410px;
  padding: 10px;
  float:right;
  border-radius: 4px;
  box-shadow: 0 0 4px #fff;
  color: #fff;
  font-weight: 800;
  cursor: pointer;
}

.headbar p {
  display: inline-block;
  position: absolute;
  left: 50px;
  width: 140px;
  height: 30px;
  border: 1px solid #289de9;
  border-radius: 15px;
  background: #fff;
  color:black;
  line-height:30px;
  cursor: pointer;
}

.headbar .animation-btn {
  left: 200px;
}

.headbar .frames-btn {
  left: 350px;
}

.page-left {
  position: fixed;
  top:0;
  bottom: 0;
  left:0 ;
  width: 160px;
  background: rgb(60 60 60) !important;
  box-shadow: 0 0 2px #ccc;
}

.json-editor {
  position: absolute;
  right: 0;
  bottom: 0;
}

.tapBar {
  display: flex;
  width: 100%;
  height: 60px;
  padding-top: 10px;
  padding-left: 300px;
  background-color: #212528;
}

.tapBar .title {
  color: white;
  font-size: 30px;
  font-weight: bold;
}

.tapEach {
  width: 100px;
  height: 50px;
  color: #fff;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}

.tapEachSel {
  box-sizing: border-box;
  width: 100px;
  height: 50px;
  background: #ccc;
  color: #212528;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}

.mainContent {
  position: absolute;
  top: 70px;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: left;
}

.mainContent #helpContent {
  margin-top: 100px;
  line-height: 20px;
  text-align: left;
  text-indent: 20px;
}

.mainContent .nav {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 300px;
  background: #212528;
}

.mainContent .nav div {
  width: 100%;
  height: 50px;
  color: #fff;
  line-height: 50px;
  text-align: center;
}

.DAG-content {
  position: absolute;
  inset: 0 0 0 300px;
}

.nodes_bus {
  text-align: center;
  user-select: none;
}

.nodes_bus span {
  display: block;
  width: 200px;
  height: 50px;
  margin-bottom: 30px;
  margin-left: 50%;
  transform: translateX(-50%);
  border: 1px white solid;
  border-radius: 50px;
  cursor: move;
}
</style>
