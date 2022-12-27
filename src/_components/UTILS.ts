import dayjs from "dayjs";

export function formatDate(st:string){
   return dayjs(st).format('YYYY-MM-DD HH:mm:ss')
}