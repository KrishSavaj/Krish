# Electron + Golden Layout Configuration

This project uses Electron and Golden Layout. The UI and menu are configured using two files:

- `menu.js` – Defines the menu bar and actions.
- `layout.js` – Defines the layout structure of the application.

---

## menu.js

```js
module.exports = {
  menuItems: [
    {
      label: 'File',
      submenu: [
        { label: 'New', action: 'newFile' },
        { label: 'Open', action: 'openFile' },
        { type: 'separator' },
        { label: 'Exit', action: 'exit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', action: 'undo' },
        { label: 'Redo', action: 'redo' }
      ]
    }
  ],

  actions: {
    newFile: () => console.log('New file created'),
    openFile: () => console.log('Open file dialog'),
    exit: () => require('electron').app.quit(),
    undo: () => console.log('Undo action'),
    redo: () => console.log('Redo action')
  }
};
```

module.exports = {
  config: {
    content: [
      {
        type: "column",
        content: [
          {
            type: "row",
            height: 70,
            content: [
              {
                type: "component",
                width: 20,
                componentName: "Pane",
                componentState: { text: "This is Pane", type: "Tweakpane" },
              },
              {
                type: "stack",
                width: 80,
                content: [
                  {
                    type: "component",
                    componentName: "ThreeJS",
                    componentState: {
                      text: "This is svg.js",
                      type: "Workspace",
                      src: "http://localhost:4001/",
                    },
                  },
                ],
              },
            ],
          },
          {
            type: "component",
            height: 30,
            componentName: "Terminal",
            componentState: { text: "This is terminal", type: "Terminal" },
          },
        ],
      },
    ],
  },
  components: ["Pane", "ThreeJS", "Terminal"],
};


+-----------------------------------------------------------+
|  Pane (20%) |         ThreeJS Workspace (80%)            |
|             | [iframe: http://localhost:4001/]           |
+-----------------------------------------------------------+
|                 Terminal (30% height)                     |
+-----------------------------------------------------------+

