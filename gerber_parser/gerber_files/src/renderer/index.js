const iconData = [
  { name: "home", iconClass: "home", iconDescription: "Go to home" },
  { name: "search", iconClass: "search", iconDescription: "Go to search" },
  {
    name: "settings",
    iconClass: "settings",
    iconDescription: "Go to Settings",
  },
  {
    name: "favorite",
    iconClass: "favorite",
    iconDescription: "Go to Favourites",
  },
  { name: "info", iconClass: "info", iconDescription: "Go to Info" },
  { name: "alarm", iconClass: "alarm", iconDescription: "Go to Alarm" },
  {
    name: "account_circle",
    iconClass: "account_circle",
    iconDescription: "Go to Account",
  },
  {
    name: "shopping_cart",
    iconClass: "shopping_cart",
    iconDescription: "Go to Cart",
  },
  { name: "email", iconClass: "email", iconDescription: "Go to Email" },
];

var config = {
  content: [
    {
      type: "column",
      content: [
        {
          type: "component",
          height: 10,
          componentName: "ToolBar",
          componentState: { icons: iconData },
        },
        {
          type: "row",
          height: 70,
          content: [
            {
              type: "column",
              width: 20,
              content: [
                {
                  type: "component",
                  height: 30, //50 b4
                  componentName: "Config",
                  componentState: { state: "Config Panel" },
                },
                {
                  type: "component",
                  height: 40,
                  componentName: "Shapes",
                  componentState: {},
                },
                {
                  type: "component",
                  height: 30, //50 b4
                  componentName: "Hash Table",
                  componentState: {},
                },
              ],
            },
            {
              type: "stack",
              width: 60,
              content: [
                {
                  type: "component",
                  componentName: "Workspace 1",
                  componentState: { text: "Workspace 1" },
                },
                {
                  type: "component",
                  componentName: "Workspace 2",
                  componentState: { text: "Workspace 2" },
                },
              ],
            },
            {
              type: "component",
              width: 20,
              componentName: "ToolBar 2",
              componentState: { text: "Right Panel" },
            },
          ],
        },
        {
          type: "stack",
          height: 20,
          content: [
            {
              type: "component",
              componentName: "Terminal",
              componentState: { text: "Terminal Panel" },
            },
            {
              type: "component",
              componentName: "Status",
              componentState: { text: "Status Panel" },
            },
          ],
        },
      ],
    },
  ],
};

var myLayout = new window.GoldenLayout(config, $("#layoutContainer"));

// Global variable to hold a reference to Workspace 1's container element
let workspace1Container = null;

myLayout.registerComponent("ToolBar", function (container, state) {
  container.getElement().css("background-color", "#FFFFFF");

  // Create a container for the toolbar icons
  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";
  toolbar.id = "toolbar";

  // Loop through the icons provided in state.icons
  state.icons.forEach((icon) => {
    // Create an icon element (using Material Icons)
    const iconElement = document.createElement("i");
    iconElement.className = "material-icons icon";
    iconElement.textContent = icon.iconClass; // icon name, e.g. "home"
    iconElement.title = icon.iconDescription; // native tooltip
    toolbar.appendChild(iconElement);
  });

  // Append the toolbar to the container element
  container.getElement().append(toolbar);
});

// myLayout.registerComponent("Workspace 1", function (container, state) {
//   const $elem = container.getElement();
//   // Use background color from config or a default color if not provided
//   $elem.css("background-color", "#FFFFFF");
//   $elem.attr("id", "workspace1"); // assign a unique ID
//   $elem.html("<h2>" + state.text + "</h2>");
//   workspace1Container = $elem;
//   console.log("Workspace 1 initialized");
// });

