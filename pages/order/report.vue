<template>
	<view class="report-container">
		<view class="filter-box">
			<view class="date-picker">
				<picker mode="date" :value="startDate" @change="handleStartDateChange">
					<view class="picker">
						{{startDate}}
					</view>
				</picker>
				<text>至</text>
				<picker mode="date" :value="endDate" @change="handleEndDateChange">
					<view class="picker">
						{{endDate}}
					</view>
				</picker>
			</view>
			
			<view class="shop-picker">
				<picker :range="shopOptions" :value="shopIndex" @change="handleShopChange">
					<view class="picker">
						{{shopOptions[shopIndex]}}
					</view>
				</picker>
			</view>
		</view>
		
		<view class="data-overview">
			<view class="data-item">
				<text class="label">订单总数</text>
				<text class="value">{{totalOrders}}</text>
			</view>
			<view class="data-item">
				<text class="label">销售总额</text>
				<text class="value">¥{{totalAmount}}</text>
			</view>
			<view class="data-item">
				<text class="label">退款总额</text>
				<text class="value">¥{{refundAmount}}</text>
			</view>
		</view>
		
		<view class="chart-container">
			<mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId="salesChart" />
		</view>
		
		<view class="table-container">
			<view class="table-header">
				<view class="th">日期</view>
				<view class="th">订单数</view>
				<view class="th">销售额</view>
				<view class="th">退款额</view>
			</view>
			<view class="table-body">
				<view class="tr" v-for="(item, index) in tableData" :key="index">
					<view class="td">{{item.date}}</view>
					<view class="td">{{item.orderCount}}</view>
					<view class="td">¥{{item.salesAmount}}</view>
					<view class="td">¥{{item.refundAmount}}</view>
				</view>
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
			echarts,
			startDate: '2024-03-01',
			endDate: '2024-03-31',
			shopIndex: 0,
			shopOptions: ['全部店铺', '店铺1', '店铺2', '店铺3'],
			totalOrders: 0,
			totalAmount: 0,
			refundAmount: 0,
			tableData: []
		}
	},
	methods: {
		handleStartDateChange(e) {
			this.startDate = e.detail.value
			this.loadData()
		},
		handleEndDateChange(e) {
			this.endDate = e.detail.value
			this.loadData()
		},
		handleShopChange(e) {
			this.shopIndex = e.detail.value
			this.loadData()
		},
		onInit(canvas, width, height) {
			const chart = echarts.init(canvas, null, {
				width: width,
				height: height
			})
			canvas.setChart(chart)
			
			const option = {
				title: {
					text: '销售趋势',
					left: 'center'
				},
				tooltip: {
					trigger: 'axis'
				},
				xAxis: {
					type: 'category',
					data: ['1日', '5日', '10日', '15日', '20日', '25日', '30日']
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					data: [150, 230, 224, 218, 135, 147, 260],
					type: 'line'
				}]
			}
			
			chart.setOption(option)
			return chart
		},
		loadData() {
			// 模拟加载数据
			this.totalOrders = 1234
			this.totalAmount = 56789.00
			this.refundAmount = 1234.00
			
			this.tableData = [
				{ date: '2024-03-01', orderCount: 100, salesAmount: 5000.00, refundAmount: 100.00 },
				{ date: '2024-03-02', orderCount: 120, salesAmount: 6000.00, refundAmount: 200.00 },
				{ date: '2024-03-03', orderCount: 150, salesAmount: 7500.00, refundAmount: 150.00 }
			]
		}
	},
	onLoad() {
		this.loadData()
	}
}
</script>

<style lang="scss">
.report-container {
	padding: 20rpx;
	
	.filter-box {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
		
		.date-picker {
			display: flex;
			align-items: center;
			
			.picker {
				background-color: #fff;
				padding: 10rpx 20rpx;
				border-radius: 8rpx;
				font-size: 28rpx;
			}
			
			text {
				margin: 0 20rpx;
				font-size: 28rpx;
				color: #666;
			}
		}
		
		.shop-picker {
			.picker {
				background-color: #fff;
				padding: 10rpx 20rpx;
				border-radius: 8rpx;
				font-size: 28rpx;
			}
		}
	}
	
	.data-overview {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
		
		.data-item {
			flex: 1;
			background-color: #fff;
			padding: 20rpx;
			border-radius: 8rpx;
			text-align: center;
			
			.label {
				font-size: 24rpx;
				color: #666;
				display: block;
				margin-bottom: 10rpx;
			}
			
			.value {
				font-size: 32rpx;
				color: #333;
				font-weight: bold;
			}
		}
	}
	
	.chart-container {
		width: 100%;
		height: 400rpx;
		background-color: #fff;
		border-radius: 8rpx;
		margin-bottom: 20rpx;
	}
	
	.table-container {
		background-color: #fff;
		border-radius: 8rpx;
		overflow: hidden;
		
		.table-header {
			display: flex;
			background-color: #f5f5f5;
			
			.th {
				flex: 1;
				text-align: center;
				padding: 20rpx;
				font-size: 28rpx;
				color: #333;
				font-weight: bold;
			}
		}
		
		.table-body {
			.tr {
				display: flex;
				border-bottom: 1px solid #f5f5f5;
				
				&:last-child {
					border-bottom: none;
				}
				
				.td {
					flex: 1;
					text-align: center;
					padding: 20rpx;
					font-size: 28rpx;
					color: #666;
				}
			}
		}
	}
}
</style> 