document.addEventListener('DOMContentLoaded', () => {
    const reloadBtn = document.getElementById('reload-btn');
    const shortenBtn = document.getElementById('shorten-btn');
    const urlInput = document.getElementById('url-to-shorten');
    const viewTextField = document.getElementById('view-text-field');
  
    reloadBtn.addEventListener('click', () => {
      location.reload();
      urlInput.value = "";
      viewTextField.value = ""
    });
  
    shortenBtn.addEventListener('click', shortenUrl);
  
    function shortenUrl() {
      const originalUrl = urlInput.value.trim();
  
      if (!originalUrl) {
        viewTextField.value = "Please enter a URL.";
        return;
      }
  
      const encodedUrl = encodeURIComponent(originalUrl);
      const apiUrl = `https://tinyurl.com/api-create.php?url=${encodedUrl}`;
  
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(data => {
          viewTextField.value = data;
        })
        .catch(error => {
          viewTextField.value = `Error: Unable to shorten the URL. ${error.message}`;
        });
    }
  });
  