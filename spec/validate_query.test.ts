import { assertEquals } from '@std/assert';
import { app } from '../example/app.ts';


Deno.test('Validate query',  async () => {
  const listenEvent = await app.listen(0);
  const response = await fetch(
    `http://localhost:${listenEvent.port}/my-endpoint?password=toto`
  );
  await response.json();
  assertEquals(response.status, 400);

  const workingResponse = await fetch(
    `http://localhost:${listenEvent.port}/my-endpoint?username=toto`
  );
  await workingResponse.text();
  assertEquals(workingResponse.status, 200);

  const defaultValue = await fetch(
    `http://localhost:${listenEvent.port}/my-endpoint/query-default?description=world`,
    {
      method: 'GET',
    }
  );
  const jsonResponse = await defaultValue.json();
  assertEquals(jsonResponse.name, 'hello');
  assertEquals(jsonResponse.description, 'world');
  assertEquals(defaultValue.status, 200);


  await app.close();
})

