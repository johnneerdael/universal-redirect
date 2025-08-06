document.getElementById('options-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const site = document.getElementById('site').value;
  const redirectUrl = document.getElementById('redirect-url').value;
  chrome.storage.sync.set({ [site]: redirectUrl }, function() {
    console.log('Settings saved');
  });
});