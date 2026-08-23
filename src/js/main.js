export function render(values) {
  const container = document.createElement('div');
  container.style.cssText = 'font-family:monospace;padding:20px;background:#1a1a2e;color:#0f0;border-radius:8px;margin:20px;';

  const header = document.createElement('h2');
  header.textContent = 'Gulp + Webpack Build';
  container.appendChild(header);

  values.forEach((val) => {
    const line = document.createElement('p');
    line.textContent = `multiple() = ${val}`;
    container.appendChild(line);
  });

  const hello = document.createElement('p');
  hello.style.cssText = 'margin-top:16px;font-weight:bold;color:#0ff;';
  hello.textContent = 'Hello World';
  container.appendChild(hello);

  document.body.appendChild(container);
}
