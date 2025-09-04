export interface Commit {
	oid: string; // The unique hash of the commit
	message: string;
	timestamp: number; // Unix timestamp
}