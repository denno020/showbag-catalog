type SetQueryParam = {
  name: string;
  value: string | number;
};

export const setQueryParam = (params: SetQueryParam[], type: 'push' | 'replace') => {
  let url = new URL(window.location.href);
  let searchParams = new URLSearchParams(url.search);

  params.forEach(({ name, value }) => {
    if (value === null) {
      searchParams.delete(name);
      return;
    }

    searchParams.set(name, String(value));
  });

  const newUrl = `${url.pathname}?${searchParams.toString()}`;
  switch (type) {
    case 'push':
      window.history.pushState({}, '', newUrl);
      break;
    case 'replace':
      window.history.replaceState({}, '', newUrl);
      break;
  }
};
