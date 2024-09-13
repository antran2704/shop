const getDateTime = (timestamps: string) => {
   const date = new Date(timestamps);
   return date.toLocaleDateString("en-GB");
};

export { getDateTime };
