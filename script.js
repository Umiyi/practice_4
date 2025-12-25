function byCode(code){
  return document.querySelector(`.key[data-code="${CSS.escape(code)}"]`);
}

function setLed(id, on){
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle("led--on", !!on);
}

function syncLocks(e){
  if (!e.getModifierState) return;

  const caps = e.getModifierState("CapsLock");
  const num  = e.getModifierState("NumLock");
  const scr  = e.getModifierState("ScrollLock");

  setLed("led-caps", caps);
  setLed("led-num", num);
  setLed("led-scr", scr);

  document.querySelectorAll('[data-toggle="caps"]').forEach(k => k.classList.toggle("key--active", caps));
  document.querySelectorAll('[data-toggle="num"]').forEach(k => k.classList.toggle("key--active", num));
}

window.addEventListener("keydown", (e) => {
  const el = byCode(e.code);
  if (el) el.classList.add("key--pressed");
  syncLocks(e);
});

window.addEventListener("keyup", (e) => {
  const el = byCode(e.code);
  if (el) el.classList.remove("key--pressed");
  syncLocks(e);
});

document.querySelectorAll(".key--toggle").forEach(btn => {
  btn.addEventListener("click", () => btn.classList.toggle("key--active"));
});
