export const svgMoveEvent = {
  data() {
    return {
      // 整个svg的位置调整
      translateX: 0,
      translateY: 0,
      // 整个svg的缩放比例
      scaleCoefficient: 1,
      // 鼠标事件
      mosueEvent: null,
      savedTranslateX: 0,
      savedTranslateY: 0,
    };
  },
  methods: {
    handleWheel(event) {
      // 阻止事件冒泡和默认行为，防止整个页面滚动
      event.preventDefault();
      event.stopPropagation();

      // 获取 svg 元素的尺寸
      const svgRect = this.$refs.svg.getBoundingClientRect();
      const centerX = svgRect.width / 2;
      const centerY = svgRect.height / 2;

      // 计算缩放前的中心点位置
      const oldCenterX = (centerX - this.translateX) / this.scaleCoefficient;
      const oldCenterY = (centerY - this.translateY) / this.scaleCoefficient;

      // 更新缩放系数
      const newScale =
        this.scaleCoefficient * (1 - Math.sign(event.deltaY) * 0.1);

      // 计算新的中心点位置
      const newCenterX = oldCenterX * newScale;
      const newCenterY = oldCenterY * newScale;

      // 调整 translateX 和 translateY 以保持中心点位置不变
      this.translateX = centerX - newCenterX;
      this.translateY = centerY - newCenterY;

      // 为鼠标移动事件存储数据
      this.savedTranslateX = this.translateX;
      this.savedTranslateY = this.translateY;

      // 应用新的缩放系数
      this.scaleCoefficient = newScale;
    },
    handleMouseUp() {
      this.mosueEvent = null;
      this.savedTranslateX = this.translateX;
      this.savedTranslateY = this.translateY;
    },
    handleMouseDown(event) {
      this.mosueEvent = { x: event.clientX, y: event.clientY };
    },
    handleMouseMove(event) {
      if (this.mosueEvent) {
        this.translateX =
          this.savedTranslateX + event.clientX - this.mosueEvent.x;
        this.translateY =
          this.savedTranslateY + event.clientY - this.mosueEvent.y;
      }
    },
  },
};
