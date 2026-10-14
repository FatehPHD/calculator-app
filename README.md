# Calculator

A small static calculator built with plain HTML, CSS and JavaScript.
No frameworks and no build step, which makes it a good first app to learn Docker with.

## Files

| File         | What it does                          |
|--------------|---------------------------------------|
| `index.html` | The page structure and buttons        |
| `style.css`  | The look and layout                   |
| `script.js`  | The calculator logic                  |

## Run it without Docker

Open `index.html` in your browser (double-click it).

## Features

- Add, subtract, multiply, divide
- Decimals, backspace and clear
- Keyboard support (digits, `+ - * /`, `Enter`, `Backspace`, `Esc`)
- Division by zero shows `Error`

## Learning plan

1. Run it locally in the browser
2. Write a `Dockerfile` (nginx serving these files)
3. `docker build` and `docker run -p`
4. Docker Compose
5. Jenkins builds and runs the container from this repo
