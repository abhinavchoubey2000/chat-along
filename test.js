const time = new Date().toLocaleTimeString("en-US", {
	hour: "2-digit",
	minute: "2-digit",
	hour12: true,
	month: "short",
	year: "2-digit",
	day: "2-digit",
});
console.log(time);
