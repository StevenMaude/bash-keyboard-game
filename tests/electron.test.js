const path = require('path');
const fs = require('fs');

describe('Electron main process', () => {
  const mainPath = path.join(__dirname, '..', 'main.js');

  test('main.js exists', () => {
    expect(fs.existsSync(mainPath)).toBe(true);
  });

  test('main.js is valid JavaScript', () => {
    const content = fs.readFileSync(mainPath, 'utf8');
    // Should parse without syntax errors
    expect(() => {
      new Function(content.replace(/require\([^)]+\)/g, '{}'));
    }).not.toThrow();
  });

  test('main.js requires electron modules', () => {
    const content = fs.readFileSync(mainPath, 'utf8');
    expect(content).toContain("require('electron')");
    expect(content).toContain('BrowserWindow');
    expect(content).toContain('Menu');
  });

  test('main.js disables the application menu', () => {
    const content = fs.readFileSync(mainPath, 'utf8');
    expect(content).toContain('Menu.setApplicationMenu(null)');
  });

  test('main.js loads index.html', () => {
    const content = fs.readFileSync(mainPath, 'utf8');
    expect(content).toContain("loadFile('index.html')");
  });

  test('main.js disables nodeIntegration for security', () => {
    const content = fs.readFileSync(mainPath, 'utf8');
    expect(content).toContain('nodeIntegration: false');
    expect(content).toContain('contextIsolation: true');
  });
});

describe('Electron build configuration', () => {
  test('package.json has main entry point', () => {
    const pkg = require('../package.json');
    expect(pkg.main).toBe('main.js');
  });

  test('package.json has electron start script', () => {
    const pkg = require('../package.json');
    expect(pkg.scripts.start).toContain('electron');
  });

  test('package.json has build script', () => {
    const pkg = require('../package.json');
    expect(pkg.scripts.build).toBeDefined();
    expect(pkg.scripts.build).toContain('electron-builder');
  });

  test('package.json has electron-builder build config', () => {
    const pkg = require('../package.json');
    expect(pkg.build).toBeDefined();
    expect(pkg.build.appId).toBeDefined();
    expect(pkg.build.productName).toBe('Bash Keyboard Game');
    expect(pkg.build.files).toContain('main.js');
    expect(pkg.build.files).toContain('index.html');
  });

  test('package.json has electron as devDependency', () => {
    const pkg = require('../package.json');
    expect(pkg.devDependencies.electron).toBeDefined();
  });

  test('package.json has electron-builder as devDependency', () => {
    const pkg = require('../package.json');
    expect(pkg.devDependencies['electron-builder']).toBeDefined();
  });

  test('all game files referenced in build config exist', () => {
    const pkg = require('../package.json');
    const rootDir = path.join(__dirname, '..');
    // Check non-glob files exist
    expect(fs.existsSync(path.join(rootDir, 'main.js'))).toBe(true);
    expect(fs.existsSync(path.join(rootDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(rootDir, 'css'))).toBe(true);
    expect(fs.existsSync(path.join(rootDir, 'js'))).toBe(true);
  });
});

describe('index.html for Electron', () => {
  const indexPath = path.join(__dirname, '..', 'index.html');
  let content;

  beforeAll(() => {
    content = fs.readFileSync(indexPath, 'utf8');
  });

  test('does not contain browser shortcut warning', () => {
    expect(content).not.toContain('browser-note');
    expect(content).not.toContain('intercept Ctrl+W');
  });

  test('loads all required game scripts', () => {
    expect(content).toContain('js/challenges.js');
    expect(content).toContain('js/bash-input.js');
    expect(content).toContain('js/game.js');
    expect(content).toContain('js/app.js');
  });

  test('loads CSS stylesheet', () => {
    expect(content).toContain('css/style.css');
  });
});
