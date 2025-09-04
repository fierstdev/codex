import * as git from 'isomorphic-git';
import { fs, pfs } from '../fs';

const dir = '/'; // All operations happen at the root of the virtual file system.

// Generic function to write a file and create a commit.
export async function writeFileAndCommit(filepath: string, content: any, commitMessage: string) {
	const contentString = JSON.stringify(content, null, 2);
	await pfs.writeFile(filepath, contentString, 'utf8');

	// Use a relative path for the git command by removing the leading slash.
	const relativeFilepath = filepath.startsWith('/') ? filepath.substring(1) : filepath;

	await git.add({ fs, dir, filepath: relativeFilepath });
	await git.commit({
		fs,
		dir,
		author: { name: 'Codex', email: 'codex@example.com' },
		message: commitMessage,
	});
}

// Function to initialize the repository on first load.
export async function initRepo() {
	try {
		// Check if a commit history exists. If not, this will throw an error.
		await git.log({ fs, dir, depth: 1 });
	} catch (e) {
		// If no commits are found, it's a fresh repository. Initialize it.
		await git.init({ fs, dir });
	}
}