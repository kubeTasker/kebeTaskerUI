<template>
    <!-- 正常竖版 -->
    <foreignObject v-if="isVertical()" width="180" height="30" >
              <body xmlns="http://www.w3.org/1999/xhtml" style="margin: 0" >
              <div>
                <div :style="item.nodeStyle" :class="choice.paneNode.indexOf(item.id) !== -1 ? 'pane-node-content selected' : 'pane-node-content'">
                    <i
                    @dblclick="$emit('nodesPersonalEvent', 'dbClickNodeIcon', item.id)"
                    :style="item.iconStyle" :class="`${item.iconClassName || 'el-icon-coin'} icon icon-data`"></i>
                    <input
                    type="text" class="name"
                    v-model="item.name"
                    @change="$emit('changeNodeName', item)">
                </div>
                <p v-if="choice.paneNode.indexOf(item.id) !== -1" class="node-pop">{{item.nameDescribe || item.name}}</p>
                <div :class="currentEvent === 'dragLink' ? 'pane-node-parent-hl' : 'pane-node-parent' ">
                  <div v-for="(poi, nth) in item.in_ports" :key="'__' + nth" :style="{width: `${ 100 / (item.in_ports.length + 1)}%`}">
                    <span
                    class="space"
                    @mouseup="$emit('linkEnd', i, nth)"></span>
                  </div>
                </div>
                <div class="pane-node-children">
                  <div v-for="(poi, nth) in item.out_ports" :key="'___' + nth" :style="{width: `${ 100 / (item.out_ports.length + 1)}%`}">
                    <span
                    class="space"
                    @mousedown="$emit('linkPre', $event, i, nth)"></span>
                  </div>
                </div>
              </div>
              </body>
    </foreignObject>
    <!-- 横版 -->
    <foreignObject v-else width="180" height="30" >
              <body xmlns="http://www.w3.org/1999/xhtml" style="margin: 0" >
              <div>
                <div :style="item.nodeStyle" :class="choice.paneNode.indexOf(item.id) !== -1 ? 'pane-node-content selected' : 'pane-node-content'">
                    <i
                    @dblclick="$emit('nodesPersonalEvent', 'dbClickNodeIcon', item.id)"
                    :style="item.iconStyle" :class="`${item.iconClassName || 'el-icon-coin'} icon icon-data`"></i>
                    <input
                    type="text" class="name"
                    v-model="item.name"
                    @change="$emit('changeNodeName', item)">
                </div>
                <p v-if="choice.paneNode.indexOf(item.id) !== -1" class="node-pop">{{item.nameDescribe || item.name}}</p>
                <div id="parent-cross" :class="currentEvent === 'dragLink' ? 'pane-node-parent-hl' : 'pane-node-parent' ">
                  <div v-for="(poi, nth) in item.in_ports" :key="'__' + nth" :style="{width: `${ 100 / (item.in_ports.length + 1)}%`}">
                    <span
                    class="space"
                    @mouseup="$emit('linkEnd', i, nth)"></span>
                  </div>
                </div>
                <div id="children-cross" class="pane-node-children">
                  <div v-for="(poi, nth) in item.out_ports" :key="'___' + nth" :style="{width: `${ 100 / (item.out_ports.length + 1)}%`}">
                    <span
                    class="space"
                    @mousedown="$emit('linkPre', $event, i, nth)"></span>
                  </div>
                </div>
              </div>
              </body>
    </foreignObject>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object,
                default: () => {}
            },
            choice: {
                type: Object,
                default: () => {}
            },
            currentEvent: {
                type: String,
                default: () => ''
            },
            i: {
                type: Number,
                default: () => 0
            }
        },
        data() {
            return {
            }
        },
        methods: {
          isVertical() {
            let GlobalConfig = { isVertical: true }
            let _GlobalConfig = localStorage.getItem('GlobalConfig')
            if (_GlobalConfig && _GlobalConfig.length > 0) {
              GlobalConfig = Object.assign(GlobalConfig, JSON.parse(_GlobalConfig))
            }
            return GlobalConfig.isVertical
          }
        }
    }
