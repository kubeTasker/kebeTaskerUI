<!-- 这里是拖入节点时的模拟元素 -->
<template>
  <div class="nodesBus-contain" :style="{left: this.pos_x + 90 + 'px', top: this.pos_y + 30 + 'px' }">
    <div class="nodesBus">
      <span class="icon"></span>
      <span class="name">{{ value }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NodeBus',
  props: {
    value: {
      type: String,
      default: "传入内容"
    },
    pos_x: {
      type: Number
    },
    pos_y: {
      type: Number
    }
  },
  data() {
    return {
      name: this.value,
      left: this.pos_x,
      top: this.pos_y
    };
  }
};
</script>

<style scoped>
.nodesBus-contain {
  position: absolute;
  box-sizing: border-box;
  width: 10px;
  height: 10px;
  }

.nodesBus {
  position: absolute;
  box-sizing: border-box;
  width: 180px;
  height: 30px;
  transform: translate(-180px, -45px);
  transition: background-color 0.2s;
  border: 1px solid #289de9;
  border-radius: 15px;
  background-color: rgb(255 255 255 / 90%);
  font-size: 12px;
  pointer-events: none;
}

.nodesBus .icon {
  width: 26px;
  height: 26px;
  margin: 1px;
  float: left;
  border-radius: 100%;
  background-color: #289de9;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.nodesBus   .name {
  width: 135px;
  height: 28px;
  margin-left: 2px;
  float: left;
  overflow: hidden;
  font-size: 14px;
  line-height: 28px;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
}
</style>
