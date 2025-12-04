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