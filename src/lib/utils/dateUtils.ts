/**
 * 格式化運行時間（分鐘轉換為小時和分鐘）
 * @param minutes 總分鐘數
 * @returns 格式化後的字串，例如 "2h 30m"
 */
export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

/**
 * 格式化日期字串為中文格式
 * @param dateString ISO 日期字串
 * @returns 格式化後的中文日期字串，例如 "2023年12月25日"
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};

/**
 * 格式化日期為月/日格式
 * @param dateString ISO 日期字串
 * @returns 格式化後的月/日字串，例如 "12/25"
 */
export const formatMonthDay = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
};
