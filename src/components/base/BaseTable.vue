<template>
  <table>
    <thead>
      <slot name="table-header" />
    </thead>
    <tbody>
      <slot name="table-body" />
    </tbody>
  </table>
</template>

<script>
export default {};
</script>

<style>
table {
  width: 100%;
  border-spacing: 0;
  box-sizing: border-box;
}

table thead th {
  position: sticky;
  top: 0;
  box-sizing: border-box;
  font-size: 0.95rem;
  font-family: Font Bold;
  color: #555;
  z-index: 2;
  text-align: left;
  vertical-align: bottom;
  border-bottom: 2px solid var(--grid-border) !important;
  padding: 0 8px 4px 0;
  background-color: #fff;
  height: 28px;
}
table tbody tr {
  height: 40px;
  box-sizing: border-box;
}
table tr,
td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-bottom: 1px solid var(--grid-border);
  text-align: left;
  vertical-align: center;
  padding: 0 8px 0 0;
}
.td-text-left {
    text-align: left;
}
.td-text-center {
    text-align: center;
}
.td-text-right {
    text-align: right;
}
</style>