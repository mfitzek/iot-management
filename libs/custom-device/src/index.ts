import { defineAsyncComponent } from 'vue';
export default { 
    "hello": defineAsyncComponent(()=> import("./lib/HelloWorld.vue")),
    "sample": defineAsyncComponent(()=> import("./lib/Sample.vue")),
};
