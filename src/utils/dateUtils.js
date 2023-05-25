/*
包含n个日期时间处理的工具函数模块
*/

/*
  格式化日期
*/
export function formateDate() {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  // console.log(`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`);
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
// formateDate();