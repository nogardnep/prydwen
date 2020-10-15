/// <reference lib="webworker" />

// addEventListener('message', ({ data }) => {
//   const response = `aaaaaaaaaaa ${data}`;
//   postMessage(response);
// });

// console.log(MessageTypes);

let expected: number;
let timeout: any; // TODO
const delay = 1;
let timeInterval = 1000;

const moveOn = (): void => {
  if (Date.now() >= expected) {
    // this.callback();
    // @ts-ignore
    self.postMessage({
      type: 'tick',
    });
    expected += timeInterval;
  }

  timeout = setTimeout(() => {
    moveOn();
  }, delay);
};

const stop = (): void => {
  if (timeout !== null) {
    clearTimeout(timeout);
  }
};

self.onmessage = (event) => {
  switch (event.data.type) {
    case 'start':
      stop();
      expected = Date.now();
      moveOn();
      break;
    case 'stop':
      stop();
      break;
    case 'interval':
      timeInterval = event.data.value;
      break;
  }
};
