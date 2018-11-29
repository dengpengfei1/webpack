import _ from 'lodash';
import '../css/index.css';
import img from '../assets/1.png';
import print from './print';

function element() {
  let ele = document.createElement('div');
  ele.innerText = _.join(['webpack', 'demo'], '-');
  let testImage = new Image();
  testImage.src = img;
  ele.appendChild(testImage);

  let btn = document.createElement('button');
  btn.innerText = 'PRINT';
  btn.addEventListener('click', print);
  ele.appendChild(btn);

  return ele;
}

document.body.appendChild(element());
