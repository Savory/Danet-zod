import { assertEquals } from '@std/assert';
import { app } from '../example/app.ts';


Deno.test('Validate body on post',  async () => {
  const listenEvent = await app.listen(0);
  const response = await fetch(
    `http://localhost:${listenEvent.port}/my-endpoint`,
    {
      method: 'POST',
      body: JSON.stringify({password:  'toto'})
    }
  );
  await response.json();
  assertEquals(response.status, 400);

  const workingResponse = await fetch(
    `http://localhost:${listenEvent.port}/my-endpoint`,
    {
      method: 'POST',
      body: JSON.stringify({username:  'toto'})
    }
  );
  await workingResponse.text();
  assertEquals(workingResponse.status, 200);

  await app.close();
})

Deno.test('Validate body attribute on post',  async () => {
  const listenEvent = await app.listen(0);
  const response = await fetch(
    `http://localhost:${listenEvent.port}/my-endpoint/attribute`,
    {
      method: 'POST',
      body: JSON.stringify({ user: { password:  'toto' }})
    }
  );
  await response.json();
  assertEquals(response.status, 400);

  const workingResponse = await fetch(
    `http://localhost:${listenEvent.port}/my-endpoint`,
    {
      method: 'POST',
      body: JSON.stringify({username:  'toto'})
    }
  );
  await workingResponse.text();
  assertEquals(workingResponse.status, 200);

  await app.close();
})
