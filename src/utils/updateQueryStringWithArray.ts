import type { ShowbagItem } from "../showbags";

export const updateQueryStringWithArray = (name: string, items: ShowbagItem[]) => {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
  
    if (!Array.isArray(items) || items.length === 0) {
        // If items is not an array or it's empty, remove the parameter
        params.delete('name');
        params.delete('items');
    } else {
        // Convert the items array to a comma-separated string and update the parameter
        params.set('name', name);
        params.set('items', items.map(item => item.slug).join(','));
    }
  
    // Update the browser's URL without reloading the page
    const newUrl = `${url.pathname}?${params}`;
    window.history.replaceState({}, '', newUrl);
  }
