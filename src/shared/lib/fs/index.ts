import LightningFS from '@isomorphic-git/lightning-fs';

// This initializes the virtual file system in a IndexedDB database named 'codex-fs'.
export const fs = new LightningFS('codex-fs');

// Export the promisified API for easier use with async/await.
export const pfs = fs.promises;