export class DateUtils {
    static dateToFr(date){
        return new Date(date).toLocaleDateString("fr", {
            weekday: "long",
            year: "2-digit",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        });
    }

    static compareDate(date1, date2){
        const dateOne = new Date(date1);
        const dateTwo = new Date(date2);
        
        if(dateOne < dateTwo){
            return true;
        }else{
            return false;
        }
    }
}