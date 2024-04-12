document.getElementById('getToS').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  chrome.tabs.sendMessage(tab.id, { action: 'getTermsOfService', url: tab.url }, (response) => {
    const resultDiv = document.getElementById('result');
    if (response.error) {
      resultDiv.innerText = 'Error: ' + response.error;
    } else {
      resultDiv.innerHTML = `
        <h3>Icons:</h3>
        <ul>${response.icons.map(icon => `<li>${icon}</li>`).join('')}</ul>
        <h3>Summary:</h3>
        <p>${response.summary}</p>
        <h3>Explainer Video:</h3>
        <p>${response.video}</p>
      `;
    }
  });
});
