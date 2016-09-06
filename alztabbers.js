function forget() {
	chrome.windows.getAll({populate:true}, function(windows){
		var tabIds = [];

		windows.forEach(function(window){
			window.tabs.forEach(function(tab){
				console.log(tab);
				if (tab.active) return;
				if (tab.audible) return;
				tabIds.push(tab.id);
			})
		});

		if (tabIds.length > 0) {
			var forgetTabId = tabIds[randInt(0, tabIds.length)];
			chrome.tabs.remove(forgetTabId);
		}

		//setTimer();
	});
}

function setTimer() {
	setTimeout(forget, randInt(30, 60) * (60 * 1000));
}

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

//forget();