myLayout.registerComponent("Workspace 1", function (container, state) {
  const $elem = container.getElement();
  $elem.css("background-color", "#FFFFFF");
  $elem.attr("id", "workspace1");
  $elem.html("<h2>" + state.text + "</h2>");
  workspace1Container = $elem;
  
  // Allow the workspace to accept dropped elements.
  $elem.on("dragover", function (e) {
    e.preventDefault(); // Prevent default to allow drop
  });

  // Handle the drop event
  $elem.on("drop", function (e) {
    e.preventDefault();
    // Get the shape type from the drag event
    const shapeType = e.originalEvent.dataTransfer.getData("text/plain");
    if (shapeType) {
      // Create an element to represent the dropped shape.
      // For example, a div with a class name indicating the shape.
      const shapeElem = $("<div></div>")
        .addClass("dropped-shape")
        .text(shapeType)
        .css({
          // Optionally, add some basic styling
          border: "1px solid #333",
          padding: "10px",
          margin: "5px",
          display: "inline-block",
          "border-radius": shapeType === "cube" ? "0" : "50%" // Example styling
        });

      // Append the shape element to the workspace.
      $elem.append(shapeElem);
    }
  });

  console.log("Workspace 1 initialized");
});



myLayout.registerComponent("Workspace 2", function (container, state) {
  container.getElement().css("background-color", "#FFFFFF");
  container.getElement().html("<h2>" + state.text + "</h2>");
});

// Updated Config component with color options
myLayout.registerComponent("Config", function (container, state) {
  container.getElement().css("background-color", "#FFFFFF");

  // Create a container for configuration options
  const configForm = document.createElement("div");
  configForm.className = "config-form";

  // Option 1: Workspace background color
  const workspaceLabel = document.createElement("label");
  workspaceLabel.textContent = "Workspace Background: ";
  const workspaceInput = document.createElement("input");
  workspaceInput.type = "color";
  workspaceInput.value = "#FFFFFF"; // default value
  workspaceLabel.appendChild(workspaceInput);

  // Option 2: Toolbar background color
  const toolbarLabel = document.createElement("label");
  toolbarLabel.textContent = "Toolbar Background: ";
  const toolbarInput = document.createElement("input");
  toolbarInput.type = "color";
  toolbarInput.value = "#FFFFFF"; // default value
  toolbarLabel.appendChild(toolbarInput);

  // Option 3: Toolbar icon color
  const iconLabel = document.createElement("label");
  iconLabel.textContent = "Toolbar Icon Color: ";
  const iconInput = document.createElement("input");
  iconInput.type = "color";
  iconInput.value = "#333333"; // default icon color
  iconLabel.appendChild(iconInput);

  // Append all labels (with inputs) to the form
  configForm.appendChild(workspaceLabel);
  configForm.appendChild(document.createElement("br"));
  configForm.appendChild(toolbarLabel);
  configForm.appendChild(document.createElement("br"));
  configForm.appendChild(iconLabel);

  container.getElement().append(configForm);

  // Event listeners to update component colors live

  // Update Workspace 1's background color (workspace has id "workspace1")
  workspaceInput.addEventListener("input", function (e) {
    const color = e.target.value;
    const workspaceElem = document.getElementById("workspace1");
    if (workspaceElem) {
      workspaceElem.style.backgroundColor = color;
    }
  });

  // Update the toolbar's background color (toolbar has id "toolbar")
  toolbarInput.addEventListener("input", function (e) {
    const color = e.target.value;
    const toolbarElem = document.getElementById("toolbar");
    if (toolbarElem) {
      toolbarElem.style.backgroundColor = color;
    }
  });

  // Update the color of each icon in the toolbar
  iconInput.addEventListener("input", function (e) {
    const color = e.target.value;
    const icons = document.querySelectorAll("#toolbar .icon");
    icons.forEach((icon) => {
      icon.style.color = color;
    });
  });
});

// Add this with other component registrations
myLayout.registerComponent("Shapes", function(container, state) {
  const paneContainer = document.createElement('div');
  paneContainer.style.height = '100%';
  
  // Create Tweakpane instance
  const pane = new Tweakpane({ container: paneContainer });
  const folder = pane.addFolder({ title: 'Add Shapes' });

  // Create draggable shapes
  ['cube', 'sphere', 'cone'].forEach(shapeType => {
    const div = document.createElement('div');
    div.className = 'draggable-shape';
    div.textContent = shapeType;
    div.draggable = true;
    
    div.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', shapeType);
    });
    
    folder.element.appendChild(div);
  });

  // Add trash bin
  const trash = document.createElement('div');
  trash.id = 'trash';
  trash.textContent = '🗑 Trash';
  paneContainer.appendChild(trash);

  container.getElement().append(paneContainer);
});

