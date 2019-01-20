<script>
import Float from "@/components/Float";
import Input from "@/components/Input";

export default {
  components: {
    Float,
    Input
  }
};
</script>

<template>
  <div class="search-contain">
    <Float/>

    <h1>castle.</h1>

    <Input/>
  </div>
</template>

<style lang="scss" scoped>
.search-contain {
  text-align: center;
}
</style>
