export function compareDateStringWithDateCurrent(string){
    let datePoste = new Date(string).getTime();
    let dateCurrent = new Date().getTime();
    if(datePoste < dateCurrent){
      return false;
    }else{
      return true;
    }
  }

  export function compareTwoDateString(date1,date2){
    let dateA = new Date(date1).getTime();
    let dateB = new Date(date2).getTime();
    if(dateA > dateB){
      return "+";
    }else if(dateA < dateB){
      return "-";
    }else{
        return "=";
    }
  }