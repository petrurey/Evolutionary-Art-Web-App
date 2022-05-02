/* @author Petru Rey
 *  @date 2 May 2022
 */

function squareFract(startX, startY, len, n) {
  fract = spawnRect(startX - x1, startY - y1, len, len);

  getShapeAttributes();

  fract.fill = shapeColor;
  fract.strokeWidth = strokeVar;
  fract.strokeColor = strokeCol;

  if (n == 0) {
    return;
  }

  fractParent.addChild(fract);

  squareFract(startX + len, startY + len, len * 0.8, n - 1);
}

function circleFract(startX, startY, len, n) {
  fract = spawnCircle(startX - x1, startY - y1, len);

  getShapeAttributes();

  fract.fill = shapeColor;
  fract.strokeWidth = strokeVar;
  fract.strokeColor = strokeCol;

  if (n == 0) {
    return;
  }

  fractParent.addChild(fract);

  circleFract(startX + len, startY + len, len * 0.8, n - 1);
}

function polyFract(startX, startY, sides, len, n) {
  fract = spawnPoly(startX - x1, startY - y1, sides, len);

  getShapeAttributes();

  fract.fill = shapeColor;
  fract.strokeWidth = strokeVar;
  fract.strokeColor = strokeCol;
  fract.sides = polySides;

  if (n == 0) {
    return;
  }

  fractParent.addChild(fract);

  polyFract(startX + len, startY + len, polySides, len * 0.8, n - 1);
}
