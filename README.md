# Deno Hono Example 2

- Run the app via `deno -A main.ts`.
- Compile the app via `deno compile -A main.ts`.

## Testing Requests

```bash
curl -X POST http://localhost:8000/trees \
-H "Content-Type: application/json" \
-d '{"id": 2, "species": "willow", "age": 100, "location": "Juniper Park"}'

curl -X PUT http://localhost:8000/trees/2 \
-H "Content-Type: application/json" \
-d '{"species": "willow", "age": 101, "location": "Juniper Park"}'

curl -X PUT http://localhost:8000/trees/2 \
-H "Content-Type: application/json" \
-d '{"age": 102}'

curl -X DELETE http://localhost:8000/trees/2
```

## Code History

The code in this repository is based on:

- https://youtu.be/J8kZ-s-5-ms?si=fsPZ0kj1Ywlbcjn4

## Creation History

```bash
deno add jsr:@hono/hono
```
