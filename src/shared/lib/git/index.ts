import * as git from 'isomorphic-git';
import { fs, pfs } from '../fs';

const dir = '/'; // All operations happen at the root of the virtual file system.

/**
 * A generic function to create a commit with a given message.
 * @param message The commit message.
 */
async function commit(message: string) {
	await git.commit({
		fs,
		dir,
		author: { name: 'Codex', email: 'codex@example.com' },
		message,
	});
}

/**
 * Writes content to a file, adds it to the git index, and creates a commit.
 * @param filepath The absolute path to the file (e.g., /documents/doc1.json).
 * @param content The content to be stringified and written.
 * @param commitMessage The message for the git commit.
 */
export async function writeFileAndCommit(filepath: string, content: any, commitMessage: string) {
	const contentString = JSON.stringify(content, null, 2);
	await pfs.writeFile(filepath, contentString, 'utf8');

	const relativeFilepath = filepath.startsWith('/') ? filepath.substring(1) : filepath;
	await git.add({ fs, dir, filepath: relativeFilepath });

	await commit(commitMessage);
}

/**
 * Deletes a file, removes it from the git index, and creates a commit.
 * @param filepath The absolute path to the file (e.g., /documents/doc1.json).
 * @param commitMessage The message for the git commit.
 */
export async function removeFileAndCommit(filepath: string, commitMessage: string) {
	const relativeFilepath = filepath.startsWith('/') ? filepath.substring(1) : filepath;

	// First, remove the file from the working directory
	await pfs.unlink(filepath);
	// Then, remove the file from the git index
	await git.remove({ fs, dir, filepath: relativeFilepath });

	// Finally, commit the removal
	await commit(commitMessage);
}

/**
 * Initializes a git repository in the virtual file system if one doesn't already exist.
 */
export async function initRepo() {
	try {
		await git.log({ fs, dir, depth: 1 });
	} catch (e) {
		// If log fails, it's likely an empty repository.
		await git.init({ fs, dir });
	}
}