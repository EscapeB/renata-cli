import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
const div = document.createElement('div');
beforeAll(() => {
    ReactDOM.render(<App />, div);
});
afterAll(() => {
    ReactDOM.unmountComponentAtNode(div);
});
it('check App first p text', () => {
    expect(div.childNodes[0].childNodes[0].textContent).toBe('Renata Cli Base Template');
});
