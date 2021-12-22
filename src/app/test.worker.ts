/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  if (data === 'calc') {
    const length = 30_000_000;
    const array = new Array(length).fill(0);
    const sum = array.reduce(prev => {
      return prev+(Math.random()**Math.random()**Math.random());
    })
    const avg = sum/length;
    postMessage(avg);
  }
  postMessage('unknown');
});
