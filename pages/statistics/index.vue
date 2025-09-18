<template>
	<view class="statistics-container">
		<view class="header">
			<view class="date-filter">
				<picker mode="date" fields="month" :value="date" @change="handleDateChange">
					<view class="date-value">{{date}}</view>
				</picker>
			</view>
			<button class="export-btn" @tap="handleExport">导出数据</button>
		</view>
		
		<view class="filter-box">
			<picker :value="shopIndex" :range="shopOptions" @change="handleShopChange">
				<view class="filter-item">
					<text class="label">店铺：</text>
					<text class="value">{{shopOptions[shopIndex]}}</text>
				</view>
			</picker>
			
			<picker :value="categoryIndex" :range="categoryOptions" @change="handleCategoryChange">
				<view class="filter-item">
					<text class="label">商品类别：</text>
					<text class="value">{{categoryOptions[categoryIndex]}}</text>
				</view>
			</picker>
		</view>
		
		<view class="data-overview">
			<view class="data-card">
				<view class="title">总销售额</view>
				<view class="value">¥{{overview.totalAmount}}</view>
				<view class="trend" :class="overview.amountTrend >= 0 ? 'up' : 'down'">
					<text class="iconfont" :class="overview.amountTrend >= 0 ? 'icon-up' : 'icon-down'"></text>
					<text>{{Math.abs(overview.amountTrend)}}%</text>
				</view>
			</view>
			
			<view class="data-card">
				<view class="title">订单数量</view>
				<view class="value">{{overview.orderCount}}</view>
				<view class="trend" :class="overview.orderTrend >= 0 ? 'up' : 'down'">
					<text class="iconfont" :class="overview.orderTrend >= 0 ? 'icon-up' : 'icon-down'"></text>
					<text>{{Math.abs(overview.orderTrend)}}%</text>
				</view>
			</view>
			
			<view class="data-card">
				<view class="title">会员数量</view>
				<view class="value">{{overview.memberCount}}</view>
				<view class="trend" :class="overview.memberTrend >= 0 ? 'up' : 'down'">
					<text class="iconfont" :class="overview.memberTrend >= 0 ? 'icon-up' : 'icon-down'"></text>
					<text>{{Math.abs(overview.memberTrend)}}%</text>
				</view>
			</view>
			
			<view class="data-card">
				<view class="title">商品数量</view>
				<view class="value">{{overview.goodsCount}}</view>
				<view class="trend" :class="overview.goodsTrend >= 0 ? 'up' : 'down'">
					<text class="iconfont" :class="overview.goodsTrend >= 0 ? 'icon-up' : 'icon-down'"></text>
					<text>{{Math.abs(overview.goodsTrend)}}%</text>
				</view>
			</view>
		</view>
		
		<view class="chart-box">
			<view class="chart-title">销售趋势</view>
			<view class="chart-container">
				<mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId="salesChart" />
			</view>
		</view>
		
		<view class="data-list">
			<view class="list-title">店铺销售排行</view>
			<view class="list-item" v-for="(item, index) in shopRanking" :key="index">
				<view class="rank">{{index + 1}}</view>
				<view class="shop-info">
					<view class="shop-name">{{item.name}}</view>
					<view class="shop-amount">销售额：¥{{item.amount}}</view>
				</view>
				<view class="order-count">{{item.orderCount}}单</view>
			</view>
		</view>
		
		<view class="data-list">
			<view class="list-title">商品销售排行</view>
			<view class="list-item" v-for="(item, index) in goodsRanking" :key="index">
				<view class="rank">{{index + 1}}</view>
				<view class="goods-info">
					<view class="goods-name">{{item.name}}</view>
					<view class="goods-amount">销售额：¥{{item.amount}}</view>
				</view>
				<view class="sales-count">{{item.salesCount}}件</view>
			</view>
		</view>
		
		<view class="data-list">
			<view class="list-title">会员消费排行</view>
			<view class="list-item" v-for="(item, index) in memberRanking" :key="index">
				<view class="rank">{{index + 1}}</view>
				<view class="member-info">
					<view class="member-name">{{item.name}}</view>
					<view class="member-amount">消费金额：¥{{item.amount}}</view>
				</view>
				<view class="order-count">{{item.orderCount}}单</view>
			</view>
		</view>
	</view>
