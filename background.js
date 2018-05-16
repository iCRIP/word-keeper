chrome.runtime.onInstalled.addListener(function(details){ // installation
  chrome.bookmarks.search('WK Folder', function(res){
    if(!res.length){
      chrome.bookmarks.create({
        parentId: '1',
        title: 'WK Folder',
        url: null
      })
    }
  })
  console.log('WK installed');
});


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  
  if(message.type === 'wk_save'){
    chrome.bookmarks.search('WK Folder', function(res){
      chrome.bookmarks.create({
        'parentId': res[0].id,
        'title': message.title,
        'url': message.url,
      })  
    })
  }
  function toQueryString(string){
    return string.split(' ').join('+');
  }
  if(message.type === 'wk_find'){
    chrome.tabs.create({
      'url': 'https://www.google.com/search?q='+toQueryString(message.title)
    })
  }
  if(message.type === 'wk_translate'){
    chrome.tabs.create({
      'url': 'https://translate.google.com/#en/ru/'+toQueryString(message.title)
    })
  }
});

