import * as crypto from 'node:crypto';

export class Hashing {
	private static ROUNDS = 1000;
	private static LENGTH = 64;
	private static ALGORITHM = 'sha512';
	
	static hashPassword(password: string) {
		const salt = crypto.randomBytes(16).toString('hex');
		const hashed = crypto.pbkdf2Sync(password, salt, this.ROUNDS, this.LENGTH, this.ALGORITHM).toString('hex');
		return { salt, hashed };
	}
	
	static verifyPassword(password: string, salt: string, hash: string) {
		const hashed = crypto.pbkdf2Sync(password, salt, this.ROUNDS, this.LENGTH, this.ALGORITHM).toString('hex');
		return hash === hashed;
	}
}