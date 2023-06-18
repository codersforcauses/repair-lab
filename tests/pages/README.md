# Tests

Relative imports must be used for all files as we aren't in Next.JS land when we run tests so they won't work.

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
