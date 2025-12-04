import { LineElement, MoveElement, FlashElement, ArcElement } from './elements.js';

export function createElement(command) {
  if (/D01/.test(command)) return new LineElement(command);
  if (/D02/.test(command)) return new MoveElement(command);
  if (/D03/.test(command)) return new FlashElement(command);
  if (/G0[23]/.test(command)) return new ArcElement(command);
  return null; // Unknown element
}
