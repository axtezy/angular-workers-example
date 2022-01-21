addEventListener('message', ({ data }) => {
  if (data.type === 'calc') {

    // const sum = array.reduce(prev => {
    //   return prev+(Math.random()**Math.random()**Math.random());
    // });
    // const avg = sum/length;
    console.log(Date.now())
    postMessage('avg');
  }
  postMessage('unknown');
});
