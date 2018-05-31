export function strip(html) {
	let tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

export function isEmpty(obj) {
	return Object.keys(obj).length === 0;
}