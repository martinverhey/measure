let selectedShapes: any[] = [];

penpot.ui.open("Measure", `?theme=${penpot.theme}`);

penpot.ui.onMessage<string>((message) => {
  console.log(message);
  if (message === "measure-shape") {
    selectedShapes = penpot.selection;
    addMeasurementToSelectedShape();
  }
});

function addMeasurementToSelectedShape() {
  if (!selectedShapes || selectedShapes.length === 0) return;

  selectedShapes.forEach((shape) => {
    const longestDimension = Math.max(shape.width, shape.height);
    
    const dimensionText = `${longestDimension.toFixed(0)}`;
    const newText = penpot.createText(dimensionText);
  
    if (newText) {
      newText.fontSize = '6';
      if (longestDimension == shape.width) {
        newText.x = shape.x + (shape.width / 2) - 3;
        newText.y = shape.y + (shape.height / 2) + 1;
      } else {
        newText.x = shape.x + (shape.width / 2) + 2;
        newText.y = shape.y + (shape.height / 2) - 4;
      }
    }
  })
}

// Update the theme in the iframe
penpot.on("themechange", (theme) => {
  penpot.ui.sendMessage({
    source: "penpot",
    type: "themechange",
    theme,
  });
});
