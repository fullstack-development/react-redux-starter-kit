import build from 'build-route-tree';

const rawTree = {
  demo: {
    gui: null,
    translations: null,
  },
};

export default build(rawTree);
