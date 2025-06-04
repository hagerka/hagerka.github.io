javascript: (() => {
  const iframe = document.querySelector("iframe.qti-sandbox");
  if (!iframe) {
    return null;
  }
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  const trash = iframeDoc.querySelector(".qti-etr-main");
  trash.style = "display:none";
  const keep = iframeDoc.querySelector("#cke_1_contents");
  keep.style.height = "600px";
})();
