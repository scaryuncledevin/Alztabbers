function forget() {
	chrome.windows.getAll({
		populate:true
	}, function(windows){
		var tabIds = [];

		windows.forEach(function(window){
			window.tabs.forEach(function(tab){
				if (tab.active) return;
				if (tab.audible) return;
				tabIds.push(tab.id);
			})
		});

		if (tabIds.length > 0) {
			var forgetTabId = tabIds[randInt(0, tabIds.length)];
			chrome.tabs.remove(forgetTabId);
		}

		setTimer();
	});
}

function remember() {
	chrome.windows.getAll(function(windows){

		var windowIds = [];

		windows.forEach(function(window){
			windowIds.push(window.id);
		});
	
		chrome.history.search({
			text:'',
			startTime:Date.now() - (24 * 60 * 60 * 1000),
			endTime:Date.now() - (60 * 60 * 1000)
		}, function(results){
			var urls = [];
			
			results.forEach(function(result){
				var url = result.url || '';
				if (url.length > 0) {
					urls.push(url);
				}
			});

			if (urls.length > 0 && windowIds.length > 0) {
				var url = randFrom(urls);
				var windowId = randFrom(windowIds);
				var active = randFrom([true, false]);
				chrome.tabs.create({windowId, url,active});
			}

			setTimer();
		})
	});
}

function setTimer() {
	setTimeout(randFrom([forget, remember]), randInt(30, 60) * (60 * 1000));
}

function randFrom(arr) {
	return arr[randInt(0, arr.length)];
}

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

randFrom([forget, remember])();