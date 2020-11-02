<template>
  <div style="padding: 10px" class="home">
    <XFuck />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import XFuck from '@/components/fuck';

@Component({
  components: {
    HelloWorld,
    XFuck,
  },
})
export default class Home extends Vue {}
</script>