</template>

<script>
import * as echarts from 'echarts'
import mpvueEcharts from 'mpvue-echarts'

export default {
	components: {
		mpvueEcharts
	},
	data() {
		return {
			date: '2024-03',
			overview: {
				totalAmount: 99999.99,
				amountTrend: 12.5,
				orderCount: 1000,
				orderTrend: 8.3,
				memberCount: 500,
				memberTrend: 5.2,
				goodsCount: 2000,
				goodsTrend: 3.1
			},
			shopRanking: [
				{
					name: '示例店铺1',
					amount: 50000,
					orderCount: 300
				},
				{
					name: '示例店铺2',
					amount: 30000,
					orderCount: 200
				},
				{
					name: '示例店铺3',
					amount: 20000,
					orderCount: 150
				}
			],
			goodsRanking: [
				{
					name: '示例商品1',
					amount: 30000,
					salesCount: 500
				},
				{
					name: '示例商品2',
					amount: 20000,
					salesCount: 300
				},
				{
					name: '示例商品3',
					amount: 10000,
					salesCount: 200
				}
			],
			memberRanking: [
				{
					name: '示例会员1',
					amount: 50000,
					orderCount: 50
				},
				{
					name: '示例会员2',
					amount: 30000,
					orderCount: 30
				},
				{
					name: '示例会员3',
					amount: 20000,
					orderCount: 20
				}
			],
			shopIndex: 0,
			shopOptions: ['全部店铺', '示例店铺1', '示例店铺2', '示例店铺3'],
			categoryIndex: 0,
			categoryOptions: ['全部类别', '服装', '食品', '电子产品', '日用品'],
			echarts,
			onInit: function(canvas, width, height) {
				const chart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(chart)
				
				const option = {
					color: ['#67c23a', '#409eff'],
					legend: {
						data: ['销售额', '订单数'],
						top: 0
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					tooltip: {
						trigger: 'axis'
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [
						{
							name: '销售额',
							type: 'line',
							data: []
						},
						{
							name: '订单数',
							type: 'line',
							data: []
						}
					]
				}
				
				chart.setOption(option)
				return chart
			}
		}
	},
	methods: {
		handleDateChange(e) {
			this.date = e.detail.value
			this.getStatisticsData()
		},
		handleShopChange(e) {
			this.shopIndex = e.detail.value
			this.getStatisticsData()
		},
		handleCategoryChange(e) {
			this.categoryIndex = e.detail.value
			this.getStatisticsData()
		},
		handleExport() {
			uni.showActionSheet({
				itemList: ['导出Excel', '导出PDF'],
				success: (res) => {
					if (res.tapIndex === 0) {
						this.exportExcel()
					} else {
						this.exportPDF()
					}
				}
			})
		},
		exportExcel() {
			uni.showLoading({
				title: '导出中...'
			})
			
			// 模拟导出Excel
			setTimeout(() => {
				uni.hideLoading()
				uni.showToast({
					title: '导出成功',
					icon: 'success'
				})
			}, 1000)
		},
		exportPDF() {
			uni.showLoading({
				title: '导出中...'
			})
			
			// 模拟导出PDF
			setTimeout(() => {
				uni.hideLoading()
				uni.showToast({
					title: '导出成功',
					icon: 'success'
				})
			}, 1000)
		},
		getStatisticsData() {
			uni.showLoading({
				title: '加载中...'
			})
			
			// 模拟获取统计数据
			setTimeout(() => {
				// 根据筛选条件获取数据
				const shopId = this.shopIndex === 0 ? null : this.shopIndex
				const categoryId = this.categoryIndex === 0 ? null : this.categoryIndex
				
				// 模拟销售趋势数据
				const categories = []
				const amountData = []
				const orderData = []
				
				for (let i = 1; i <= 31; i++) {
					categories.push(`${i}日`)
					amountData.push(Math.floor(Math.random() * 10000))
					orderData.push(Math.floor(Math.random() * 100))
				}
				
				const chart = echarts.getInstanceByDom(document.getElementById('salesChart'))
				if (chart) {
					chart.setOption({
						xAxis: {
							data: categories
						},
						series: [
							{
								data: amountData
							},
							{
								data: orderData
							}
						]
					})
				}
				
				// 模拟商品销售排行数据
				this.goodsRanking = this.goodsRanking.map(item => ({
					...item,
					amount: Math.floor(Math.random() * 50000),
					salesCount: Math.floor(Math.random() * 1000)
				})).sort((a, b) => b.amount - a.amount)
				
				// 模拟会员消费排行数据
				this.memberRanking = this.memberRanking.map(item => ({
					...item,
					amount: Math.floor(Math.random() * 100000),
					orderCount: Math.floor(Math.random() * 100)
				})).sort((a, b) => b.amount - a.amount)
				
				uni.hideLoading()
			}, 1000)
		}
	},
	onLoad() {
		this.getStatisticsData()
	}
}
</script>

<style lang="scss">
.statistics-container {
	padding: 20rpx;
	
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		
		.date-filter {
			.date-value {
				width: 200rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				background-color: #fff;
				border-radius: 8rpx;
				font-size: 28rpx;
				color: #333;
			}
		}
		
		.export-btn {
			width: 160rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			background-color: #3cc51f;
			color: #fff;
			font-size: 28rpx;
			border-radius: 8rpx;
		}
	}
	
	.filter-box {
		background-color: #fff;
		border-radius: 8rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		
		.filter-item {
			display: flex;
			align-items: center;
			
			.label {
				font-size: 28rpx;
				color: #666;
				margin-right: 10rpx;
			}
			
			.value {
				font-size: 28rpx;
				color: #333;
			}
		}
	}
	
	.data-overview {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20rpx;
		margin-bottom: 20rpx;
		
		.data-card {
			background-color: #fff;
			border-radius: 8rpx;
			padding: 20rpx;
			
			.title {
				font-size: 24rpx;
				color: #666;
				margin-bottom: 10rpx;
			}
			
			.value {
				font-size: 36rpx;
				color: #333;
				font-weight: bold;
				margin-bottom: 10rpx;
			}
			
			.trend {
				font-size: 24rpx;
				
				&.up {
					color: #67c23a;
				}
				
				&.down {
					color: #f56c6c;
				}
				
				.iconfont {
					margin-right: 5rpx;
				}
			}
		}
	}
	
	.chart-box {
		background-color: #fff;
		border-radius: 8rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
		
		.chart-title {
			font-size: 28rpx;
			color: #333;
			font-weight: bold;
			margin-bottom: 20rpx;
		}
		
		.chart-container {
			height: 400rpx;
			width: 100%;
		}
	}
	
	.data-list {
		background-color: #fff;
		border-radius: 8rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
		
		.list-title {
			font-size: 28rpx;
			color: #333;
			font-weight: bold;
			margin-bottom: 20rpx;
		}
		
		.list-item {
			display: flex;
			align-items: center;
			padding: 20rpx 0;
			border-bottom: 1px solid #f5f5f5;
			
			&:last-child {
				border-bottom: none;
			}
			
			.rank {
				width: 60rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				background-color: #f5f5f5;
				border-radius: 50%;
				font-size: 28rpx;
				color: #666;
				margin-right: 20rpx;
			}
			
			.shop-info,
			.goods-info,
			.member-info {
				flex: 1;
				
				.shop-name,
				.goods-name,
				.member-name {
					font-size: 28rpx;
					color: #333;
					margin-bottom: 10rpx;
				}
				
				.shop-amount,
				.goods-amount,
				.member-amount {
					font-size: 24rpx;
					color: #666;
				}
			}
			
			.order-count,
			.sales-count {
				font-size: 28rpx;
				color: #333;
			}
		}
	}
}
</style> 