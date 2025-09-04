import * as git from 'isomorphic-git';
import { fs } from '@/shared/lib/fs';
import type { Commit } from '../model/types';

/**
 * Reverts a specific file to its state at a given commit.
 * @param filepath The relative path to the file from the repo root.
 * @param oid The commit hash (oid) to revert to.
 */
export async function revertToFileCommit(filepath: string, oid: string) {
	try {
		await git.checkout({
			fs,
			dir: '/',
			ref: oid,
			filepaths: [filepath],
		});
	} catch (error) {
		console.error(`Failed to revert ${filepath} to commit ${oid}:`, error);
		throw error;
	}
}

/**
 * Fetches the commit history for a given file path.
 * @param filepath The absolute path to the file in the virtual file system.
 * @returns A promise that resolves to an array of Commit objects.
 */
export async function getDocumentHistory(filepath: string): Promise<Commit[]> {
	try {
		const relativeFilepath = filepath.startsWith('/') ? filepath.substring(1) : filepath;

		const commits = await git.log({
			fs,
			dir: '/',
			filepath: relativeFilepath,
		});

		// Map the detailed git log to our simplified Commit type
		return commits.map(commit => ({
			oid: commit.oid,
			message: commit.commit.message.trim(),
			timestamp: commit.commit.author.timestamp,
		}));
	} catch (error) {
		console.error(`Failed to get history for ${filepath}:`, error);
		return [];
	}
}