import Manager from './manager';

window.onload = () => {
  Manager.start({
    width: 1100,
    height: 575,
    canvas: document.getElementById("canvas")
  });
}