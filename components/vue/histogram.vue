<template lang="jade">
  div
</template>

<script>
/* eslint-disable */
import Vue from 'Vue'
import {histogram} from '../../lib/histogram'

export default {
  name: 'histogram',
  data () {
    return {
      open: false
    }
  },
  created () {
    histogram(this.$el)
  },
  computed: {
  },
  props: {
  },
  ready () {},
  attached () {},
  methods: {
  },
  components: {}
}
</script>

<style lang="scss">
</style>
