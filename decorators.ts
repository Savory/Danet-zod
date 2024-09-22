import { NotValidBodyException, createParamDecorator, OptionsResolver, type ExecutionContext } from './deps.ts';
import { z } from "https://deno.land/x/zod/mod.ts";

export const ZodBody = <T extends z.ZodRawShape>(zodSchema: z.ZodObject<T>, prop?: string) => createParamDecorator(async (context: ExecutionContext, opts?: OptionsResolver) => {
  if (!opts) {
    throw {
      status: 500,
      message: 'Options of Body not taken by Body decorator function',
    };
  }

  let body;
  try {
    body = await context.req.json();
  } catch (e) {
    throw e;
  }

  if (!body) {
    return null;
  }
  const param = prop ? body[prop] : body;
  const operation = zodSchema.safeParse(param);
  if (!operation.success) {
    throw new NotValidBodyException(operation.error);
  }
  return param;
})();


export const ZodQuery = <T extends z.ZodRawShape>(zodSchema: z.ZodObject<T>) => createParamDecorator(async (context: ExecutionContext, opts?: OptionsResolver) => {
  const param = context.req.query()
  const operation = zodSchema.safeParse(param);
  if (!operation.success) {
    throw new NotValidBodyException(operation.error);
  }
  return param;
})();
