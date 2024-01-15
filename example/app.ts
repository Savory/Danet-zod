import { ZodBody, ZodQuery } from '../decorators.ts';
import { z } from "https://deno.land/x/zod/mod.ts";
import {
	Controller,
	Post,
	Get,
} from 'https://deno.land/x/danet/mod.ts';
import { Module } from 'https://deno.land/x/danet/src/module/decorator.ts';
import { DanetApplication } from 'https://deno.land/x/danet/src/app.ts';

const User = z.object({
	username: z.string(),
});

// extract the inferred type
type User = z.infer<typeof User>;

@Controller('my-endpoint')
class MyController {

	@Get()
	getSomething(@ZodQuery(User)  user: User): string {
		return 'ok';
	}

	@Post()
	postSomething(@ZodBody(User)  user: User): string {
		return 'ok';
	}

	@Post('attribute')
	postAttribute(@ZodBody(User, 'user')  {user}  : { user: User } ): string {
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