myLayout.registerComponent("Hash Table", function (container, state) {
  container.getElement().css("background-color", "#f1f1f1");

  // JSON table definition for the fields, including default values.
  const fields = [
    {
      name: "Height",
      type: "Number",
      default: 50,
      constraint: { min: 20, max: 80 },
    },
    {
      name: "category",
      type: "Dropdown",
      default: "Option 2",
      constraint: { options: ["Option 1", "Option 2", "Option 3"] },
    },
    {
      name: "range",
      type: "Slider",
      default: 25,
      constraint: { min: 15, max: 35 },
    },
  ];

  // Create a container for our form
  const formContainer = document.createElement("div");
  formContainer.style.padding = "10px";
  container.getElement().append(formContainer);

  // Create a table to display our fields.
  const table = document.createElement("table");
  table.style.width = "100%";
  formContainer.appendChild(table);

  // Object to store references to each input element.
  const fieldInputs = {};
  // Object to store error message containers for Number fields.
  const errorContainers = {};

  fields.forEach((field) => {
    const tr = document.createElement("tr");

    // Create a cell for the field name.
    const tdLabel = document.createElement("td");
    tdLabel.style.padding = "5px";
    tdLabel.textContent = field.name;
    tr.appendChild(tdLabel);

    // Create a cell for the input control.
    const tdInput = document.createElement("td");
    tdInput.style.padding = "5px";

    let inputElement;
    if (field.type === "Number") {
      inputElement = document.createElement("input");
      inputElement.type = "number";
      if (field.constraint.min !== undefined) {
        inputElement.min = field.constraint.min;
      }
      if (field.constraint.max !== undefined) {
        inputElement.max = field.constraint.max;
      }
      // Use the default value if provided; otherwise, fallback to constraint.min.
      inputElement.value =
        field.default !== undefined ? field.default : field.constraint.min;
      tdInput.appendChild(inputElement);

      // Create an error message container (initially hidden).
      const errorDiv = document.createElement("div");
      errorDiv.style.color = "red";
      errorDiv.style.fontSize = "12px";
      errorDiv.style.display = "none";
      tdInput.appendChild(errorDiv);
      errorContainers[field.name] = errorDiv;
    } else if (field.type === "Slider") {
      inputElement = document.createElement("input");
      inputElement.type = "range";
      if (field.constraint.min !== undefined) {
        inputElement.min = field.constraint.min;
      }
      if (field.constraint.max !== undefined) {
        inputElement.max = field.constraint.max;
      }
      // Set slider default value.
      inputElement.value =
        field.default !== undefined ? field.default : field.constraint.min;
      tdInput.appendChild(inputElement);
      // Display the slider's current value.
      const sliderValue = document.createElement("span");
      sliderValue.style.marginLeft = "10px";
      sliderValue.textContent = inputElement.value;
      inputElement.addEventListener("input", function () {
        sliderValue.textContent = inputElement.value;
      });
      tdInput.appendChild(sliderValue);
    } else if (field.type === "Dropdown") {
      inputElement = document.createElement("select");
      const options = field.constraint.options || [
        "Option 1",
        "Option 2",
        "Option 3",
      ];
      options.forEach((optionValue) => {
        const option = document.createElement("option");
        option.value = optionValue;
        option.textContent = optionValue;
        inputElement.appendChild(option);
      });
      // Set the default selection if provided.
      if (field.default !== undefined) {
        inputElement.value = field.default;
      }
      tdInput.appendChild(inputElement);
    }

    // Save the input element reference.
    fieldInputs[field.name] = inputElement;

    tr.appendChild(tdInput);
    table.appendChild(tr);
  });

  // Add a row for the Save button.
  const trSave = document.createElement("tr");
  const tdSave = document.createElement("td");
  tdSave.colSpan = 2;
  tdSave.style.textAlign = "center";
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  tdSave.appendChild(saveButton);
  trSave.appendChild(tdSave);
  table.appendChild(trSave);

  // Helper function to update Workspace 1 with current field values.
  function updateWorkspace() {
    let resultHtml = "<h2>Hash Table Values</h2><ul>";
    fields.forEach((field) => {
      resultHtml += `<li>${field.name}: ${fieldInputs[field.name].value}</li>`;
    });
    resultHtml += "</ul>";
    if (workspace1Container) {
      workspace1Container.html(resultHtml);
    }
  }

  // On clicking Save, validate and collect the values.
  saveButton.addEventListener("click", function () {
    let valid = true;
    let resultHtml = "<h2>Hash Table Values</h2><ul>";

    fields.forEach((field) => {
      if (field.type === "Number") {
        const value = parseFloat(fieldInputs[field.name].value);
        // Validate the Number field.
        if (value < field.constraint.min || value > field.constraint.max) {
          valid = false;
          errorContainers[field.name].textContent =
            `error: value must be between min: ${field.constraint.min} and max: ${field.constraint.max}`;
          errorContainers[field.name].style.display = "block";
        } else {
          errorContainers[field.name].textContent = "";
          errorContainers[field.name].style.display = "none";
        }
      }
      resultHtml += `<li>${field.name}: ${fieldInputs[field.name].value}</li>`;
    });
    resultHtml += "</ul>";

    // Update Workspace 1 only if all validations pass.
    if (valid && workspace1Container) {
      workspace1Container.html(resultHtml);
    }
  });

  // Initially update Workspace 1 with the default values.
  updateWorkspace();
});

