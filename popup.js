if (!(window != window.top)) {
  document.body.insertAdjacentHTML('beforeend',
    `
      <div class="word-keeper__block" id="word-keeper-block">
        <a title="copy to clipboard" class="word-keeper__icon" id="word-keeper--copy"></a>
        <a title="bookmark this page" class="word-keeper__icon" id="word-keeper--save"></a>
        <a title="find in new tab" class="word-keeper__icon" id="word-keeper--find"></a>
        <a title="translate in translate tab" class="word-keeper__icon" id="word-keeper--translate"></a>
      </div>
    `
  );

  const $block = document.getElementById('word-keeper-block');
  const $save = document.getElementById('word-keeper--save');
  const $translate = document.getElementById('word-keeper--translate');
  const $find = document.getElementById('word-keeper--find');
  const $copy = document.getElementById('word-keeper--copy');

  let selectionString = '';
  
  document.addEventListener("mouseup", function(event){
    let selection = window.getSelection();
    if(selection.toString().length){
      $block.style.opacity = '1';
      $block.style.pointerEvents = 'all';
      $block.style.top = (event.pageY + 15)+'px';
      $block.style.left = (event.pageX - 60)+'px';
      selectionString = selection.toString();
    }else{
      $block.style.opacity = '0';
      $block.style.pointerEvents = 'none';
    }
  });

  $save.onclick = function(){
    if(selectionString.length){

      let title = selectionString;
      let url = window.location.href;

      chrome.runtime.sendMessage({
        'type': 'wk_save',
        'title': title,
        'url': url,
      })
    }
  };
  $find.onclick = function(){
    if(selectionString.length){
      let title = selectionString;
      chrome.runtime.sendMessage({
        'type': 'wk_find',
        'title': title,
      })
    }
  }
  $translate.onclick = function(){
    if(selectionString.length){
      let title = selectionString;
      chrome.runtime.sendMessage({
        'type': 'wk_translate',
        'title': title,
      })
    }
  }
  const copyToClipboard = str => { // https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };
  $copy.onclick = function(){
    if(selectionString.length){
      copyToClipboard(selectionString)
    }
  }
  


}
