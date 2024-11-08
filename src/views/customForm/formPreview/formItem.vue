
<script>
export default {
  props: ["form", "formItem"],
  watch: {
    formItem: {
      handler(val) {
        // console.log(val, this.form);
      },
      immediate: true,
    },
  },
  render(h) {
    let { config, id, propName } = this.formItem;

    let abcd = h(
      "el-form-item",
      {
        class: ["form-item", { ratioEntire: config.ratioEntire }],
        attrs: {
          id,
        },
        props: {
          label: config.label,
          prop: propName,
          labelWidth: `${config.labelWidth}px`,
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
            value: this.form[propName],
          },
          on: {
            input: (value) => {
              this.form[propName] = value;
            },
          },
          style: {
            width: "100%",
          },
        }),
      ]
    );
    // console.log(abcd);

    return abcd;
  },
};
</script>
<style scoped>
.form-item {
  height: fit-content;
  padding: 10px;
  position: relative;
  flex-basis: 100%;
  min-height: 0;
}
.ratioEntire {
  grid-column: span 2;
}
</style>