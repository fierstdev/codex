import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/app/layouts/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { EditorPage } from '@/pages/EditorPage';
import { SettingsPage } from '@/pages/SettingsPage.tsx';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <HomePage />
			},
			{
				path: 'documents/:documentId',
				element: <EditorPage />
			},
			{
				path: 'settings',
				element: <SettingsPage />,
			},
		],
	},
]);