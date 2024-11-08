
<script>
export default {
  props: ["formItem"],
  watch: {
    formItem: {
      handler(val) {
        // console.log(val);
      },
      immediate: true,
    },
  },
  render(h) {
    let { config, id, propName, required } = this.formItem;

    let abcd = h(
      "div",
      {
        class: ["formItem", { ratioEntire: config.ratioEntire }],
        on: {
          click: () => {
            this.$emit("itemSelected", this.formItem);
          },
        },
      },
      [
        h(
          "el-form-item",
          {
            attrs: {
              id,
            },
            props: {
              label: config.label,
              prop: propName,
              labelWidth: `${config.labelWidth}px`,
              required,
            },
            style: "margin-bottom: 0",
          },
          [
            h(config.tag, {
              attrs: {
                placeholder: config.placeholder,
                disabled: config.disabled,
              },
              props: {
                // value: config.defaultValue,
              },
              on: {
                // input: (value) => {
                //   config.defaultValue = value;
                // },
              },
              style: {
                width: "100%",
              },
            }),
          ]
        ),
      ]
    );
    // console.log(abcd);

    return abcd;
  },
};
</script>
<style scoped>
.formItem {
  background: #f7f7f7;
  height: fit-content;
  padding: 10px;
  padding-right: 50px;
  margin-bottom: 0;
  position: relative;
  flex-basis: 100%;
  min-height: 0;
}
.formItem::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: transparent;
}
.ratioEntire {
  grid-column: span 2;
}
</style>