export default {
  dateFormat(dateObj) {
    return dateObj.toISOString().substr(5,5).replace('-','/');
  },

  daysDiff(date1, date2) {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
  },

  strip(html) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  },

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
}
