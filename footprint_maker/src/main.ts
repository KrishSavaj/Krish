import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Stage, useApp } from "@pixi/react";
import { Application } from 'pixi.js';
import { useEffect, } from 'react';
import run from './functions/background';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
    React.createElement(React.StrictMode, null, React.createElement(app))
);

function app(): React.ReactElement {
  return React.createElement(
    Stage,
    { width: window.innerWidth - 20, height: window.innerHeight - 20 },
    React.createElement(pixiApp)
  );
}

function pixiApp(): null {
    const app: Application = useApp();

    useEffect(() => {
        app.stage.removeChildren();
        app.stage.scale.set(1, 1);
        run(app);
        app.stage.interactive = true;
        app.stage.hitArea = app.screen;
    }, [app]);

    return null;
}