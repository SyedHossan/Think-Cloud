(function () {
  const CONTAINER_ID = "tc_toastContainer";

  function ensureContainer() {
    let el = document.getElementById(CONTAINER_ID);
    if (el) return el;

    el = document.createElement("div");
    el.id = CONTAINER_ID;
    el.className = "tc-toast-container";
    document.body.appendChild(el);
    return el;
  }

  function showToast(message, type) {
    if (!message) return;
    const container = ensureContainer();

    const toast = document.createElement("div");
    toast.className = "tc-toast";
    if (type) toast.classList.add(`tc-toast--${type}`);
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("tc-toast--hide");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 2200);
  }

  window.showToast = showToast;
})();

