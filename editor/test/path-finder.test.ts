import { PathFinder } from "../src/path-finder";

const rows = 10;
const cols = 10;
const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
const pf = new PathFinder(rows, cols, grid);

test("simple test 1", () => {
  let res = pf.aStarSearch([0, 0], [9, 9]);
  let expected = [
    [0, 0],
    [0, 8],
    [9, 8],
    [9, 9],
  ];
  expect(res).toEqual(expected);
});

test("simple test 2", () => {
  let res = pf.aStarSearch([0, 0], [3, 3]);
  let expected = [
    [0, 0],
    [2, 0],
    [2, 3],
    [3, 3],
  ];
  expect(res).toEqual(expected);
});