myLayout.registerComponent("Terminal", function (container, state) {
  const terminalContainer = document.createElement("div");
  terminalContainer.style.height = "100%";
  terminalContainer.style.width = "100%";
  container.getElement()[0].append(terminalContainer);
  const terminal = new window.Terminal({
    fontFamily: "Courier New, monospace",
    fontSize: 14,
    cursorBlink: true,
    scrollback: 1000,
    lineHeight: 1.2,
    tabStopWidth: 4,
    focus: true,
  });
  terminal.open(terminalContainer);
  terminal.focus();
  terminal.write("$ ");
  terminal.onData((data) => {
    terminal.write(data);
  });
});

myLayout.registerComponent("Status", function (container, state) {
  const terminalContainer = document.createElement("div");
  terminalContainer.style.height = "100%";
  terminalContainer.style.width = "100%";
  container.getElement()[0].append(terminalContainer);
  const terminal = new window.Terminal({
    fontFamily: "Courier New, monospace",
    fontSize: 14,
    cursorBlink: true,
    scrollback: 1000,
    lineHeight: 1.2,
    tabStopWidth: 4,
    focus: true,
  });
  terminal.open(terminalContainer);
  terminal.focus();
  terminal.write("$ ");
  terminal.onData((data) => {
    terminal.write(data);
  });
});

myLayout.registerComponent("ToolBar 2", function (container, state) {
  const paneContainer = document.createElement("div");
  paneContainer.style.height = "100%";
  paneContainer.style.width = "100%";
  container.getElement().append(paneContainer);

  const pane = new Tweakpane({
    container: paneContainer,
  });

  const PARAMS = {
    factor: 123,
    title: "hello",
    color: "#ff0055",
    percentage: 50,
    theme: "dark",
  };

  pane.addBinding(PARAMS, "factor");
  pane.addBinding(PARAMS, "title");
  pane.addBinding(PARAMS, "color");
  pane.addBinding(PARAMS, "percentage", { min: 0, max: 100, step: 10 });
  pane.addBinding(PARAMS, "theme", {
    options: { Dark: "dark", Light: "light" },
  });
});

myLayout.init();

window.addEventListener("resize", function () {
  myLayout.updateSize();
});
