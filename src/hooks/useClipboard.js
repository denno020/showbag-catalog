/**
 * Provide a copyTextToClipboard function that will use a fallback when modern API's aren't available
 * Functions came from a great SO writeup: https://stackoverflow.com/a/30810322/1560593
 *
 * @returns {{copyTextToClipboard: function}}
 */
export const useClipboard = () => {
    function fallbackCopyTextToClipboard(text) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
  
      // Avoid scrolling to bottom
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.position = 'fixed';
  
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
  
      return new Promise((res, rej) => {
        try {
          const successful = document.execCommand('copy');
          const msg = successful ? 'successful' : 'unsuccessful';
          console.log('Fallback: Copying text command was ' + msg);
          res();
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
          rej();
        }
  
        document.body.removeChild(textArea);
      });
    }
  
    function copyTextToClipboard(text) {
      if (!navigator.clipboard) {
        return fallbackCopyTextToClipboard(text);
      }
  
      return new Promise((res, rej) => {
        navigator.clipboard.writeText(text).then(
          function() {
            console.log('Async: Copying to clipboard was successful!');
            res();
          },
          function(err) {
            console.error('Async: Could not copy text: ', err);
            rej();
          }
        );
      });
    }
  
    return {
      copyTextToClipboard
    };
  };
  