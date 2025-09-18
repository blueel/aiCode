			// 定义一个方法，根据 type 返回不同的日期
			getDateByType(type) {
			  const now = new Date(); // 获取当前时间
			
			  // 根据 type 判断返回的日期
			  if (type === 1) {
			    // 返回当天的日期
			    return this.formatDate(now);
			  } else if (type === 2) {
			    // 返回当前日期加一天的日期
			    const nextDay = new Date(now);
			    nextDay.setDate(now.getDate() + 1); // 日期加一天
			    return this.formatDate(nextDay);
			  } else {
			    // 默认返回当天日期
			    return this.formatDate(now);
			  }
			},
			
			// 辅助函数：格式化日期为 "月份-日期"
			formatDate(date) {
			  const month = date.getMonth() + 1; // 月份从 0 开始，需要加 1
			  const day = date.getDate();
			  return `${month}-${day}`;
			}, 