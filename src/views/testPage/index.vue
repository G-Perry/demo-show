<template>
  <div class="son_fit_father" >
    <div class="segmented-control">
      <input type="radio" name="radio2" value="3" id="tab-1" checked />
      <label for="tab-1" class="segmented-control__1">
        <p>Tab 1</p>
      </label>

      <input type="radio" name="radio2" value="4" id="tab-2" />
      <label for="tab-2" class="segmented-control__2">
        <p>Tab 2</p>
      </label>

      <input type="radio" name="radio2" value="5" id="tab-3" />
      <label for="tab-3" class="segmented-control__3">
        <p>Tab 3</p>
      </label>

      <div class="segmented-control__color"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.segmented-control {
  width: 100%;
  height: 40px;
  box-shadow: 0.3rem 0.3rem 0.6rem #c8d0e7, -0.2rem -0.2rem 0.5rem #ffffff;
  /* border-radius: 1rem; */
  background: #e4ebf5;
  display: flex;
  align-items: center;
  position: relative;
}

.segmented-control input {
  display: none;
}

.segmented-control > input:checked + label {
  transition: all 0.5s ease;
  color: #6d5dfc;
}

.segmented-control__1,
.segmented-control__2,
.segmented-control__3 {
  width: 6.8rem;
  height: 100%;
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #9baacf;
  transition: all 0.5s ease;
}

.segmented-control__1:hover,
.segmented-control__2:hover,
.segmented-control__3:hover {
  color: #6d5dfc;
}

.segmented-control__color {
  position: absolute;
  height: 85%;
  width: 6.2rem;
  margin-left: 0.3rem;
  border-radius: 0.8rem;
  box-shadow: inset 0.2rem 0.2rem 0.5rem #c8d0e7,
    inset -0.2rem -0.2rem 0.5rem #fff;
  pointer-events: none;
}

#tab-1:checked ~ .segmented-control__color {
  transform: translateX(0);
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#tab-2:checked ~ .segmented-control__color {
  transform: translateX(6.8rem);
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#tab-3:checked ~ .segmented-control__color {
  transform: translateX(13.6rem);
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>