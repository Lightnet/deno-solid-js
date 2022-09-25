# deno-solid-js

# Programs:
- Deno https://deno.land

# Packages:
- solid-js
- babel-preset-solid
- @babel/standalone
- dotenv

# Information:
  Note this use babeljs transform for jsx to js format. To build solid-js.

# SurrealDB:
  Note that browser is a bit buggy for client query. One reason is that response result none. By seeing the code that used websocket.

  http rest api fetch does not work. Only the root admin works.

```
https://cdn.skypack.dev/surrealdb.js < client to SurrealDB
https://deno.land/x/surrealdb@v0.5.0/mod.ts < server to SurrealDB
```

# start:
```
deno task start
```


