import { HttpException } from '@nestjs/common';

export class RelationExistsException extends HttpException  {
	constructor(message?: string | object) {
		super(message || 'relation already exists!', 400);
	}
}

export class RelationDoesNotExistsException extends HttpException  {
	constructor(message?: string | object) {
		super(message || 'relation does not exists!', 400);
	}
}