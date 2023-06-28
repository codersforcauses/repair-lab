# Tests

Relative imports must be used for all files as we aren't in Next.JS land when we run tests so they won't work.

## Using `testApiHandler`

To test an api handler, you can use the `testApiHandler` function. It takes a function that returns a handler, and a bunch of other parameters. It's fairly straightforward, but there's one thing to note about testing POST requests -- you **must** specify the `Content-Type` header.

For example, if you want to send a JSON body, you need to stringify it **AND** specify the `Content-Type` header. Here's an example of how to do this:

```ts
await testApiHandler({
  handler,
  url: `/?test=hello`,
  test: async ({ fetch }) => {
    const msg = { message: "Hello World" }; // The body we want to send (object)

    const res = await fetch({
      method: "POST",
      headers: { "Content-Type": "application/json" }, // ! This is important!
      body: JSON.stringify(msg) // The body we want to send (string)
    });
    const body = await res.json();

    // ...
  }
});
```

### But why...?

Next.JS automatically converts a JSON body to an object if it sees the `Content-Type` header is `application/json` (can be disabled). If you don't specify the header, it will be `text/plain` and you'll get a string in the handler! This is because under the hood, it uses `node-fetch` which doesn't intelligently determine the content type. Most other libraries do this for you, including JavaScript's own `fetch` function.

## Mocking

Called Clerk in your api endpoint? No problem! Just mock the package and the commands you called!

```ts
vi.mock("@clerk/nextjs/server", () => {
  return {
    getAuth: vi
      .fn()
      .mockReturnValueOnce({ userId: "Test" })
      .mockReturnValueOnce({ userId: null })
  };
});

describe("/api/foo", () => {
  it("should return 200", async () => {
    // fetch("/api/foo") ...
    // getAuth will return { userId: "Test" }

    expect(res.status).toBe(200);
  });

  it("should return 401", async () => {
    // fetch("/api/foo") ...
    // get Auth will return { userId: null }

    expect(res.status).toBe(401);
  });
});
```

Unfortunately, it doesn't seem like you can mock the same package twice in the same file. So if you need to mock the same package twice, you'll need to do it in two different files, or mock return values in the order the tests run, like in this example.
