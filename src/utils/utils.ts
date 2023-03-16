const hasData = (value: any) => {
  if (value !== null || value !== undefined) return true;
};

const formatter = Intl.NumberFormat("en", { notation: "compact" });

export{hasData, formatter}