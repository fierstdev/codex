import React from 'react';
import ReactDOM from 'react-dom/client';
import { Buffer } from 'buffer';
import App from './App.tsx';
import 'prosemirror-view/style/prosemirror.css';
import './index.css';

// Polyfill the global Buffer object for browser environment
window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)