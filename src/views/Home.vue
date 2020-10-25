<template>
  <div class="home">
    <XFields />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import XFields from '@/components/fields/index.vue';

@Component({
  components: {
    HelloWorld,
    XFields,
  },
})
export default class Home extends Vue {}
</script>
