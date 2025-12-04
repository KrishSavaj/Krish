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
                    componentName: "PCB",
                    componentState: {
                      text: "This is svg.js",
                      type: "Workspace",
                      src: "http://localhost:7153/",
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
  components: ["Pane", "PCB", "Terminal"],
};
