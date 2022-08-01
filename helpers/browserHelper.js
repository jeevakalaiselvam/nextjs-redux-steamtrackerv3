export const openLinkInNewTab = (url) => {
  if (typeof window !== "undefined") {
    window.open(url);
  }
};
