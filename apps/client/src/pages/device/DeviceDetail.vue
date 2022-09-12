<template>
    <suspense>
      <comp></comp>
      <template #fallback>
        idk
      </template>
    </suspense>
</template>

<script setup lang="ts">
    import customComponents from "@iot/custom-device";


    const props = defineProps({
        id: Number
    });

    const comp_name = (id:number) => {
        if(id == 100){
            return "hello";
        }
        return "sample";
    }

    
    const comp = customComponents[comp_name(props.id?? 0)];




</script>

<style scoped>

</style>