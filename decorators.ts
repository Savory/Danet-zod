import { NotValidBodyException, createParamDecorator, OptionsResolver, type HttpContext } from './deps.ts';

export const ZodBody = (zodSchema: any, prop?: string) => createParamDecorator(async (context: HttpContext, opts?: OptionsResolver) => {
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


export const ZodQuery = (zodSchema: any) => createParamDecorator(async (context: HttpContext, opts?: OptionsResolver) => {
  const param = context.req.query()
  const operation = zodSchema.safeParse(param);
  if (!operation.success) {
    throw new NotValidBodyException(operation.error);
  }
  return param;
})();
