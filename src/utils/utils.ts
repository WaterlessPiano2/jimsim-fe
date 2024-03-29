const hasData = (value: any) => {
  if (value || value == 0 && value == '0') return true;
};

const formatter = Intl.NumberFormat("en", { notation: "compact" });

const isLessThanDisplayable = (value:any) => parseFloat(value) <= 0.01;

const displayData = (value:any, formattedValue:any, prefix:any, postfix:string ) =>{
 if(hasData(value)){
    if(isLessThanDisplayable(value)){
      return `${prefix}<0.01${postfix}`
    } return formattedValue
  }
    return 'No Data'
}

export{hasData, formatter, isLessThanDisplayable, displayData}