</script>

<style scoped>
.pane-node-content {
  box-sizing: border-box;
  width: 180px;
  height: 30px;
  transition: background-color 0.2s;
  border: 1px solid #289de9;
  border-radius: 15px;
  background-color: hsl(0deg 0% 100% / 90%);
  font-size: 12px;
}

.pane-node-content .icon {
    width: 26px;
    height: 26px;
    margin: 1px;
    float: left;
    border-radius: 100%;
    background-color: #289de9;
    color: #fff;
    font-size: 26px;
    cursor: pointer;
}

.pane-node-content  .parentLink {
  position: absolute;
  top: 0;
  left: 90px;
  width: 12px;
  height: 12px;
  transform: translateX(-50%);
  border-top: 6px solid black;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  font-size: 0;
}

.pane-node-content  .childLink {
  position: absolute;
  bottom: 0;
  left: 90px;
  width: 10px;
  height: 10px;
  transform: translate(-50%, 50%);
  border-radius: 50%;
  background: #fff;
  cursor: crosshair;
}

.pane-node-content .name {
  width: 135px;
  height: 26px;
  margin-left: 2px;
  float: left;
  overflow: hidden;
  border: none;
  background: transparent;
  font-size: 14px;
  line-height: 28px;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
}

.pane-node-parent-hl {
  display: flex;
  position: fixed;
  top: -5px;
  width: 100%;
  height: 10px;
  transform: translateX(6px);
}

.pane-node-parent-hl .space {
    position: absolute;
    top: 0;
    right: 0;
    width: 12px;
    height: 12px;
    border: 1px solid gray;
    border-radius: 50%;
    background: #fff;
    cursor: crosshair;
}

.pane-node-parent-hl .space:hover {
  box-shadow: 0 0 0 6px #3ddd73;
}

.paneSuccess {
  background: #3ddd73 !important;
}

.pane-node-parent-hl > div {
  display: inline-block;
  position: relative;
}

#parent-cross {
  top: 0 ;
  left: -10px ;
  width: 10px ;
  height: 100% ;
}

#parent-cross .space {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
}

#children-cross {
    position: fixed;
    top:0;
    right: 0;
    width: 10px;
    height: 100%;
}

#children-cross .space{
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
}

.node-pop {
  position: absolute;
  top: -100px;
  right: -30px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 30px 20px;
  background: #fff;
  pointer-events: none;
}

.node-pop::after {
    content: '.';
    position: absolute;
    z-index: 100;
    top: 22px;
    left: -14px;
    width: 20px;
    height: 20px;
    transform: rotate(-34deg) skew(-33deg, -1deg) scale(1.5);
    border: 2px #ccc solid;
    border-top: none;
    border-right: none;
    border-radius: 20px 0 0;
    background: #fff;
    font-size: 0;
    pointer-events: none;
}

.pane-node-parent {
  display: flex;
  position: fixed;
  top: -5px;
  width: 100%;
  height: 10px;
  transform: translateX(6px);
  opacity: 0;
}

.pane-node-parent .space {
    position: absolute;
    top: 0;
    right: 0;
    width: 12px;
    height: 12px;
    border: 1px solid gray;
    border-radius: 50%;
    background: #fff;
}

.pane-node-parent > div {
  display: inline-block;
  position: relative;
}

.pane-node-children {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  transform: translateX(6px);
  opacity: 0;
}

.pane-node-children .space{
    position: absolute;
    right: 0;
    bottom: -6px;
    width: 12px;
    height: 12px;
    border: 1px solid gray;
    border-radius: 50%;
    background: #fff;
    cursor: crosshair;
}

.pane-node-children .space {
   background: #ccc;
}

.pane-node-children:hover {
  opacity: 1;
}

.pane-node-children > div {
  display: inline-block;
  position: relative;
}

.selected {
  background: rgb(227 244 255 / 90%) !important;
}
</style>
