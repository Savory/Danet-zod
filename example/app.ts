import { Body, Query } from '../decorators.ts';
import { z } from "zod";
import {
	Controller,
	Post,
	Get,
} from '@danet/core';
import { Module } from '@danet/core';
import { DanetApplication } from '@danet/core';

const User = z.object({
	username: z.string(),
});

// extract the inferred type
type User = z.infer<typeof User>;

@Controller('my-endpoint')
class MyController {

	@Get()
	getSomething(@Query(User)  user: User): string {
		return 'ok';
	}

	@Post()
	postSomething(@Body(User)  user: User): string {
		return 'ok';
	}

	@Post('attribute')
	postAttribute(@Body(User, 'user')  {user}  : { user: User } ): string {
		return 'ok';
	}
}

@Module({
	imports: [],
	controllers: [MyController],
})
class MyModule {
}

export const app = new DanetApplication();
await app.init(MyModule);
