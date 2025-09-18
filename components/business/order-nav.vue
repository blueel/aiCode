<template>
  <view class="order-nav-container">
    <view 
      v-for="(item, index) in navItems" 
      :key="index"
      class="nav-item"
      :class="{ 'active': activeIndex === index }"
      @click="handleNavClick(index, item.path)"
    >
      {{ item.title }}
    </view>
  </view>
</template>

<script>
export default {
  props: {
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      navItems: [
        { title: '销售订单', path: '/pages/order/sales' },
        { title: '异常订单', path: '/pages/order/abnormal' },
        { title: '退款订单', path: '/pages/order/refund' }
      ]
    }
  },
  methods: {
    handleNavClick(index, path) {
      this.$emit('change', index)
      uni.navigateTo({
        url: path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order-nav-container {
  width: 240rpx;
  background-color: #f8f8f8;
  padding: 20rpx 0;

  .nav-item {
    padding: 30rpx 40rpx;
    font-size: 28rpx;
    color: #666;
    transition: all 0.3s;

    &.active {
      color: #3cc51f;
      background-color: #e8f5e9;
      border-left: 6rpx solid #3cc51f;
    }

    &:active {
      background-color: #e0e0e0;
    }
  }
}
</style>