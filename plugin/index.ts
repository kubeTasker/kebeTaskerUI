import { App, Plugin } from 'vue';
import SVGContent from './dagContent/index.vue';
import NodeBus from './nodeBus/index.vue';

const DAGBoard: Plugin = {
  install: (app: App) => {
    app.component(SVGContent.name, SVGContent);
    app.component(NodeBus.name, NodeBus);
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(DAGBoard);
}

export default DAGBoard;