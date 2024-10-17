import { NotValidBodyException, createParamDecorator, OptionsResolver, type ExecutionContext, type DecoratorFunction } from './deps.ts';
import { z } from "zod";

/**
 *  Get request's body or a given property and validate it with the provided Zod Schema. Throws NotValidBodyException
 */
export function Body<T extends z.ZodRawShape>(zodSchema: z.ZodObject<T>, prop?: string): DecoratorFunction {
  return createParamDecorator(async (context: ExecutionContext, opts?: OptionsResolver) => {
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
}


/**
 *  Get request's query or a given property and validate it with the provided Zod Schema. Throws NotValidBodyException
 */
export function Query<T extends z.ZodRawShape>(zodSchema: z.ZodObject<T>): DecoratorFunction {
  return createParamDecorator(async (context: ExecutionContext, opts?: OptionsResolver) => {
    const param = context.req.query()
    const operation = zodSchema.safeParse(param);
    if (!operation.success) {
      throw new NotValidBodyException(operation.error);
    }
    return param;
  })();
}
