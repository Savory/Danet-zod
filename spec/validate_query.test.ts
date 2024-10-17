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

  await app.close();
})

