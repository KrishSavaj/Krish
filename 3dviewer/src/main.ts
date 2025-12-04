import './style.css';
import { renderer } from './renderer'

async function loadConfig() {
  const response = await fetch('./input.json');
  return response.json();
}

async function main() {
  const input = await loadConfig();

  const container = document.body;

renderer(
  container,
  input.containerSize.width,
  input.containerSize.height,
  input.containerSize.scale,
  input.models,
  input.holes,
  input.texts,
  input.wires
);
}

main().catch(console.error);
